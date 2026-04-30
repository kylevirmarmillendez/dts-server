const Division = require('../models/Division');
const User = require('../models/User');
const { createDivisionSchema, updateDivisionSchema } = require('../validators/divisionValidator');

const success = (res, statusCode, data, message) =>
  res.status(statusCode).json({ success: true, message, data });

const failure = (res, statusCode, message, errors = null) =>
  res.status(statusCode).json({ success: false, message, ...(errors && { errors }) });

// ── Controllers ───────────────────────────────────────────────────────────────

const createDivision = async (req, res) => {
  const { error, value } = createDivisionSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((d) => d.message);
    return failure(res, 400, 'Validation failed.', errors);
  }

  const { division_name, division_code, division_chief } = value;

  const existing = await Division.findOne({ division_code });
  if (existing) {
    return failure(res, 409, 'A division with that code already exists.');
  }

  const division = await Division.create({
    division_name,
    division_code,
    division_chief: division_chief || null,
  });

  // Sync: set the chosen chief's division to this new division
  if (division_chief) {
    await User.findByIdAndUpdate(division_chief, { division: division._id });
  }

  const populated = await division.populate('division_chief', 'fname lname username employee_id');

  return success(res, 201, populated, 'Division created successfully.');
};

const getDivisions = async (req, res) => {
  const divisions = await Division.find()
    .populate('division_chief', 'fname lname username employee_id')
    .sort({ division_name: 1 });
  return success(res, 200, divisions, 'Divisions retrieved successfully.');
};

const getDivision = async (req, res) => {
  const division = await Division.findById(req.params.id)
    .populate('division_chief', 'fname lname username employee_id');
  if (!division) {
    return failure(res, 404, 'Division not found.');
  }
  return success(res, 200, division, 'Division retrieved successfully.');
};

const updateDivision = async (req, res) => {
  const { error, value } = updateDivisionSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((d) => d.message);
    return failure(res, 400, 'Validation failed.', errors);
  }

  const division = await Division.findById(req.params.id);
  if (!division) {
    return failure(res, 404, 'Division not found.');
  }

  const { division_name, division_code, division_chief } = value;

  if (division_code && division_code !== division.division_code) {
    const taken = await Division.findOne({ division_code });
    if (taken) return failure(res, 409, 'A division with that code already exists.');
    division.division_code = division_code;
  }

  if (division_name !== undefined) division.division_name = division_name;
  if (division_chief !== undefined) {
    const oldChiefId = division.division_chief
      ? division.division_chief.toString()
      : null;
    const newChiefId = division_chief || null;

    // Clear old chief's division if changing
    if (oldChiefId && oldChiefId !== newChiefId) {
      await User.findByIdAndUpdate(oldChiefId, { division: null });
    }
    // Set new chief's division
    if (newChiefId && newChiefId !== oldChiefId) {
      await User.findByIdAndUpdate(newChiefId, { division: division._id });
    }

    division.division_chief = newChiefId;
  }

  await division.save();
  await division.populate('division_chief', 'fname lname username employee_id');

  return success(res, 200, division, 'Division updated successfully.');
};

const deleteDivision = async (req, res) => {
  const division = await Division.findByIdAndDelete(req.params.id);
  if (!division) {
    return failure(res, 404, 'Division not found.');
  }
  // Clear the chief's division reference
  if (division.division_chief) {
    await User.findByIdAndUpdate(division.division_chief, { division: null });
  }
  return success(res, 200, null, 'Division deleted successfully.');
};

module.exports = { createDivision, getDivisions, getDivision, updateDivision, deleteDivision };
