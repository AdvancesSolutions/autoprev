// Mock data - em produção, isso viria de um banco de dados
// CPF válido para teste: 11144477735
const participantesData = {
  '11144477735': {
    cpf: '11144477735',
    nome: 'João Silva',
    matricula: 'MAT001',
    perfis: [
      {
        plano_id: 1,
        nome_plano: 'Plano Básico',
        papel: 'ativo',
        data_adesao: '2020-01-15',
        regime_tributario: 'regime_geral'
      }
    ],
    resumo: {
      nome: 'João Silva',
      matricula: 'MAT001',
      nome_plano: 'Plano Básico',
      data_adesao: '2020-01-15',
      regime_tributario: 'regime_geral',
      tempo_falta_aposentadoria: 15,
      valor_ultima_contribuicao_participante: 500.00,
      valor_custeio_administrativo_participante: 50.00,
      valor_ultima_contribuicao_patrocinadora: 1000.00,
      valor_custeio_administrativo_patrocinadora: 100.00,
      projecao_dib_20_anos_sem_abono: 3500.00,
      projecao_indeterminado_sem_abono: 4000.00,
      atalhos: []
    },
    cadastro: {
      cpf: '11144477735',
      nome: 'João Silva',
      data_nascimento: '1980-05-20',
      rg: '123456789',
      orgao: 'SSP',
      sexo: 'M',
      estado_civil: 'casado',
      telefone_celular: '(11) 98765-4321',
      telefone_fixo: '(11) 3456-7890',
      email_contato: 'joao.silva@email.com',
      email_secundario: '',
      cep: '01310-100',
      logradouro: 'Av. Paulista',
      complemento: 'Apto 101',
      numero: '1000',
      bairro: 'Bela Vista',
      cidade: 'São Paulo',
      uf: 'SP',
      ppe: false,
      parentesco_ppe: null,
      nome_ppe: null,
      residencia_fiscal_exterior: false
    },
    pendencias: [
      {
        pendencia_id: 1,
        descricao: 'Contribuição em atraso',
        situacao: 'pendente',
        vencimento: '2025-11-15',
        valor_atualizado: 550.00
      }
    ],
    contas_bancarias: [
      {
        id: 1,
        banco: '001',
        agencia: '1234',
        conta: '56789',
        digito: '0',
        tipo: 'corrente'
      }
    ],
    dependentes: [
      {
        id: 1,
        nome: 'Maria Silva',
        parentesco: 'conjuge',
        estado_civil: 'casada',
        data_nascimento: '1982-08-15',
        sexo: 'F',
        elegibilidade: true
      }
    ],
    beneficiarios: [
      {
        id: 1,
        nome: 'Maria Silva',
        parentesco: 'conjuge',
        estado_civil: 'casada',
        data_nascimento: '1982-08-15',
        sexo: 'F',
        percentual: 100
      }
    ]
  }
};

