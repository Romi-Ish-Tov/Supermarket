const productLogic = require("../logic/product-logic");
const itemLogic = require('../logic/item-logic')

const calculateTotalPrice = async (token, cartId) => {
    const products = await productLogic.getAllProducts();
    const cartItems = await itemLogic.getItemsByCartId(token, cartId);

    let total = 0;
   
    cartItems.filter((item) => {
        products.products.forEach(element => {
            if(element._id.toString() == item.productId.toString()) {
                total += element.productPrice * item.quantity;
            }      
        });
    })
    return total;
}

module.exports = { calculateTotalPrice }
