const { Product } = require('../db/models');

const getAllProducts = async () => {
    const successfulGetAllProducts = await Product.find({}, { __v: false });
    return successfulGetAllProducts;
}

const addProduct = async (payload) => {
    const product = await Product(payload);
    await product.save();
}

const updateProduct = async (payload) => {
    let { productName, productPrice, categoryId } = payload
    const product = await Product.findByIdAndUpdate(payload.productId, { $set: { productName, productPrice, categoryId } });
    await product.save();
}

const getProductsByCategory = async (categoryId) => {
    const sortedProductsByCategory = await Product.find({ categoryId }, { __v: false });
    return sortedProductsByCategory;
}

const getStoreStatsProducts = async () => {
    const currentAmountOfProducts = await Product.find().count();
    return currentAmountOfProducts;
}

module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    getProductsByCategory,
    getStoreStatsProducts,
}