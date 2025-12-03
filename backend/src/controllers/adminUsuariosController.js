const supabase = require('../config/supabase');
const bcrypt = require('bcryptjs');

// Fallback para dados mockados se Supabase não estiver configurado
const authController = require('./authController');
const participantes = authController.participantes || [];
const participantesController = require('./participantesController');
const participantesData = participantesController.participantesData || {};

const adminUsuariosController = {
  /**
   * Lista todos os usuários (para admin)
   */
  listarUsuarios: async (req, res) => {
    try {
      console.log('ListarUsuarios chamado');
      
      // Tenta usar Supabase primeiro
      if (supabase) {
        const { data, error } = await supabase
          .from('usuarios')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Erro ao buscar usuários no Supabase:', error);
          // Fallback para dados mockados
        } else if (data) {
          const usuarios = data.map(u => ({
            cpf: u.cpf,
            nome: u.nome,
            email: u.email || '',
            telefone: u.telefone || '',
            perfis: u.perfis || [],
            ativo: u.ativo !== false,
            data_cadastro: u.created_at || new Date().toISOString()
          }));
          return res.json(usuarios);
        }
      }

      // Fallback: dados mockados
      console.log('Usando dados mockados (fallback)');
      console.log('Participantes:', participantes?.length || 0);
      
      if (!participantes || participantes.length === 0) {
        return res.json([]);
      }

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
      console.error('Erro em listarUsuarios:', error);
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * Busca um usuário específico
   */
  buscarUsuario: async (req, res) => {
    try {
      const { cpf } = req.params;
      const cpfLimpo = cpf.replace(/\D/g, '');

      // Tenta usar Supabase primeiro
      if (supabase) {
        const { data, error } = await supabase
          .from('usuarios')
          .select('*')
          .eq('cpf', cpfLimpo)
          .single();

        if (!error && data) {
          return res.json({
            cpf: data.cpf,
            nome: data.nome,
            email: data.email || '',
            telefone: data.telefone || '',
            perfis: data.perfis || [],
            ativo: data.ativo !== false,
            cadastro: {
              email_contato: data.email,
              telefone_celular: data.telefone
            }
          });
        }
      }

      // Fallback: dados mockados
      const participante = participantes.find(p => p.cpf === cpfLimpo);
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

      // Hash da senha
      const senhaHash = await bcrypt.hash(senha, 10);

      // Tenta usar Supabase primeiro
      if (supabase) {
        // Verifica se já existe
        const { data: existe } = await supabase
          .from('usuarios')
          .select('cpf')
          .eq('cpf', cpfLimpo)
          .single();

        if (existe) {
          return res.status(400).json({ error: 'Usuário já existe' });
        }

        // Cria novo usuário
        const { data, error } = await supabase
          .from('usuarios')
          .insert({
            cpf: cpfLimpo,
            nome: nome,
            senha: senhaHash,
            email: email || null,
            telefone: telefone || null,
            perfis: [{
              plano_id: 1,
              nome_plano: 'Plano Básico',
              papel: 'ativo'
            }],
            ativo: true
          })
          .select()
          .single();

        if (error) {
          console.error('Erro ao criar usuário no Supabase:', error);
          return res.status(500).json({ error: error.message });
        }

        return res.status(201).json({
          message: 'Usuário criado com sucesso',
          usuario: {
            cpf: data.cpf,
            nome: data.nome,
            email: data.email,
            telefone: data.telefone,
            perfis: data.perfis
          }
        });
      }

      // Fallback: dados mockados
      const existe = participantes.find(p => p.cpf === cpfLimpo);
      if (existe) {
        return res.status(400).json({ error: 'Usuário já existe' });
      }

      const novoParticipante = {
        cpf: cpfLimpo,
        senha: senhaHash,
        nome: nome,
        perfis: [{
          plano_id: 1,
          nome_plano: 'Plano Básico',
          papel: 'ativo'
        }]
      };

      participantes.push(novoParticipante);

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
      console.error('Erro ao criar usuário:', error);
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

      const updateData = {};
      if (nome) updateData.nome = nome;
      if (email !== undefined) updateData.email = email || null;
      if (telefone !== undefined) updateData.telefone = telefone || null;
      if (senha) {
        updateData.senha = await bcrypt.hash(senha, 10);
      }

      // Tenta usar Supabase primeiro
      if (supabase) {
        const { data, error } = await supabase
          .from('usuarios')
          .update(updateData)
          .eq('cpf', cpfLimpo)
          .select()
          .single();

        if (error) {
          console.error('Erro ao atualizar usuário no Supabase:', error);
          return res.status(500).json({ error: error.message });
        }

        if (!data) {
          return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        return res.json({
          message: 'Usuário atualizado com sucesso',
          usuario: {
            cpf: data.cpf,
            nome: data.nome,
            email: data.email,
            telefone: data.telefone
          }
        });
      }

      // Fallback: dados mockados
      const participante = participantes.find(p => p.cpf === cpfLimpo);
      if (!participante) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      if (nome) participante.nome = nome;
      if (senha) participante.senha = await bcrypt.hash(senha, 10);

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
      console.error('Erro ao atualizar usuário:', error);
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

      // Tenta usar Supabase primeiro
      if (supabase) {
        const { error } = await supabase
          .from('usuarios')
          .delete()
          .eq('cpf', cpfLimpo);

        if (error) {
          console.error('Erro ao remover usuário no Supabase:', error);
          return res.status(500).json({ error: error.message });
        }

        return res.json({ message: 'Usuário removido com sucesso' });
      }

      // Fallback: dados mockados
      const index = participantes.findIndex(p => p.cpf === cpfLimpo);
      if (index === -1) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      participantes.splice(index, 1);
      delete participantesData[cpfLimpo];

      res.json({ message: 'Usuário removido com sucesso' });
    } catch (error) {
      console.error('Erro ao remover usuário:', error);
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = adminUsuariosController;
