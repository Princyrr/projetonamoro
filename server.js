import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs'; // Usado para encriptar as senhas de forma segura
import dotenv from 'dotenv'; // Usado para carregar variáveis de ambiente

dotenv.config();

const app = express();

// Middleware para tratar JSON e permitir CORS
app.use(express.json());
app.use(cors());

// Banco de dados fictício (em memória)
const usuarios = [];

// Rota para cadastro
app.post('/api/cadastro', async (req, res) => {
  const { nome, idade, pais, estadoCivil, apelido, email, senha } = req.body;

  if (!nome || !idade || !pais || !estadoCivil || !email || !senha) {
    return res.status(400).json({
      message: 'Todos os campos são obrigatórios.',
    });
  }

  // Verificando se o e-mail já existe
  const usuarioExistente = usuarios.find((user) => user.email === email);
  if (usuarioExistente) {
    return res.status(400).json({
      message: 'Este e-mail já está cadastrado.',
    });
  }

  // Criptografando a senha antes de salvar
  const hashedPassword = await bcrypt.hash(senha, 10);

  // Salvando os dados no banco fictício
  const usuario = { nome, idade, pais, estadoCivil, apelido, email, senha: hashedPassword };
  usuarios.push(usuario);

  // Logando os dados recebidos no terminal
  console.log("Dados do cadastro:", usuario);

  res.status(201).json({
    message: 'Cadastro realizado com sucesso!',
    dados: { nome, email },
  });
});

// Rota para login
app.post('/api/login', async (req, res) => {
  const { email, senha } = req.body;

  console.log("Dados de login recebidos:", { email, senha });  // Logando os dados recebidos no login

  // Verificando se o e-mail existe
  const usuario = usuarios.find((user) => user.email === email);
  if (!usuario) {
    return res.status(401).json({
      message: 'E-mail ou senha incorretos.',
    });
  }

  // Verificando a senha com bcrypt
  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) {
    return res.status(401).json({
      message: 'E-mail ou senha incorretos.',
    });
  }

  // Gerando um "token" fictício (em uma aplicação real, use JWT ou outra solução)
  const token = 'seu-token-ficticio';

  // Enviando o token e mensagem de sucesso
  res.json({
    message: 'Login bem-sucedido',
    token,
  });
});

// Iniciar o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
