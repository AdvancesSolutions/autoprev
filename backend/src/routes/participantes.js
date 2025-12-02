const express = require('express');
const router = express.Router();
const participantesController = require('../controllers/participantesController');

/**
 * GET /api/participantes/:cpf/perfis
 * Lista perfis do participante (multivínculo)
 */
router.get('/:cpf/perfis', participantesController.listarPerfis);

/**
 * GET /api/participantes/:cpf/resumo
 * Resumo do participante (home)
 */
router.get('/:cpf/resumo', participantesController.obterResumo);

/**
 * GET /api/participantes/:cpf/pendencias-financeiras
 * Lista pendências financeiras
 */
router.get('/:cpf/pendencias-financeiras', participantesController.listarPendencias);

/**
 * GET /api/participantes/:cpf/cadastro
 * Obtém dados cadastrais
 */
router.get('/:cpf/cadastro', participantesController.obterCadastro);

/**
 * PUT /api/participantes/:cpf/cadastro
 * Atualiza dados cadastrais
 */
router.put('/:cpf/cadastro', participantesController.atualizarCadastro);

/**
 * GET /api/participantes/:cpf/contas-bancarias
 * Lista contas bancárias
 */
router.get('/:cpf/contas-bancarias', participantesController.listarContasBancarias);

/**
 * PUT /api/participantes/:cpf/contas-bancarias/:id
 * Atualiza conta bancária
 */
router.put('/:cpf/contas-bancarias/:id', participantesController.atualizarContaBancaria);

/**
 * GET /api/participantes/:cpf/dependentes
 * Lista dependentes
 */
router.get('/:cpf/dependentes', participantesController.listarDependentes);

/**
 * POST /api/participantes/:cpf/dependentes
 * Adiciona dependente
 */
router.post('/:cpf/dependentes', participantesController.adicionarDependente);

/**
 * PUT /api/participantes/:cpf/dependentes/:id
 * Atualiza dependente
 */
router.put('/:cpf/dependentes/:id', participantesController.atualizarDependente);

/**
 * DELETE /api/participantes/:cpf/dependentes/:id
 * Remove dependente
 */
router.delete('/:cpf/dependentes/:id', participantesController.removerDependente);

/**
 * GET /api/participantes/:cpf/beneficiarios
 * Lista beneficiários
 */
router.get('/:cpf/beneficiarios', participantesController.listarBeneficiarios);

/**
 * PUT /api/participantes/:cpf/beneficiarios/:id
 * Atualiza beneficiário
 */
router.put('/:cpf/beneficiarios/:id', participantesController.atualizarBeneficiario);

module.exports = router;

