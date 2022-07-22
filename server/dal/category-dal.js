const { Category } = require('../db/models');

const getAllCategories = async () => {
    const successfulGetAllCategories = await Category.find();
    return successfulGetAllCategories;
}

module.exports = {
    getAllCategories
}
