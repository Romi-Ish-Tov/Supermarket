const { Item } = require('../db/models');

const addItem = async (payload) => {
    const newItem = await Item(payload);
    await newItem.save();
}

const getItemsByCartId = async (cartId) => {
    const cart = await Item.find({ cartId }, {__v: false});
    return cart;
}

const updateItem = async (payload) => {
    const { quantity, productId, cartId } = payload;
    
    if (quantity) {
        await Item.findOneAndUpdate({ productId, cartId }, { quantity });
        return
    }
    
    await Item.findOneAndRemove({ productId, cartId });
}

const findItemInCart = async (payload) => {
    const { productId, cartId } = payload;

    const [isItemExist] = await Item.find({productId, cartId});
    return !!isItemExist;
}

const deleteCartItems = async (cartId) => {
    await Item.deleteMany({cartId});
}

module.exports = {
    addItem,
    getItemsByCartId,
    updateItem,
    findItemInCart,
    deleteCartItems
}