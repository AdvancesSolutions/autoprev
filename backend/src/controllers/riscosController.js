const riscosController = {
  listarRiscos: async (req, res) => {
    try {
      const { cpf } = req.params;
      const { plano_id } = req.query;
      
      // Mock data
      res.json([
        {
          matricula: 'MAT001',
          tipo: 'morte',
          capital_segurado: 100000.00,
          premio_mensal: 50.00,
          vigencia: '2025-01-01',
          carencias: {
            morte: 0,
            invalidez: 24
          }
        }
      ]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  cotarRisco: async (req, res) => {
    try {
      const { cpf } = req.params;
      const { idade, faixa_salarial, capital_desejado } = req.body;
      
      // Mock calculation
      res.json({
        premio_estimado: 75.00,
        capital_maximo: 200000.00,
        observacoes: 'Cobertura disponível conforme perfil'
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  aderirRisco: async (req, res) => {
    try {
      const { cpf } = req.params;
      const { tipo, capital, premio, termo_aceite } = req.body;
      
      if (!termo_aceite) {
        return res.status(400).json({ error: 'Termo de aceite é obrigatório' });
      }
      
      // Mock adesão
      res.json({
        message: 'Adesão realizada com sucesso',
        cobertura_id: 1,
        pdf_url: `/uploads/coberturas/adesao_${cpf}_${Date.now()}.pdf`
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = riscosController;

