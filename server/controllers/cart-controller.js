const cartLogic = require('../logic/cart-logic');

const getCartByUserId = async (req, res) => {
    try {
        const cart = await cartLogic.getCartByUserId(req.headers.authorization);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error, msg: error.message });
    }
}

const closeCart = async (req, res) => {
    try {
        const newCartData = await cartLogic.closeCart(req.headers.authorization, req.body.cartId, req.body.orderDetails);
        res.json({ newCartData });
    } catch (error) {
        res.status(500).json({ error, msg: error.message });
    }
}

module.exports = {
    getCartByUserId,
    closeCart
}