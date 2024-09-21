const express = require('express');
const {
  getRegistros,
  getRegistroById,
  createRegistro,
  updateRegistro,
  deleteRegistro,
  getRegistrosByUserId
} = require('../controllers/registroController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Registros
 *   description: Gerenciamento de Registros
 */

/**
 * @swagger
 * /api/registros:
 *   get:
 *     summary: Lista todas os registros
 *     tags: [Registros]
 *     responses:
 *       200:
 *         description: Lista de registros
 */
router.get('/', authMiddleware, getRegistros);

/**
 * @swagger
 * /api/registros/{id}:
 *   get:
 *     summary: Obtém um registro pelo ID
 *     tags: [Registros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do registro
 *     responses:
 *       200:
 *         description: Detalhes do registro
 *       404:
 *         description: Registro não encontrado
 */
router.get('/:id', authMiddleware, getRegistroById);

/**
 * @swagger
 * /api/registros:
 *   post:
 *     summary: Cria um novo registro
 *     tags: [Registros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nomeAluno:
 *                 type: string
 *               resumoAula:
 *                 type: string
 *               localizacao:
 *                 type: string
 *               fotoAula:
 *                type: string
 *               user:
 *                 type: string
 * 
 
 *     responses:
 *       201:
 *         description: Registro criado com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.post('/', authMiddleware, createRegistro);

/**
 * @swagger
 * /api/registros/{id}:
 *   put:
 *     summary: Atualiza um registro existente
 *     tags: [Registros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da plantação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nomeAluno:
 *                 type: string
 *               resumoAula:
 *                 type: string
 *               localizacao:
 *                 type: string
 *               fotoAula:
 *                type: string
 *               user:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registro atualizado com sucesso
 *       404:
 *         description: Registro não encontrado
 */
router.put('/:id', authMiddleware, updateRegistro);

/**
 * @swagger
 * /api/registros/{id}:
 *   delete:
 *     summary: Deleta um registro existente
 *     tags: [Registros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da plantação
 *     responses:
 *       200:
 *         description: Registro deletado com sucesso
 *       404:
 *         description: Registro não encontrado
 */
router.delete('/:id', authMiddleware, deleteRegistro);

/**
 * @swagger
 * /api/registros/user/{userId}:
 *   get:
 *     summary: Retorna todas os registros de um usuário específico
 *     tags: [Registros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Lista de registros do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Registro'
 *       401:
 *         description: Usuário não autenticado
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/user/:userId', authMiddleware, getRegistrosByUserId);

module.exports = router;
