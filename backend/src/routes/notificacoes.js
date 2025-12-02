const express = require('express');
const router = express.Router();
const notificacoesController = require('../controllers/notificacoesController');

/**
 * GET /api/participantes/:cpf/notificacoes
 * Lista notificações do participante
 */
router.get('/:cpf/notificacoes', notificacoesController.listarNotificacoes);

/**
 * POST /api/participantes/:cpf/chamados
 * Abre chamado de atendimento
 */
router.post('/:cpf/chamados', notificacoesController.abrirChamado);

/**
 * GET /api/participantes/:cpf/chamados
 * Lista chamados do participante
 */
router.get('/:cpf/chamados', notificacoesController.listarChamados);

module.exports = router;

