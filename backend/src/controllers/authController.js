const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const supabase = require('../config/supabase');

// Mock data - fallback se Supabase não estiver configurado
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

      // Tenta usar Supabase primeiro
      if (supabase) {
        const { data: usuario, error } = await supabase
          .from('usuarios')
          .select('*')
          .eq('cpf', cpfLimpo)
          .eq('ativo', true)
          .single();

        if (!error && usuario) {
          // Valida senha com bcrypt
          const senhaValida = await bcrypt.compare(senha, usuario.senha);

          if (!senhaValida) {
            console.log('Senha inválida');
            return res.status(401).json({ error: 'CPF ou senha inválidos' });
          }

          console.log('Login bem-sucedido (Supabase):', usuario.nome);

          // Gera token JWT
          const token = jwt.sign(
            { cpf: usuario.cpf, nome: usuario.nome },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
          );

          return res.json({
            token,
            perfis: usuario.perfis || []
          });
        }
      }

      // Fallback: dados mockados
      console.log('Usando dados mockados (fallback)');
      console.log('Participantes disponíveis:', participantes.map(p => p.cpf));

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

      const cpfLimpo = cpf.replace(/\D/g, '');

      // Tenta usar Supabase primeiro
      if (supabase) {
        const { data: usuario, error } = await supabase
          .from('usuarios')
          .select('cpf, nome, email')
          .eq('cpf', cpfLimpo)
          .single();

        if (error || !usuario) {
          return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        // Gera código de recuperação
        const codigo = Math.floor(100000 + Math.random() * 900000).toString();
        codigosRecuperacao.set(cpfLimpo, {
          codigo,
          expiraEm: Date.now() + 15 * 60 * 1000 // 15 minutos
        });

        // Aqui você enviaria o código por email
        console.log(`Código de recuperação para ${usuario.email}: ${codigo}`);

        return res.json({
          message: 'Código de recuperação enviado',
          email: usuario.email ? usuario.email.replace(/(.{2})(.*)(@.*)/, '$1***$3') : null
        });
      }

      // Fallback: dados mockados
      const participante = participantes.find(p => p.cpf === cpfLimpo);
      if (!participante) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      const codigo = Math.floor(100000 + Math.random() * 900000).toString();
      codigosRecuperacao.set(cpfLimpo, {
        codigo,
        expiraEm: Date.now() + 15 * 60 * 1000
      });

      res.json({
        message: 'Código de recuperação enviado',
        email: 'usuario@email.com' // Mock
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

      const cpfLimpo = cpf.replace(/\D/g, '');
      const dados = codigosRecuperacao.get(cpfLimpo);

      if (!dados || dados.codigo !== codigo) {
        return res.status(400).json({ error: 'Código inválido' });
      }

      if (Date.now() > dados.expiraEm) {
        codigosRecuperacao.delete(cpfLimpo);
        return res.status(400).json({ error: 'Código expirado' });
      }

      res.json({ message: 'Código válido' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * Redefine senha
   */
  resetPassword: async (req, res) => {
    try {
      const { cpf, codigo, novaSenha } = req.body;

      if (!cpf || !codigo || !novaSenha) {
        return res.status(400).json({ error: 'CPF, código e nova senha são obrigatórios' });
      }

      const cpfLimpo = cpf.replace(/\D/g, '');
      const dados = codigosRecuperacao.get(cpfLimpo);

      if (!dados || dados.codigo !== codigo) {
        return res.status(400).json({ error: 'Código inválido' });
      }

      if (Date.now() > dados.expiraEm) {
        codigosRecuperacao.delete(cpfLimpo);
        return res.status(400).json({ error: 'Código expirado' });
      }

      // Hash da nova senha
      const senhaHash = await bcrypt.hash(novaSenha, 10);

      // Tenta usar Supabase primeiro
      if (supabase) {
        const { error } = await supabase
          .from('usuarios')
          .update({ senha: senhaHash })
          .eq('cpf', cpfLimpo);

        if (error) {
          console.error('Erro ao atualizar senha no Supabase:', error);
          return res.status(500).json({ error: error.message });
        }

        codigosRecuperacao.delete(cpfLimpo);
        return res.json({ message: 'Senha redefinida com sucesso' });
      }

      // Fallback: dados mockados
      const participante = participantes.find(p => p.cpf === cpfLimpo);
      if (participante) {
        participante.senha = senhaHash;
      }

      codigosRecuperacao.delete(cpfLimpo);
      res.json({ message: 'Senha redefinida com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Exporta participantes para uso em outros controllers (fallback)
  participantes: participantes
};

module.exports = authController;
