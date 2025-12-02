const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

// Configuração do multer para upload de arquivos
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads/logos');
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `logo_${req.params.entidade_id}_${Date.now()}${ext}`;
    cb(null, filename);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|svg/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Apenas imagens são permitidas (JPEG, JPG, PNG, GIF, SVG)'));
    }
  }
});

// Exporta o middleware de upload separadamente
const uploadLogoMiddleware = upload.single('logo');

// Mock data - em produção, isso viria de um banco de dados
let entidades = [
  {
    entidade_id: 1,
    nome_fantasia: "Autoprev",
    logotipo_url: "/uploads/logos/default_logo.png",
    telefone_0800: "0800-123-4567",
    telefone_entidade: "(11) 3456-7890",
    email: "contato@autoprev.com.br",
    texto_mensagem_boas_vindas: "Bem-vindo ao Autoprev!",
    texto_autopatrocinio: "Texto sobre autopatrocinio",
    texto_portabilidade: "Texto sobre portabilidade",
    texto_resgate: "Texto sobre resgate",
    texto_bpd: "Texto sobre BPD",
    texto_emprestimo: "Texto sobre empréstimo",
    texto_confirmacao_emprestimo: "Empréstimo confirmado com sucesso!",
    texto_quitacao_emprestimo: "Texto sobre quitação de empréstimo",
    texto_confirmacao_quitacao_emprestimo: "Quitação confirmada!",
    texto_refinanciamento_emprestimo: "Texto sobre refinanciamento",
    texto_sucesso_refinanciamento: "Refinanciamento realizado com sucesso!",
    texto_confirmacao_solicitacao_beneficios: "Solicitação de benefícios confirmada",
    texto_confirmacao_aporte_extraordinario: "Aporte extraordinário confirmado",
    texto_adesao_cobertura_risco: "Texto sobre adesão de cobertura",
    texto_cobertura_morte: "Texto sobre cobertura de morte",
    texto_cobertura_invalidez: "Texto sobre cobertura de invalidez",
    texto_doencas_graves: "Texto sobre doenças graves",
    texto_auxilio_funeral: "Texto sobre auxílio funeral",
    texto_solicitacao_confirmacao_adesao: "Adesão confirmada",
    texto_aceite_alteracao_contribuicao: "Texto sobre aceite de alteração",
    texto_confirmacao_alteracao_contribuicao: "Alteração de contribuição confirmada",
    mensagens_habilitado: true,
    meu_retrato_habilitado: true,
    extrato_contribuicao_habilitado: true,
    extrato_beneficio_habilitado: true,
    pendencias_financeiras_habilitado: true,
    emprestimos_habilitado: true,
    dados_cadastrais_habilitado: true,
    percentual_contribuicao_habilitado: true,
    simulador_tributario_habilitado: true,
    simulador_beneficios_habilitado: true,
    solicitacao_beneficios_habilitado: true,
    grafico_rentabilidade_habilitado: true,
    cores: {
      primaria: "#0066CC",
      secundaria: "#00A86B",
      background: "#FFFFFF",
      texto: "#333333"
    }
  }
];

const entidadeController = {
  /**
   * Lista todas as entidades
   */
  listarEntidades: async (req, res) => {
    try {
      res.json(entidades);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * Busca uma entidade específica
   */
  buscarEntidade: async (req, res) => {
    try {
      const { entidade_id } = req.params;
      const entidade = entidades.find(e => e.entidade_id === parseInt(entidade_id));
      
      if (!entidade) {
        return res.status(404).json({ error: 'Entidade não encontrada' });
      }
      
      res.json(entidade);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * Atualiza configurações da entidade
   */
  atualizarEntidade: async (req, res) => {
    try {
      const { entidade_id } = req.params;
      const index = entidades.findIndex(e => e.entidade_id === parseInt(entidade_id));
      
      if (index === -1) {
        return res.status(404).json({ error: 'Entidade não encontrada' });
      }
      
      // Atualiza apenas os campos fornecidos
      entidades[index] = {
        ...entidades[index],
        ...req.body,
        entidade_id: parseInt(entidade_id) // Garante que o ID não seja alterado
      };
      
      res.json(entidades[index]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * Upload de logo
   */
  uploadLogo: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Nenhum arquivo enviado' });
      }
      
      const { entidade_id } = req.params;
      const index = entidades.findIndex(e => e.entidade_id === parseInt(entidade_id));
      
      if (index === -1) {
        // Remove o arquivo se a entidade não existir
        await fs.unlink(req.file.path);
        return res.status(404).json({ error: 'Entidade não encontrada' });
      }
      
      // Atualiza a URL do logo
      const logoUrl = `/uploads/logos/${req.file.filename}`;
      entidades[index].logotipo_url = logoUrl;
      
      res.json({
        message: 'Logo atualizado com sucesso',
        logotipo_url: logoUrl
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

// Exporta o middleware separadamente
entidadeController.uploadLogoMiddleware = uploadLogoMiddleware;

module.exports = entidadeController;

