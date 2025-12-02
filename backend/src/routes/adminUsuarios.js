const express = require('express');
const router = express.Router();
const adminUsuariosController = require('../controllers/adminUsuariosController');

/**
 * Rotas para gerenciamento de usuários (admin)
 * 
 * GET /api/admin/usuarios - Lista todos os usuários
 * GET /api/admin/usuarios/:cpf - Busca um usuário específico
 * POST /api/admin/usuarios - Cria um novo usuário
 * PUT /api/admin/usuarios/:cpf - Atualiza um usuário
 * DELETE /api/admin/usuarios/:cpf - Remove um usuário
 */

router.get('/', adminUsuariosController.listarUsuarios);
router.get('/:cpf', adminUsuariosController.buscarUsuario);
router.post('/', adminUsuariosController.criarUsuario);
router.put('/:cpf', adminUsuariosController.atualizarUsuario);
router.delete('/:cpf', adminUsuariosController.removerUsuario);

module.exports = router;

