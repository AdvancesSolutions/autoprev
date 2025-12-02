const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * POST /api/auth/login
 * Login do participante
 */
router.post('/login', authController.login);

/**
 * POST /api/auth/recuperar
 * Solicita recuperação de senha
 */
router.post('/recuperar', authController.recuperarSenha);

/**
 * POST /api/auth/validar-codigo
 * Valida código de recuperação
 */
router.post('/validar-codigo', authController.validarCodigo);

/**
 * POST /api/auth/reset-password
 * Redefine a senha após validação do código
 */
router.post('/reset-password', authController.resetPassword);

module.exports = router;

