# API de Produtos

Esta é uma API RESTful para gerenciamento de produtos, desenvolvida com Node.js e Express. O projeto inclui um CRUD completo, utiliza um banco de dados em memória para simplicidade e oferece documentação interativa com Swagger.

## ✨ Features

- ✔️ **CRUD Completo**: Create, Read, Update (PUT e PATCH), Delete.
- ✔️ **Banco de Dados em Memória**: Simples e rápido, sem necessidade de configuração externa.
- ✔️ **Documentação Swagger**: Documentação da API gerada automaticamente e disponível em `/api-docs`.
- ✔️ **Tratamento de Erros**: Middleware centralizado para respostas de erro consistentes e claras.
- ✔️ **Validação de Dados**: Validação robusta de entrada com Joi.
- ✔️ **Autenticação JWT**: Sistema de autenticação e autorização baseado em JSON Web Tokens.
- ✔️ **Segurança**: Implementação de Helmet para cabeçalhos de segurança e Rate Limiting para proteção contra ataques.

## 🛠️ Tecnologias Utilizadas

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [Joi](https://joi.dev/)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- [helmet](https://helmetjs.github.io/)
- [express-rate-limit](https://github.com/nfriedly/express-rate-limit)
- [dotenv](https://github.com/motdotla/dotenv)
- [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc)
- [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)
- [nodemon](https://nodemon.io/)

## 🚀 Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/) (geralmente vem com o Node.js)

## 📦 Instalação e Execução

1. **Clone este repositório:**
   ```bash
   git clone https://github.com/seu-usuario/api-produtos.git
   ```

2. **Acesse a pasta do projeto:**
   ```bash
   cd api-produtos
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Crie o arquivo de variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
   ```
   JWT_SECRET=seu-segredo-super-secreto-aqui
   ```
   **Importante**: Substitua `seu-segredo-super-secreto-aqui` por uma string aleatória e segura.

5. **Execute a aplicação:**

   - **Modo de Desenvolvimento** (com auto-reload a cada alteração):
     ```bash
     npm run dev
     ```

   - **Modo de Produção:**
     ```bash
     npm start
     ```

O servidor estará disponível em `http://localhost:3000`.

## 📚 Documentação da API (Swagger)

A documentação completa e interativa dos endpoints está disponível via Swagger UI. Após iniciar o servidor, acesse o seguinte link no seu navegador:

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

A partir da interface do Swagger, você pode visualizar e testar todos os endpoints da API diretamente. Para testar as rotas protegidas, use o botão "Authorize" e insira o token JWT obtido no login (formato: `Bearer SEU_TOKEN_AQUI`).

## Endpoints

### Autenticação
| Método | Rota                  | Descrição                                      |
|--------|-----------------------|--------------------------------------------------|
| `POST`   | `/api/auth/register`  | Registra um novo usuário. O `username` deve ser um e-mail válido e ter no mínimo 6 caracteres. |
| `POST`   | `/api/auth/login`     | Realiza o login e retorna um token JWT. O `username` deve ser um e-mail válido e ter no mínimo 6 caracteres.          |

### Produtos
| Método | Rota                  | Descrição                                      |
|--------|-----------------------|--------------------------------------------------|
| `GET`    | `/api/produtos`       | Lista todos os produtos.                         |
| `GET`    | `/api/produtos/{id}`  | Obtém um produto específico pelo seu ID.         |
| `POST`   | `/api/produtos`       | Cria um novo produto (requer autenticação).      |
| `PUT`    | `/api/produtos/{id}`  | Atualiza um produto existente (substituição total, requer autenticação). |
| `PATCH`  | `/api/produtos/{id}`  | Atualiza parcialmente um produto existente (requer autenticação).      |
| `DELETE` | `/api/produtos/{id}`  | Deleta um produto (requer autenticação).         |

---

Este projeto está sob a licença ISC.
