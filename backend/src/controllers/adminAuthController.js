const jwt = require('jsonwebtoken');

// Usuário admin mockado (em produção isso viria de um banco de dados)
const ADMIN_USER = {
  email: process.env.ADMIN_EMAIL || 'admin@autoprev.com',
  senha: process.env.ADMIN_PASSWORD || 'admin123',
  nome: process.env.ADMIN_NAME || 'Administrador Autoprev',
};

const adminAuthController = {
  /**
   * POST /api/admin/auth/login
   * Autenticação do administrador do painel web
   */
  login: async (req, res) => {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ error: 'E-mail e senha são obrigatórios' });
      }

      if (email !== ADMIN_USER.email || senha !== ADMIN_USER.senha) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      const token = jwt.sign(
        {
          email: ADMIN_USER.email,
          nome: ADMIN_USER.nome,
          role: 'admin',
        },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '8h' }
      );

      res.json({
        token,
        user: {
          email: ADMIN_USER.email,
          nome: ADMIN_USER.nome,
        },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * GET /api/admin/auth/me
   * Valida o token atual e retorna os dados do admin
   */
  me: async (req, res) => {
    try {
      const authHeader = req.headers.authorization || '';
      const [, token] = authHeader.split(' ');

      if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');

        if (decoded.role !== 'admin') {
          return res.status(403).json({ error: 'Acesso negado' });
        }

        return res.json({
          email: decoded.email,
          nome: decoded.nome,
          role: decoded.role,
        });
      } catch (err) {
        return res.status(401).json({ error: 'Token inválido ou expirado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = adminAuthController;


