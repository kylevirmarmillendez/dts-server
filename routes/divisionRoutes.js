const express = require('express');
const router = express.Router();
const {
  createDivision,
  getDivisions,
  getDivision,
  updateDivision,
  deleteDivision,
} = require('../controllers/divisionController');
const { authorize } = require('../middleware/authorize');

const adminOnly = authorize(['super_admin', 'admin']);

/**
 * @swagger
 * tags:
 *   name: Divisions
 *   description: Division management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Division:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         division_name:
 *           type: string
 *         division_code:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     DivisionInput:
 *       type: object
 *       required: [division_name, division_code]
 *       properties:
 *         division_name:
 *           type: string
 *         division_code:
 *           type: string
 */

/**
 * @swagger
 * /api/divisions:
 *   post:
 *     summary: Create a new division
 *     tags: [Divisions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DivisionInput'
 *     responses:
 *       201:
 *         description: Division created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Division'
 *       400:
 *         description: Validation failed
 *       409:
 *         description: Division code already exists
 */
router.post('/', adminOnly, createDivision);

/**
 * @swagger
 * /api/divisions:
 *   get:
 *     summary: Get all divisions
 *     tags: [Divisions]
 *     responses:
 *       200:
 *         description: List of divisions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Division'
 */
router.get('/', getDivisions);

/**
 * @swagger
 * /api/divisions/{id}:
 *   get:
 *     summary: Get a division by ID
 *     tags: [Divisions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Division found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Division'
 *       404:
 *         description: Division not found
 */
router.get('/:id', getDivision);

/**
 * @swagger
 * /api/divisions/{id}:
 *   put:
 *     summary: Update a division by ID
 *     tags: [Divisions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DivisionInput'
 *     responses:
 *       200:
 *         description: Division updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Division'
 *       404:
 *         description: Division not found
 *       409:
 *         description: Division code already exists
 */
router.put('/:id', adminOnly, updateDivision);

/**
 * @swagger
 * /api/divisions/{id}:
 *   delete:
 *     summary: Delete a division by ID
 *     tags: [Divisions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Division deleted
 *       404:
 *         description: Division not found
 */
router.delete('/:id', adminOnly, deleteDivision);

module.exports = router;
