const express = require('express');
const router = express.Router();
const documentosController = require('../controllers/documentosController');

/**
 * GET /api/institutos/:instituto_id/documentos-legais
 * Lista documentos legais (termos e privacidade)
 */
router.get('/:instituto_id/documentos-legais', documentosController.listarDocumentos);

/**
 * POST /api/consentimentos
 * Registra consentimento do usuário
 */
router.post('/consentimentos', documentosController.registrarConsentimento);

module.exports = router;

