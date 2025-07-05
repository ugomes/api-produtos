
require('dotenv').config(); // Carrega as variáveis de ambiente do .env
const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares de Segurança
app.use(helmet()); // Adiciona cabeçalhos de segurança

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limita cada IP a 100 requisições por janela
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Muitas requisições feitas a partir deste IP, por favor, tente novamente após 15 minutos'
});
app.use('/api/', limiter); // Aplica o rate limit a todas as rotas /api

// Middleware para parsear JSON
app.use(express.json());

// Configuração do Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Produtos',
            version: '1.0.0',
            description: 'Documentação da API de Produtos com Swagger'
        },
        servers: [
            {
                url: `http://localhost:${port}`
            }
        ],
        components: {
            schemas: {
                Produto: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer'
                        },
                        name: {
                            type: 'string'
                        },
                        price: {
                            type: 'number'
                        }
                    }
                },
                ProdutoInput: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string'
                        },
                        price: {
                            type: 'number'
                        }
                    }
                }
            },
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas da API
app.use('/api/produtos', productRoutes);
app.use('/api/auth', authRoutes); // Novas rotas de autenticação

// Rota principal
app.get('/', (req, res) => {
    res.send('<h1>API de Produtos</h1><p>Acesse <a href="/api-docs">/api-docs</a> para ver a documentação do Swagger.</p>');
});

// Middleware de Erro (deve ser o último)
app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    console.log(`Documentação do Swagger disponível em http://localhost:${port}/api-docs`);
});
