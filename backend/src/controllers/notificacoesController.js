const notificacoesController = {
  listarNotificacoes: async (req, res) => {
    try {
      const { cpf } = req.params;
      
      // Mock data
      res.json([
        {
          id: 1,
          titulo: 'Nova pendência financeira',
          corpo_resumo: 'Você possui uma pendência financeira vencida',
          prioridade: 'alta',
          origem: 'sistema',
          data: '2025-11-17T10:00:00Z',
          lido: false
        }
      ]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  abrirChamado: async (req, res) => {
    try {
      const { cpf } = req.params;
      const { assunto, descricao, anexos } = req.body;
      
      if (!assunto || !descricao) {
        return res.status(400).json({ error: 'Assunto e descrição são obrigatórios' });
      }
      
      const protocolo = `CHM${Date.now()}`;
      
      res.status(201).json({
        protocolo,
        assunto,
        descricao,
        anexos: anexos || [],
        sla_previsto: '48 horas',
        data_abertura: new Date().toISOString(),
        status: 'aberto'
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  listarChamados: async (req, res) => {
    try {
      const { cpf } = req.params;
      
      // Mock data
      res.json([
        {
          protocolo: 'CHM1234567890',
          assunto: 'Dúvida sobre contribuição',
          descricao: 'Tenho dúvidas sobre como alterar minha contribuição',
          anexos: [],
          sla_previsto: '48 horas',
          status: 'em_andamento',
          data_abertura: '2025-11-15T10:00:00Z'
        }
      ]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = notificacoesController;

