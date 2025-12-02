const express = require('express');
const router = express.Router();
const beneficiosController = require('../controllers/beneficiosController');

/**
 * GET /api/participantes/:cpf/beneficios
 * Lista benefícios do participante
 */
router.get('/:cpf/beneficios', beneficiosController.listarBeneficios);

/**
 * GET /api/participantes/:cpf/beneficios/anos
 * Lista anos disponíveis para extrato
 */
router.get('/:cpf/beneficios/anos', beneficiosController.listarAnos);

/**
 * GET /api/participantes/:cpf/beneficios/extrato
 * Extrato de benefícios
 */
router.get('/:cpf/beneficios/extrato', beneficiosController.obterExtrato);

/**
 * GET /api/participantes/:cpf/beneficios/ir
 * Informe de rendimentos (IR)
 */
router.get('/:cpf/beneficios/ir', beneficiosController.obterInformeIR);

/**
 * GET /api/participantes/:cpf/beneficios/simulacao
 * Simula benefícios
 */
router.get('/:cpf/beneficios/simulacao', beneficiosController.simularBeneficios);

/**
 * POST /api/participantes/:cpf/beneficios/solicitacoes/:solicitacao_id/anexos
 * Upload de anexos para solicitação de benefícios
 */
router.post('/:cpf/beneficios/solicitacoes/:solicitacao_id/anexos', beneficiosController.uploadAnexoMiddleware, beneficiosController.uploadAnexo);

module.exports = router;

