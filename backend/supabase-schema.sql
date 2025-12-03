-- Schema do banco de dados Supabase para Autoprev
-- Execute este SQL no SQL Editor do Supabase

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cpf VARCHAR(11) UNIQUE NOT NULL,
  nome VARCHAR(255) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  telefone VARCHAR(20),
  perfis JSONB DEFAULT '[]'::jsonb,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para busca rápida por CPF
CREATE INDEX IF NOT EXISTS idx_usuarios_cpf ON usuarios(cpf);

-- Índice para busca por email
CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios(email) WHERE email IS NOT NULL;

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at
CREATE TRIGGER update_usuarios_updated_at 
  BEFORE UPDATE ON usuarios 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) - Políticas de segurança
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;

-- Política: Permitir leitura para todos (ajuste conforme necessário)
CREATE POLICY "Permitir leitura de usuários" ON usuarios
  FOR SELECT
  USING (true);

-- Política: Permitir inserção (ajuste conforme necessário)
CREATE POLICY "Permitir inserção de usuários" ON usuarios
  FOR INSERT
  WITH CHECK (true);

-- Política: Permitir atualização (ajuste conforme necessário)
CREATE POLICY "Permitir atualização de usuários" ON usuarios
  FOR UPDATE
  USING (true);

-- Política: Permitir deleção (ajuste conforme necessário)
CREATE POLICY "Permitir deleção de usuários" ON usuarios
  FOR DELETE
  USING (true);

-- Comentários nas colunas
COMMENT ON TABLE usuarios IS 'Tabela de usuários do sistema Autoprev';
COMMENT ON COLUMN usuarios.cpf IS 'CPF do usuário (apenas números, 11 dígitos)';
COMMENT ON COLUMN usuarios.nome IS 'Nome completo do usuário';
COMMENT ON COLUMN usuarios.senha IS 'Hash da senha (bcrypt)';
COMMENT ON COLUMN usuarios.perfis IS 'Array JSON com perfis/planos do usuário';
COMMENT ON COLUMN usuarios.ativo IS 'Indica se o usuário está ativo';

