const itemDal = require('../dal/item-dal');
const cartDal = require('../dal/cart-dal');
const { decodeToken } = require('../utils/jwt-util');

const updateItem = async (token, payload) => {
    const decoded = decodeToken(token);
    
    const isCartOwner = await cartDal.verifyCartOwner(decoded.userId, payload.cartId);
    if (!isCartOwner) throw new Error('Unauthorized action');

    const isItemInCart = await itemDal.findItemInCart(payload);
    (isItemInCart) ? await itemDal.updateItem(payload) : await itemDal.addItem(payload);

    const cart = await getItemsByCartId(token, payload.cartId)
    return cart;
}

const getItemsByCartId = async (token, cartId) => {
    const decoded = decodeToken(token);

    const isCartOwner = await cartDal.verifyCartOwner(decoded.userId, cartId);
    if (!isCartOwner) throw new Error('Unauthorized action');

    let cart = await itemDal.getItemsByCartId(cartId);
    return cart;
}

const deleteCartItems = async (token, cartId) => {
    const decoded = decodeToken(token);

    const isCartOwner = await cartDal.verifyCartOwner(decoded.userId, cartId);
    if (!isCartOwner) throw new Error('Unauthorized action');

    await itemDal.deleteCartItems(cartId);
}
module.exports = {
    getItemsByCartId,
    updateItem,
    deleteCartItems
}