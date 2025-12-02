const express = require('express');
const router = express.Router();
const riscosController = require('../controllers/riscosController');

/**
 * GET /api/participantes/:cpf/riscos
 * Lista coberturas de risco atuais
 */
router.get('/:cpf/riscos', riscosController.listarRiscos);

/**
 * POST /api/participantes/:cpf/riscos/cotacao
 * Simula/cota cobertura de risco
 */
router.post('/:cpf/riscos/cotacao', riscosController.cotarRisco);

/**
 * POST /api/participantes/:cpf/riscos/aderir
 * Adere a uma cobertura de risco
 */
router.post('/:cpf/riscos/aderir', riscosController.aderirRisco);

module.exports = router;

