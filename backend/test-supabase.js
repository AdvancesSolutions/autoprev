// Script de teste para verificar conexão com Supabase
require('dotenv').config();
const supabase = require('./src/config/supabase');

async function testSupabase() {
  console.log('=== Testando Conexão com Supabase ===\n');

  // Verifica se está configurado
  if (!supabase) {
    console.log('❌ Supabase não configurado!');
    console.log('   Verifique se SUPABASE_URL e SUPABASE_ANON_KEY estão no .env');
    return;
  }

  console.log('✓ Cliente Supabase inicializado\n');

  // Testa conexão listando usuários
  try {
    console.log('Testando consulta à tabela usuarios...');
    const { data, error } = await supabase
      .from('usuarios')
      .select('count')
      .limit(1);

    if (error) {
      console.log('❌ Erro ao conectar:', error.message);
      if (error.message.includes('relation "usuarios" does not exist')) {
        console.log('\n⚠️  A tabela usuarios não existe!');
        console.log('   Execute o SQL schema no Supabase primeiro.');
      }
      return;
    }

    console.log('✓ Conexão com Supabase funcionando!');
    console.log('✓ Tabela usuarios encontrada!\n');

    // Conta usuários
    const { count, error: countError } = await supabase
      .from('usuarios')
      .select('*', { count: 'exact', head: true });

    if (!countError) {
      console.log(`📊 Total de usuários no banco: ${count || 0}`);
    }

    console.log('\n✅ Tudo funcionando corretamente!');
    console.log('\nPróximos passos:');
    console.log('1. Teste criar um usuário via API');
    console.log('2. Teste fazer login');
    console.log('3. Configure as variáveis no Vercel também');

  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

testSupabase();

