const express = require('express');
const router = express.Router();
const emprestimosController = require('../controllers/emprestimosController');

/**
 * GET /api/participantes/:cpf/emprestimos/meusemprestimos
 * Lista empréstimos do participante
 */
router.get('/:cpf/emprestimos/meusemprestimos', emprestimosController.listarEmprestimos);

/**
 * GET /api/participantes/:cpf/emprestimos/:emprestimo_id/parcelas
 * Lista parcelas de um empréstimo
 */
router.get('/:cpf/emprestimos/:emprestimo_id/parcelas', emprestimosController.listarParcelas);

/**
 * GET /api/participantes/:cpf/emprestimos/preaprovado
 * Verifica pré-aprovação
 */
router.get('/:cpf/emprestimos/preaprovado', emprestimosController.verificarPreAprovacao);

/**
 * POST /api/participantes/:cpf/emprestimos/simulacao
 * Simula empréstimo
 */
router.post('/:cpf/emprestimos/simulacao', emprestimosController.simularEmprestimo);

/**
 * POST /api/participantes/:cpf/emprestimos/contratar
 * Contrata empréstimo
 */
router.post('/:cpf/emprestimos/contratar', emprestimosController.contratarEmprestimo);

/**
 * GET /api/participantes/:cpf/emprestimos/boletos
 * Lista boletos de empréstimo
 */
router.get('/:cpf/emprestimos/boletos', emprestimosController.listarBoletos);

/**
 * POST /api/participantes/:cpf/emprestimos/pagamento/confirmar
 * Confirma pagamento
 */
router.post('/:cpf/emprestimos/pagamento/confirmar', emprestimosController.confirmarPagamento);

/**
 * POST /api/participantes/:cpf/emprestimos/quitar
 * Quita empréstimo
 */
router.post('/:cpf/emprestimos/quitar', emprestimosController.quitarEmprestimo);

/**
 * POST /api/participantes/:cpf/emprestimos/refinanciar
 * Refinancia empréstimo
 */
router.post('/:cpf/emprestimos/refinanciar', emprestimosController.refinanciarEmprestimo);

module.exports = router;

