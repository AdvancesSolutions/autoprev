const contribuicoesController = {
  listarAnos: async (req, res) => {
    try {
      const { cpf } = req.params;
      // Mock data
      res.json([
        {
          ano_inicial: 2020,
          ano_atual: 2025
        }
      ]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  obterExtrato: async (req, res) => {
    try {
      const { cpf } = req.params;
      const { plano_id, periodo, page = 1, limit = 20 } = req.query;
      
      // Gerar dados mockados para o período solicitado
      const transacoes = [];
      const [ano, mes] = periodo ? periodo.split('-').map(Number) : [new Date().getFullYear(), new Date().getMonth() + 1];
      
      // Gerar 12 meses de dados (últimos 12 meses incluindo o período selecionado)
      const mesesParaGerar = 12;
      const periodoDate = new Date(ano, mes - 1, 1); // mes - 1 porque Date usa 0-11
      
      for (let i = mesesParaGerar - 1; i >= 0; i--) {
        const dataCompetencia = new Date(periodoDate);
        dataCompetencia.setMonth(periodoDate.getMonth() - i);
        
        const anoCompetencia = dataCompetencia.getFullYear();
        const mesCompetencia = String(dataCompetencia.getMonth() + 1).padStart(2, '0');
        const competencia = `${anoCompetencia}-${mesCompetencia}`;
        
        // Valores variados para tornar mais realista
        const baseValor = 400 + Math.random() * 300; // Entre 400 e 700
        const contribParticipante = Math.round(baseValor * 100) / 100;
        const contribPatrocinador = Math.round(contribParticipante * 2 * 100) / 100;
        
        transacoes.push({
          matricula: 'MAT001',
          plano_id: Number(plano_id) || 1,
          competencia: competencia,
          contrib_participante_reais: contribParticipante,
          contrib_participante_cotas: Math.round(contribParticipante * 0.2),
          contrib_patrocinador_reais: contribPatrocinador,
          contrib_patrocinador_cotas: Math.round(contribPatrocinador * 0.2),
          total_reais: contribParticipante + contribPatrocinador,
          total_cotas: Math.round((contribParticipante + contribPatrocinador) * 0.2)
        });
      }
      
      // Ordenar por competência (mais recente primeiro)
      transacoes.sort((a, b) => b.competencia.localeCompare(a.competencia));
      
      // Paginação
      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);
      const startIndex = (pageNum - 1) * limitNum;
      const endIndex = startIndex + limitNum;
      const paginatedTransacoes = transacoes.slice(startIndex, endIndex);
      
      res.json({
        transacoes: paginatedTransacoes,
        paginacao: {
          pagina_atual: pageNum,
          itens_por_pagina: limitNum,
          total_itens: transacoes.length,
          total_paginas: Math.ceil(transacoes.length / limitNum),
          tem_proxima: endIndex < transacoes.length,
          tem_anterior: pageNum > 1
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  obterParametros: async (req, res) => {
    try {
      const { cpf } = req.params;
      const { plano_id } = req.query;
      
      // Mock data - retornando campos esperados pelo frontend
      res.json({
        matricula: 'MAT001',
        plano_id: Number(plano_id) || 1,
        percentual_participante: 8.5,
        percentual_patrocinadora: 17.0,
        valor_base: 500.00,
        // Campos adicionais para referência
        faixa1_percentual_minimo: 5,
        faixa1_valor_minimo: 100.00,
        faixa1_percentual_maximo: 10,
        faixa1_valor_maximo: 500.00,
        faixa2_percentual_minimo: 10,
        faixa2_valor_minimo: 500.00,
        faixa2_percentual_maximo: 15,
        faixa2_valor_maximo: 1000.00
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  simularAlteracao: async (req, res) => {
    try {
      const { cpf } = req.params;
      const { percentuais_propostos } = req.body;
      
      // Mock simulation
      res.json({
        impacto_em_valores: {
          valor_mensal: 600.00,
          valor_anual: 7200.00
        },
        impacto_liquido_em_folha: {
          desconto_mensal: 550.00,
          desconto_anual: 6600.00
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  alterarParametros: async (req, res) => {
    try {
      const { cpf } = req.params;
      const dados = req.body;
      
      // Mock update
      res.json({
        message: 'Parâmetros atualizados com sucesso',
        ...dados
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  gerarPDF: async (req, res) => {
    try {
      const { cpf } = req.params;
      const { periodo } = req.query;
      
      // Mock PDF generation
      res.json({
        pdf_url: `/uploads/extratos/extrato_${cpf}_${periodo}.pdf`,
        message: 'PDF gerado com sucesso'
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = contribuicoesController;

