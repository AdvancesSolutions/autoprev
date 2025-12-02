const emprestimosController = {
  listarEmprestimos: async (req, res) => {
    try {
      const { cpf } = req.params;
      
      // Mock data
      res.json([
        {
          emprestimo_id: 1,
          tipo: 'consignado',
          valor_contratado: 50000.00,
          valor_liberado: 50000.00,
          saldo_devedor: 35000.00,
          prazo_meses: 84,
          taxa_juros_aa: 1.99,
          parcela_atual: 30,
          valor_parcela: 750.00,
          vencimento_proxima_parcela: '2025-12-05',
          parcelas_em_atraso: 0,
          situacao: 'ativo',
          pode_reformar: true,
          contrato: '/uploads/contratos/emprestimo_1.pdf'
        }
      ]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  listarParcelas: async (req, res) => {
    try {
      const { cpf, emprestimo_id } = req.params;
      
      // Mock data
      res.json([
        {
          numero: 1,
          vencimento: '2025-12-05',
          valor_parcela: 750.00,
          descontos: [
            {
              tipo: 'desconto',
              descricao: 'Desconto pontualidade',
              valor: 10.00
            }
          ],
          valor_liquido: 740.00,
          data_pagamento: '2025-11-25',
          status: 'Paga'
        }
      ]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  verificarPreAprovacao: async (req, res) => {
    try {
      const { cpf } = req.params;
      
      res.json({
        limite: 100000.00,
        taxa: 1.99,
        prazo_max: 84
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  simularEmprestimo: async (req, res) => {
    try {
      const { cpf } = req.params;
      const { valor, parcelas } = req.body;
      
      // Mock calculation
      const taxa = 1.99;
      const valorParcela = (valor * (taxa / 100 / 12) * Math.pow(1 + (taxa / 100 / 12), parcelas)) / 
                           (Math.pow(1 + (taxa / 100 / 12), parcelas) - 1);
      
      res.json({
        proposta_id: Date.now(),
        cet: 2.5,
        valor_parcela: valorParcela.toFixed(2),
        data_vencimento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        total_emprestimo: valor
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  contratarEmprestimo: async (req, res) => {
    try {
      const { cpf } = req.params;
      const { cet, total_emprestimo, valor_parcela, prazo, data_vencimento, aceite_termos } = req.body;
      
      if (!aceite_termos) {
        return res.status(400).json({ error: 'Aceite dos termos é obrigatório' });
      }
      
      res.json({
        message: 'Empréstimo contratado com sucesso',
        emprestimo_id: Date.now(),
        contrato_url: `/uploads/contratos/emprestimo_${Date.now()}.pdf`
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  listarBoletos: async (req, res) => {
    try {
      const { cpf } = req.params;
      const { status } = req.query;
      
      // Mock data
      res.json([
        {
          nosso_numero: '12345678901234567890',
          vencimento: '2025-12-05',
          valor: 750.00,
          linha_digitavel: '34191.09008 01234.567890 12345.678901 2 98760000075000',
          pix_qr: '00020126360014BR.GOV.BCB.PIX0114+5511987654321...'
        }
      ]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  confirmarPagamento: async (req, res) => {
    try {
      const { cpf } = req.params;
      const { identificador, meio, conciliacao } = req.body;
      
      res.json({
        message: 'Pagamento confirmado',
        status: 'pago',
        data_pagamento: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  quitarEmprestimo: async (req, res) => {
    try {
      const { cpf } = req.params;
      const { contrato_origem, valor_quitacao, data_limite } = req.body;
      
      res.json({
        message: 'Quitação processada',
        valor_quitacao,
        data_limite,
        comprovante_url: `/uploads/comprovantes/quitacao_${Date.now()}.pdf`
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  refinanciarEmprestimo: async (req, res) => {
    try {
      const { cpf } = req.params;
      const { contrato_origem, total_emprestimo, parcelas, aceite_termos } = req.body;
      
      if (!aceite_termos) {
        return res.status(400).json({ error: 'Aceite dos termos é obrigatório' });
      }
      
      const taxa = 1.99;
      const valorParcela = (total_emprestimo * (taxa / 100 / 12) * Math.pow(1 + (taxa / 100 / 12), parcelas)) / 
                           (Math.pow(1 + (taxa / 100 / 12), parcelas) - 1);
      
      res.json({
        valor_parcela: valorParcela.toFixed(2),
        cet: 2.5,
        data_vencimento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        contrato_url: `/uploads/contratos/refinanciamento_${Date.now()}.pdf`
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = emprestimosController;

