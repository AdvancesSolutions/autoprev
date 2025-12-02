// Mock data - em produção, isso viria de um banco de dados
// Acessa participantes do authController
const authController = require('./authController');
const participantes = authController.participantes || [];

// Acessa dados dos participantes
const participantesController = require('./participantesController');
const participantesData = participantesController.participantesData || {};

const adminUsuariosController = {
  /**
   * Lista todos os usuários (para admin)
   */
  listarUsuarios: async (req, res) => {
    try {
      const usuarios = participantes.map(p => {
        const dados = participantesData[p.cpf] || {};
        return {
          cpf: p.cpf,
          nome: p.nome || dados.nome || 'Nome não informado',
          email: dados.cadastro?.email_contato || '',
          telefone: dados.cadastro?.telefone_celular || '',
          perfis: p.perfis || [],
          ativo: true,
          data_cadastro: dados.cadastro?.data_cadastro || new Date().toISOString()
        };
      });

      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * Busca um usuário específico
   */
  buscarUsuario: async (req, res) => {
    try {
      const { cpf } = req.params;
      const participante = participantes.find(p => p.cpf === cpf.replace(/\D/g, ''));

      if (!participante) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      const dados = participantesData[participante.cpf] || {};
      const usuario = {
        cpf: participante.cpf,
        nome: participante.nome || dados.nome || 'Nome não informado',
        email: dados.cadastro?.email_contato || '',
        telefone: dados.cadastro?.telefone_celular || '',
        perfis: participante.perfis || [],
        cadastro: dados.cadastro || {},
        ativo: true
      };

      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * Cria um novo usuário
   */
  criarUsuario: async (req, res) => {
    try {
      const { cpf, nome, senha, email, telefone } = req.body;

      if (!cpf || !nome || !senha) {
        return res.status(400).json({ error: 'CPF, nome e senha são obrigatórios' });
      }

      const cpfLimpo = cpf.replace(/\D/g, '');
      
      // Verifica se já existe
      const existe = participantes.find(p => p.cpf === cpfLimpo);
      if (existe) {
        return res.status(400).json({ error: 'Usuário já existe' });
      }

      // Cria novo participante
      const novoParticipante = {
        cpf: cpfLimpo,
        senha: senha, // Em produção, usar bcrypt.hash
        nome: nome,
        perfis: [
          {
            plano_id: 1,
            nome_plano: 'Plano Básico',
            papel: 'ativo'
          }
        ]
      };

      participantes.push(novoParticipante);

      // Inicializa dados do participante
      if (!participantesData[cpfLimpo]) {
        participantesData[cpfLimpo] = {
          cpf: cpfLimpo,
          nome: nome,
          cadastro: {
            cpf: cpfLimpo,
            nome: nome,
            email_contato: email || '',
            telefone_celular: telefone || ''
          }
        };
      }

      res.status(201).json({
        message: 'Usuário criado com sucesso',
        usuario: {
          cpf: novoParticipante.cpf,
          nome: novoParticipante.nome,
          perfis: novoParticipante.perfis
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * Atualiza um usuário
   */
  atualizarUsuario: async (req, res) => {
    try {
      const { cpf } = req.params;
      const { nome, email, telefone, senha } = req.body;

      const cpfLimpo = cpf.replace(/\D/g, '');
      const participante = participantes.find(p => p.cpf === cpfLimpo);

      if (!participante) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      // Atualiza dados
      if (nome) participante.nome = nome;
      if (senha) participante.senha = senha; // Em produção, usar bcrypt.hash

      // Atualiza dados cadastrais
      if (!participantesData[cpfLimpo]) {
        participantesData[cpfLimpo] = { cpf: cpfLimpo, cadastro: {} };
      }
      if (!participantesData[cpfLimpo].cadastro) {
        participantesData[cpfLimpo].cadastro = {};
      }

      if (email) participantesData[cpfLimpo].cadastro.email_contato = email;
      if (telefone) participantesData[cpfLimpo].cadastro.telefone_celular = telefone;
      if (nome) participantesData[cpfLimpo].nome = nome;

      res.json({
        message: 'Usuário atualizado com sucesso',
        usuario: {
          cpf: participante.cpf,
          nome: participante.nome
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * Remove um usuário
   */
  removerUsuario: async (req, res) => {
    try {
      const { cpf } = req.params;
      const cpfLimpo = cpf.replace(/\D/g, '');

      const index = participantes.findIndex(p => p.cpf === cpfLimpo);
      if (index === -1) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      participantes.splice(index, 1);
      delete participantesData[cpfLimpo];

      res.json({ message: 'Usuário removido com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = adminUsuariosController;

