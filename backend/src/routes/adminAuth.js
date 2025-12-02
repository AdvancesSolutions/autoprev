const express = require('express');
const router = express.Router();
const adminAuthController = require('../controllers/adminAuthController');

// Login do administrador
router.post('/login', adminAuthController.login);

// Retorna informações do admin autenticado
router.get('/me', adminAuthController.me);

module.exports = router;


