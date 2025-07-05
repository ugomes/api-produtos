
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        const error = new Error('Não autorizado, token não fornecido ou malformatado.');
        error.statusCode = 401;
        return next(error);
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Adiciona os dados do usuário (payload) à requisição
        next();
    } catch (err) {
        const error = new Error('Não autorizado, token inválido.');
        error.statusCode = 401;
        next(error);
    }
};

module.exports = { protect };
