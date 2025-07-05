
// Simulação de um banco de dados em memória
let products = [
    { id: 1, name: 'Laptop', price: 4500.00 },
    { id: 2, name: 'Mouse', price: 150.50 }
];
let nextId = 3;

// @desc    Obter todos os produtos
// @route   GET /api/produtos
exports.getProducts = (req, res) => {
    res.status(200).json(products);
};

// @desc    Obter um único produto
// @route   GET /api/produtos/:id
exports.getProductById = (req, res, next) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        const error = new Error('Produto não encontrado');
        error.statusCode = 404;
        return next(error);
    }
    res.status(200).json(product);
};

// @desc    Criar um novo produto
// @route   POST /api/produtos
exports.createProduct = (req, res, next) => {
    const { name, price } = req.body;
    const newProduct = { id: nextId++, name, price: parseFloat(price) };
    products.push(newProduct);
    res.status(201).json(newProduct);
};

// @desc    Atualizar um produto (completo)
// @route   PUT /api/produtos/:id
exports.updateProduct = (req, res, next) => {
    const { name, price } = req.body;
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));

    if (productIndex === -1) {
        const error = new Error('Produto não encontrado');
        error.statusCode = 404;
        return next(error);
    }

    const updatedProduct = { id: parseInt(req.params.id), name, price: parseFloat(price) };
    products[productIndex] = updatedProduct;
    res.status(200).json(updatedProduct);
};

// @desc    Atualizar um produto (parcial)
// @route   PATCH /api/produtos/:id
exports.patchProduct = (req, res, next) => {
    const { name, price } = req.body;
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));

    if (productIndex === -1) {
        const error = new Error('Produto não encontrado');
        error.statusCode = 404;
        return next(error);
    }

    const product = products[productIndex];
    if (name) product.name = name;
    if (price) product.price = parseFloat(price);

    res.status(200).json(product);
};

// @desc    Deletar um produto
// @route   DELETE /api/produtos/:id
exports.deleteProduct = (req, res, next) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1) {
        const error = new Error('Produto não encontrado');
        error.statusCode = 404;
        return next(error);
    }
    products.splice(productIndex, 1);
    res.status(204).send();
};
