
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Simulação de um banco de dados de usuários em memória
const users = [];

// @desc    Registrar um novo usuário
// @route   POST /api/auth/register
exports.register = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            const error = new Error('Usuário e senha são obrigatórios.');
            error.statusCode = 400;
            return next(error);
        }

        const userExists = users.find(u => u.username === username);
        if (userExists) {
            const error = new Error('Usuário já existe.');
            error.statusCode = 409; // Conflict
            return next(error);
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = { id: users.length + 1, username, password: hashedPassword };
        users.push(newUser);

        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (err) {
        next(err);
    }
};

// @desc    Autenticar um usuário e obter um token
// @route   POST /api/auth/login
exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = users.find(u => u.username === username);
        if (!user) {
            const error = new Error('Credenciais inválidas.');
            error.statusCode = 401; // Unauthorized
            return next(error);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const error = new Error('Credenciais inválidas.');
            error.statusCode = 401;
            return next(error);
        }

        const token = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token });
    } catch (err) {
        next(err);
    }
};
