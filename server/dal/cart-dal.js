const { Cart, Item } = require('../db/models');

const getCartByUserId = async (userId) => {
    let [cart] = await Cart.find({ userId, isComplete: false })
    
    if (!cart) {
        await createCart(userId);
        [cart] = await Cart.find({ userId, isComplete: false })
    }
    
    const cartItems = await Item.find({ cartId: cart._id });
    return { cartItems, cart };
}

const createCart = async (userId) => {
    const newCart = await Cart({ userId });
    await newCart.save()

    return newCart._id;
}

const closeCart = async (cartId, totalPrice, orderDetails) => {
    await Cart.findByIdAndUpdate({ _id: cartId }, { $set: { isComplete: true, totalPrice, orderDetails } });
    return;
}

const verifyCartOwner = async (userId, cartId) => {
    const [cart] = await Cart.find({ userId, _id: cartId, isComplete: false })
    return cart ? true : false
}

const getPreviousCart = async (userId) => {
    const [latestCart] = await Cart.find({ isComplete: true, userId }, {}).sort({ creationDate: "desc" });
    return latestCart;
}

const validateDateAvailability = async (date) => {
    const isAvailableDate = await Cart.find({ "orderDetails.shippingDate": date }).count();
    return isAvailableDate;
}

const getStoreStatsOrders = async () => {
    const currentAmountOfOrders = await Cart.find({isComplete: true}).count();
    return currentAmountOfOrders;
}


module.exports = {
    getCartByUserId,
    createCart,
    closeCart,
    verifyCartOwner,
    getPreviousCart,
    validateDateAvailability,
    getStoreStatsOrders
}