const productLogic = require('../logic/product-logic');

const getAllProducts = async (req, res) => {
    try {
        const successfulGetAllProducts = await productLogic.getAllProducts()
        res.json(successfulGetAllProducts);
    } catch (error) {
        res.status(401).json({ error, msg: error.message });
    }
}

const handleAdminAction = async (req, res) => {
    const payload = req.body;
    payload.token = req.headers.authorization;

    try {
        const products = await productLogic.handleAdminAction(payload);
        res.status(201).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
}

// const updateProduct = async (req, res) => {
//     const payload = req.body;
//     payload.token = req.headers.authorization;

//     try {
//         await productLogic.updateProduct(payload);
//         res.json({ error: false, msg: "successful update product" });
//     } catch (error) {
//         res.status(500).json({ error, msg: error.message });
//     }
// }

const getProductsByCategory = async (req, res) => {
    try {
        const sortedProductsByCategory = await productLogic.getProductsByCategory(req.params.categoryId);
        res.json(sortedProductsByCategory);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error, msg: error.message });
    }
}

const getStoreStats = async (req, res) => {
    try {
        const storeStats = await productLogic.getStoreStats();
        res.json(storeStats);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error, msg: error.message });
    }
}


module.exports = {
    getAllProducts,
    handleAdminAction,
    getProductsByCategory,
    getStoreStats
}
