const express = require('express');
const router = express.Router();
const {
  createDocument,
  getDocuments,
  getDocument,
  updateDocument,
  deleteDocument,
} = require('../controllers/documentController');

/**
 * @swagger
 * tags:
 *   name: Documents
 *   description: Documents Registry management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Document:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         document_name:
 *           type: string
 *         version:
 *           type: string
 *         feedback:
 *           type: string
 *           nullable: true
 *         description:
 *           type: string
 *           nullable: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     DocumentInput:
 *       type: object
 *       required: [document_name, version]
 *       properties:
 *         document_name:
 *           type: string
 *         version:
 *           type: string
 *         feedback:
 *           type: string
 *         description:
 *           type: string
 */

/**
 * @swagger
 * /api/documents:
 *   post:
 *     summary: Create a new document entry
 *     tags: [Documents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DocumentInput'
 *     responses:
 *       201:
 *         description: Document created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Document'
 *       400:
 *         description: Validation failed
 */
router.post('/', createDocument);

/**
 * @swagger
 * /api/documents:
 *   get:
 *     summary: Get all document entries
 *     tags: [Documents]
 *     responses:
 *       200:
 *         description: List of documents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Document'
 */
router.get('/', getDocuments);

/**
 * @swagger
 * /api/documents/{id}:
 *   get:
 *     summary: Get a document by ID
 *     tags: [Documents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Document found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Document'
 *       404:
 *         description: Document not found
 */
router.get('/:id', getDocument);

/**
 * @swagger
 * /api/documents/{id}:
 *   put:
 *     summary: Update a document by ID
 *     tags: [Documents]
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
 *             $ref: '#/components/schemas/DocumentInput'
 *     responses:
 *       200:
 *         description: Document updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Document'
 *       404:
 *         description: Document not found
 */
router.put('/:id', updateDocument);

/**
 * @swagger
 * /api/documents/{id}:
 *   delete:
 *     summary: Delete a document by ID
 *     tags: [Documents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Document deleted
 *       404:
 *         description: Document not found
 */
router.delete('/:id', deleteDocument);

module.exports = router;
