const express = require('express');
const router = express.Router();
const contribuicoesController = require('../controllers/contribuicoesController');

/**
 * GET /api/participantes/:cpf/contribuicoes/anos
 * Lista anos disponíveis para extrato
 */
router.get('/:cpf/contribuicoes/anos', contribuicoesController.listarAnos);

/**
 * GET /api/participantes/:cpf/contribuicoes
 * Extrato de contribuições por competência
 */
router.get('/:cpf/contribuicoes', contribuicoesController.obterExtrato);

/**
 * GET /api/participantes/:cpf/contribuicoes/parametros
 * Obtém parâmetros de contribuição
 */
router.get('/:cpf/contribuicoes/parametros', contribuicoesController.obterParametros);

/**
 * POST /api/participantes/:cpf/contribuicoes/simulacao
 * Simula alteração de percentual
 */
router.post('/:cpf/contribuicoes/simulacao', contribuicoesController.simularAlteracao);

/**
 * POST /api/participantes/:cpf/contribuicoes/parametros
 * Altera parâmetros de contribuição
 */
router.post('/:cpf/contribuicoes/parametros', contribuicoesController.alterarParametros);

/**
 * GET /api/participantes/:cpf/contribuicoes/pdf
 * Gera PDF do extrato
 */
router.get('/:cpf/contribuicoes/pdf', contribuicoesController.gerarPDF);

module.exports = router;

