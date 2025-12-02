require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// Import routes
const entidadeRoutes = require('./routes/entidade');
const authRoutes = require('./routes/auth');
const adminAuthRoutes = require('./routes/adminAuth');
const participantesRoutes = require('./routes/participantes');
const contribuicoesRoutes = require('./routes/contribuicoes');
const riscosRoutes = require('./routes/riscos');
const beneficiosRoutes = require('./routes/beneficios');
const emprestimosRoutes = require('./routes/emprestimos');
const notificacoesRoutes = require('./routes/notificacoes');
const documentosRoutes = require('./routes/documentos');
const adminUsuariosRoutes = require('./routes/adminUsuarios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/entidade', entidadeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/admin/usuarios', adminUsuariosRoutes);
app.use('/api/institutos', documentosRoutes);
app.use('/api/participantes', participantesRoutes);
app.use('/api/participantes', contribuicoesRoutes);
app.use('/api/participantes', riscosRoutes);
app.use('/api/participantes', beneficiosRoutes);
app.use('/api/participantes', emprestimosRoutes);
app.use('/api/participantes', notificacoesRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Only start the server if not running on Vercel
// Vercel will handle the serverless function invocation
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

module.exports = app;

