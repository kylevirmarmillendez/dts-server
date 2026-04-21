const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');

const seedData = {
  fname: 'qafname',
  lname: 'qalname',
  username: 'qausername',
  email: 'qaemail@gmail.com',
  password: 'qapassword',
  permission: 'super_admin',
  employee_id: null,
  division: null,
  section: null,
};

async function seed() {
  await connectDB();

  const existing = await User.findOne({ username: seedData.username });
  if (existing) {
    console.log(`User "${seedData.username}" already exists. Skipping.`);
    await mongoose.disconnect();
    return;
  }

  const hashedPassword = await bcrypt.hash(seedData.password, 10);

  await User.create({ ...seedData, password: hashedPassword });

  console.log(`Seed user "${seedData.username}" created successfully.`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seeder error:', err);
  process.exit(1);
});
