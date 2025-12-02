const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

// Mock data - em produção, isso viria de um banco de dados
// CPFs válidos para teste: 11144477735, 77744411135
let participantes = [
  {
    cpf: '11144477735',
    senha: '$2a$10$rOzJqJqJqJqJqJqJqJqJqO', // hash de 'senha123'
    nome: 'João Silva',
    perfis: [
      {
        plano_id: 1,
        nome_plano: 'Plano Básico',
        papel: 'ativo'
      }
    ]
  },
  {
    cpf: '77744411135',
    senha: '$2a$10$rOzJqJqJqJqJqJqJqJqJqO', // hash de 'senha123'
    nome: 'Maria Santos',
    perfis: [
      {
        plano_id: 1,
        nome_plano: 'Plano Básico',
        papel: 'ativo'
      }
    ]
  }
];

// Armazena códigos de recuperação temporariamente
const codigosRecuperacao = new Map();

const authController = {
  /**
   * Login do participante
   */
  login: async (req, res) => {
    try {
      const { cpf, senha } = req.body;

      console.log('Tentativa de login:', { cpf, senha: senha ? '***' : 'vazia' });

      if (!cpf || !senha) {
        return res.status(400).json({ error: 'CPF e senha são obrigatórios' });
      }

      const cpfLimpo = cpf.replace(/\D/g, '');
      console.log('CPF limpo:', cpfLimpo);
      console.log('Participantes disponíveis:', participantes.map(p => p.cpf));

      // Busca participante
      const participante = participantes.find(p => p.cpf === cpfLimpo);

      if (!participante) {
        console.log('Participante não encontrado para CPF:', cpfLimpo);
        return res.status(401).json({ error: 'CPF ou senha inválidos' });
      }

      console.log('Participante encontrado:', participante.nome);

      // Valida senha (em produção, usar bcrypt.compare)
      // Por enquanto, validação simples para desenvolvimento
      const senhaValida = senha === 'senha123'; // Em produção, usar bcrypt.compare

      if (!senhaValida) {
        console.log('Senha inválida');
        return res.status(401).json({ error: 'CPF ou senha inválidos' });
      }

      console.log('Login bem-sucedido para:', participante.nome);

      // Gera token JWT
      const token = jwt.sign(
        { cpf: participante.cpf, nome: participante.nome },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
      );

      res.json({
        token,
        perfis: participante.perfis
      });
    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * Solicita recuperação de senha
   */
  recuperarSenha: async (req, res) => {
    try {
      const { cpf } = req.body;

      if (!cpf) {
        return res.status(400).json({ error: 'CPF é obrigatório' });
      }

      const participante = participantes.find(p => p.cpf === cpf.replace(/\D/g, ''));

      if (!participante) {
        // Por segurança, não revela se o CPF existe ou não
        return res.json({ 
          message: 'Se o CPF estiver cadastrado, você receberá um código de recuperação',
          canais_disponiveis: ['email', 'sms']
        });
      }

      // Gera código de 6 dígitos
      const codigo = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Armazena código (expira em 15 minutos)
      codigosRecuperacao.set(cpf, {
        codigo,
        expiresAt: Date.now() + 15 * 60 * 1000
      });

      // Em produção, enviar código por email/SMS
      console.log(`Código de recuperação para ${cpf}: ${codigo}`);

      res.json({
        message: 'Código de recuperação enviado',
        canais_disponiveis: ['email', 'sms']
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * Valida código de recuperação
   */
  validarCodigo: async (req, res) => {
    try {
      const { cpf, codigo } = req.body;

      if (!cpf || !codigo) {
        return res.status(400).json({ error: 'CPF e código são obrigatórios' });
      }

      const dadosRecuperacao = codigosRecuperacao.get(cpf.replace(/\D/g, ''));

      if (!dadosRecuperacao) {
        return res.status(400).json({ error: 'Código inválido ou expirado' });
      }

      if (Date.now() > dadosRecuperacao.expiresAt) {
        codigosRecuperacao.delete(cpf.replace(/\D/g, ''));
        return res.status(400).json({ error: 'Código expirado' });
      }

      if (dadosRecuperacao.codigo !== codigo) {
        return res.status(400).json({ error: 'Código inválido' });
      }

      // Gera token temporário para reset de senha
      const resetToken = jwt.sign(
        { cpf: cpf.replace(/\D/g, ''), tipo: 'reset' },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '15m' }
      );

      res.json({
        status: 'validado',
        reset_token: resetToken
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * Redefine a senha
   */
  resetPassword: async (req, res) => {
    try {
      const { reset_token, nova_senha } = req.body;

      if (!reset_token || !nova_senha) {
        return res.status(400).json({ error: 'Token e nova senha são obrigatórios' });
      }

      // Valida token
      let decoded;
      try {
        decoded = jwt.verify(reset_token, process.env.JWT_SECRET || 'secret');
      } catch (error) {
        return res.status(401).json({ error: 'Token inválido ou expirado' });
      }

      if (decoded.tipo !== 'reset') {
        return res.status(401).json({ error: 'Token inválido' });
      }

      // Atualiza senha (em produção, usar bcrypt.hash)
      const participante = participantes.find(p => p.cpf === decoded.cpf);
      if (participante) {
        participante.senha = await bcrypt.hash(nova_senha, 10);
      }

      // Remove código de recuperação
      codigosRecuperacao.delete(decoded.cpf);

      res.json({ message: 'Senha redefinida com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = authController;
module.exports.participantes = participantes;

