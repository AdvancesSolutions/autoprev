const express = require('express');
const router = express.Router();

let adminUsuariosController;
try {
  adminUsuariosController = require('../controllers/adminUsuariosController');
} catch (error) {
  console.error('Erro ao carregar adminUsuariosController:', error);
  // Fallback controller
  adminUsuariosController = {
    listarUsuarios: async (req, res) => {
      res.json([]);
    },
    buscarUsuario: async (req, res) => {
      res.status(404).json({ error: 'Usuário não encontrado' });
    },
    criarUsuario: async (req, res) => {
      res.status(500).json({ error: 'Funcionalidade não disponível' });
    },
    atualizarUsuario: async (req, res) => {
      res.status(500).json({ error: 'Funcionalidade não disponível' });
    },
    removerUsuario: async (req, res) => {
      res.status(500).json({ error: 'Funcionalidade não disponível' });
    }
  };
}

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

