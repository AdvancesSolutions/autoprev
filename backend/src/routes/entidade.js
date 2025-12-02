const express = require('express');
const router = express.Router();
const entidadeController = require('../controllers/entidadeController');

/**
 * GET /api/entidade
 * Lista todas as entidades/marcas com suas configurações de identidade visual
 */
router.get('/', entidadeController.listarEntidades);

/**
 * GET /api/entidade/:entidade_id
 * Busca uma entidade específica
 */
router.get('/:entidade_id', entidadeController.buscarEntidade);

/**
 * PUT /api/entidade/:entidade_id
 * Atualiza configurações da entidade (identidade visual)
 */
router.put('/:entidade_id', entidadeController.atualizarEntidade);

/**
 * POST /api/entidade/:entidade_id/logo
 * Upload de logo da entidade
 */
router.post('/:entidade_id/logo', entidadeController.uploadLogoMiddleware, entidadeController.uploadLogo);

module.exports = router;

