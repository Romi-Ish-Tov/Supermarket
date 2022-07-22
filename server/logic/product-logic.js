const productDal = require('../dal/product-dal');
const categoryDal = require('../dal/category-dal');
const cartDal = require('../dal/cart-dal');

const jwtUtils = require('../utils/jwt-util');
const { validateProduct } = require('../utils/validation-util');

const getAllProducts = async () => {
    
    const successfulGetAllData = {};
    successfulGetAllData.products = await productDal.getAllProducts();
    successfulGetAllData.categories = await categoryDal.getAllCategories();
    return successfulGetAllData;
}

const handleAdminAction = async (payload) => {
    if (!jwtUtils.verifyPermission(payload.token)) {
        throw new Error('Unauthorized action')
    }

    let isError = Object.values(validateProduct(payload)).some(error => (error != null))

    if (isError) {
        throw validateProduct(payload);
    }

    payload.productId ?
        await productDal.updateProduct(payload) :
        await productDal.addProduct(payload);

    const products = await productDal.getAllProducts();
    return products;
}

const getProductsByCategory = async (categoryId) => {
    const sortedProductsByCategory = await productDal.getProductsByCategory(categoryId);
    return sortedProductsByCategory
}

const getStoreStats = async () => {

    const storeStats = {};
    
    storeStats.currentAmountOfProducts = await productDal.getStoreStatsProducts();
    storeStats.currentAmountOfOrders = await cartDal.getStoreStatsOrders();
    return storeStats;
}

module.exports = {
    getAllProducts,
    handleAdminAction,
    getProductsByCategory,
    getStoreStats
}
