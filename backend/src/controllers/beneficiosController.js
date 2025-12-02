const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads/anexos');
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `anexo_${req.params.solicitacao_id}_${Date.now()}${ext}`;
    cb(null, filename);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

// Exporta o middleware de upload separadamente
const uploadAnexoMiddleware = upload.single('anexo');

const beneficiosController = {
  listarBeneficios: async (req, res) => {
    try {
      const { cpf } = req.params;
      
      // Mock data
      res.json([
        {
          beneficio_id: 1,
          tipo: 'aposentadoria',
          valor_bruto: 3500.00,
          descontos: [
            {
              codigo: 'IR',
              tipo: 'imposto_renda',
              descricao: 'Imposto de Renda',
              valor: 350.00
            }
          ],
          total_descontos: 350.00,
          valor_liquido: 3150.00,
          data_pagamento: '2025-11-05',
          conta_bancaria: {
            banco: '001',
            agencia: '1234',
            conta: '56789'
          }
        }
      ]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  listarAnos: async (req, res) => {
    try {
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
      const { periodo } = req.query;
      
      // Mock data
      res.json([
        {
          competencia: '2025-11',
          valor_bruto: 3500.00,
          descontos: 350.00,
          valor_liquido: 3150.00,
          data_pagamento: '2025-11-05'
        }
      ]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  obterInformeIR: async (req, res) => {
    try {
      const { cpf } = req.params;
      const { ano } = req.query;
      
      res.json({
        pdf_url: `/uploads/informes/informe_ir_${cpf}_${ano}.pdf`,
        ano: ano || new Date().getFullYear()
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  simularBeneficios: async (req, res) => {
    try {
      const { cpf } = req.params;
      
      // Mock data
      res.json({
        saldo_conta_aplicavel: 500000.00,
        prazo_recebimento: 240,
        pagamento_unico_percentual: 20,
        abono_anual: 5000.00,
        data_prevista_inicio: '2040-11-01',
        saldo_projetado_na_data: 1200000.00,
        valor_inicial_beneficio: 5000.00,
        valor_pagamento_unico: 240000.00,
        tipo_simulacao: 'aposentadoria'
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  uploadAnexo: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Nenhum arquivo enviado' });
      }
      
      const { cpf, solicitacao_id } = req.params;
      
      res.json({
        anexo_id: Date.now(),
        tipo_documento: req.body.tipo_documento || 'outro',
        descricao: req.body.descricao || '',
        nome_arquivo: req.file.filename,
        data_envio: new Date().toISOString(),
        status: 'enviado',
        url: `/uploads/anexos/${req.file.filename}`
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

// Exporta o middleware separadamente
beneficiosController.uploadAnexoMiddleware = uploadAnexoMiddleware;

module.exports = beneficiosController;

