// Mock data - em produção, isso viria de um banco de dados
const documentos = {
  1: [
    {
      tipo: 'aviso de privacidade',
      titulo: 'Aviso de Privacidade - Autoprev',
      versao: '1.0',
      pdf_url: '/uploads/documentos/aviso_privacidade_v1.pdf',
      data_publicacao: '2024-01-01'
    },
    {
      tipo: 'termo de uso',
      titulo: 'Termo de Uso - Autoprev',
      versao: '1.0',
      pdf_url: '/uploads/documentos/termo_uso_v1.pdf',
      data_publicacao: '2024-01-01'
    }
  ]
};

const consentimentos = [];

const documentosController = {
  /**
   * Lista documentos legais de um instituto
   */
  listarDocumentos: async (req, res) => {
    try {
      const { instituto_id } = req.params;
      const docs = documentos[instituto_id] || [];

      res.json(docs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * Registra consentimento do usuário
   */
  registrarConsentimento: async (req, res) => {
    try {
      const { cpf, entidade_id, tipo_documento, versao } = req.body;

      if (!cpf || !entidade_id || !tipo_documento || !versao) {
        return res.status(400).json({ 
          error: 'CPF, entidade_id, tipo_documento e versão são obrigatórios' 
        });
      }

      const consentimento = {
        id: consentimentos.length + 1,
        cpf: cpf.replace(/\D/g, ''),
        entidade_id,
        tipo_documento,
        versao,
        aceito_em: new Date().toISOString()
      };

      consentimentos.push(consentimento);

      res.status(201).json(consentimento);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = documentosController;