const participantesController = {
  listarPerfis: async (req, res) => {
    try {
      const { cpf } = req.params;
      const participante = participantesData[cpf.replace(/\D/g, '')];
      
      if (!participante) {
        return res.status(404).json({ error: 'Participante não encontrado' });
      }
      
      res.json(participante.perfis);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  obterResumo: async (req, res) => {
    try {
      const { cpf } = req.params;
      const { plano_id } = req.query;
      const participante = participantesData[cpf.replace(/\D/g, '')];
      
      if (!participante) {
        return res.status(404).json({ error: 'Participante não encontrado' });
      }
      
      res.json(participante.resumo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  listarPendencias: async (req, res) => {
    try {
      const { cpf } = req.params;
      const participante = participantesData[cpf.replace(/\D/g, '')];
      
      if (!participante) {
        return res.status(404).json({ error: 'Participante não encontrado' });
      }
      
      res.json(participante.pendencias);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  obterCadastro: async (req, res) => {
    try {
      const { cpf } = req.params;
      const participante = participantesData[cpf.replace(/\D/g, '')];
      
      if (!participante) {
        return res.status(404).json({ error: 'Participante não encontrado' });
      }
      
      res.json(participante.cadastro);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  atualizarCadastro: async (req, res) => {
    try {
      const { cpf } = req.params;
      const participante = participantesData[cpf.replace(/\D/g, '')];
      
      if (!participante) {
        return res.status(404).json({ error: 'Participante não encontrado' });
      }
      
      // Atualiza apenas campos editáveis
      participante.cadastro = {
        ...participante.cadastro,
        ...req.body,
        cpf: participante.cadastro.cpf // Não permite alterar CPF
      };
      
      res.json(participante.cadastro);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  listarContasBancarias: async (req, res) => {
    try {
      const { cpf } = req.params;
      const participante = participantesData[cpf.replace(/\D/g, '')];
      
      if (!participante) {
        return res.status(404).json({ error: 'Participante não encontrado' });
      }
      
      res.json(participante.contas_bancarias);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  atualizarContaBancaria: async (req, res) => {
    try {
      const { cpf, id } = req.params;
      const participante = participantesData[cpf.replace(/\D/g, '')];
      
      if (!participante) {
        return res.status(404).json({ error: 'Participante não encontrado' });
      }
      
      const contaIndex = participante.contas_bancarias.findIndex(c => c.id === parseInt(id));
      
      if (contaIndex === -1) {
        return res.status(404).json({ error: 'Conta bancária não encontrada' });
      }
      
      participante.contas_bancarias[contaIndex] = {
        ...participante.contas_bancarias[contaIndex],
        ...req.body,
        id: parseInt(id)
      };
      
      res.json(participante.contas_bancarias[contaIndex]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  listarDependentes: async (req, res) => {
    try {
      const { cpf } = req.params;
      const participante = participantesData[cpf.replace(/\D/g, '')];
      
      if (!participante) {
        return res.status(404).json({ error: 'Participante não encontrado' });
      }
      
      res.json(participante.dependentes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  adicionarDependente: async (req, res) => {
    try {
      const { cpf } = req.params;
      const participante = participantesData[cpf.replace(/\D/g, '')];
      
      if (!participante) {
        return res.status(404).json({ error: 'Participante não encontrado' });
      }
      
      const novoDependente = {
        id: participante.dependentes.length + 1,
        ...req.body
      };
      
      participante.dependentes.push(novoDependente);
      
      res.status(201).json(novoDependente);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  atualizarDependente: async (req, res) => {
    try {
      const { cpf, id } = req.params;
      const participante = participantesData[cpf.replace(/\D/g, '')];
      
      if (!participante) {
        return res.status(404).json({ error: 'Participante não encontrado' });
      }
      
      const dependenteIndex = participante.dependentes.findIndex(d => d.id === parseInt(id));
      
      if (dependenteIndex === -1) {
        return res.status(404).json({ error: 'Dependente não encontrado' });
      }
      
      participante.dependentes[dependenteIndex] = {
        ...participante.dependentes[dependenteIndex],
        ...req.body,
        id: parseInt(id)
      };
      
      res.json(participante.dependentes[dependenteIndex]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  removerDependente: async (req, res) => {
    try {
      const { cpf, id } = req.params;
      const participante = participantesData[cpf.replace(/\D/g, '')];
      
      if (!participante) {
        return res.status(404).json({ error: 'Participante não encontrado' });
      }
      
      const dependenteIndex = participante.dependentes.findIndex(d => d.id === parseInt(id));
      
      if (dependenteIndex === -1) {
        return res.status(404).json({ error: 'Dependente não encontrado' });
      }
      
      participante.dependentes.splice(dependenteIndex, 1);
      
      res.json({ message: 'Dependente removido com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  listarBeneficiarios: async (req, res) => {
    try {
      const { cpf } = req.params;
      const participante = participantesData[cpf.replace(/\D/g, '')];
      
      if (!participante) {
        return res.status(404).json({ error: 'Participante não encontrado' });
      }
      
      res.json(participante.beneficiarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  atualizarBeneficiario: async (req, res) => {
    try {
      const { cpf, id } = req.params;
      const participante = participantesData[cpf.replace(/\D/g, '')];
      
      if (!participante) {
        return res.status(404).json({ error: 'Participante não encontrado' });
      }
      
      const beneficiarioIndex = participante.beneficiarios.findIndex(b => b.id === parseInt(id));
      
      if (beneficiarioIndex === -1) {
        return res.status(404).json({ error: 'Beneficiário não encontrado' });
      }
      
      participante.beneficiarios[beneficiarioIndex] = {
        ...participante.beneficiarios[beneficiarioIndex],
        ...req.body,
        id: parseInt(id)
      };
      
      res.json(participante.beneficiarios[beneficiarioIndex]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = participantesController;
module.exports.participantesData = participantesData;

