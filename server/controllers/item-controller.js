const itemLogic = require('../logic/item-logic');

const updateItem = async (req, res) => {
    try {
        const cart = await itemLogic.updateItem(req.headers.authorization, req.body);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error, msg: error.message });
    }
}

const getItemsByCartId = async (req, res) => {
    try {
        const cart = await itemLogic.getItemsByCartId(req.headers.authorization, req.params.cartId);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error, msg: error.message });
    }
}

const deleteCartItems = async (req, res) => {
    try {
        await itemLogic.deleteCartItems(req.headers.authorization, req.params.cartId);
        res.json({ error: false, msg: 'successful deleted cart items' });
    } catch (error) {
        res.status(500).json({ error, msg: error.message });
    }
}

module.exports = {
    getItemsByCartId,
    updateItem,
    deleteCartItems
}