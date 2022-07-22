const fs = require('fs/promises')
const cartDal = require('../dal/cart-dal');
const itemDal = require('../dal/item-dal');
const productDal = require('../dal/product-dal');
const jwtUtils = require('../utils/jwt-util');

const { calculateTotalPrice } = require('../utils/total-util');
const { validateOrderDetails } = require('../utils/validation-util');

const getCartByUserId = async (token) => {
    const decoded = jwtUtils.decodeToken(token);

    const currentCart = await cartDal.getCartByUserId(decoded.userId);
    const latestCart = await cartDal.getPreviousCart(decoded.userId);

    const cart = { currentCart, latestCart };
    return cart;
}

const createCart = async (token) => {
    const decoded = jwtUtils.decodeToken(token)
    const cartId = await cartDal.createCart(decoded.userId);
    return cartId;
}

const closeCart = async (token, cartId, orderDetails) => {
    const errorObject = await validateOrderDetails(orderDetails);
    let isError = Object.values(errorObject).some(error => error != null)
    
    if (isError) {
        throw errorObject;
    }
    
    const totalPrice = await calculateTotalPrice(token, cartId);
    const decoded = jwtUtils.decodeToken(token)
    const itemsInCart = await itemDal.getItemsByCartId(cartId);
    const products = await productDal.getAllProducts();
    const itemsWithDetails = attachItemsToProducts(itemsInCart, products)

    await cartDal.closeCart(cartId, totalPrice, orderDetails);
    await generateReciept(cartId, itemsWithDetails, totalPrice);

    const newCart = await cartDal.getCartByUserId(decoded.userId)
    return newCart;
}

const generateReciept = async (cartId, itemsWithDetails, totalPrice) => {

    let headers = 'Reciept No. ' + cartId;
    let columns = `

        Product || Price per unit || quantity || total
        ______________________________________________
    `

    let recipetBody = ''
    for (const item of itemsWithDetails) {
        recipetBody += `
        ${item.details.productName} || ${item.details.productPrice}₪ || ${item.item.quantity} || ${item.details.productPrice * item.item.quantity}₪
        _______________________________
        `
    }

    let footer = "Total Price:" + totalPrice + '₪';

    let recipetContent = headers + columns + recipetBody + footer;

    try {
        await fs.writeFile(`reciepts/${cartId}.txt`, recipetContent)
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getCartByUserId,
    createCart,
    closeCart,
    generateReciept
}

const attachItemsToProducts = (itemsInCart, products) => {

    const newArray = itemsInCart.map(item => {
        let itemsWithDetails = {}
        itemsWithDetails.item = item;

        itemsWithDetails.details = products.find(product => {
            if (item.productId.toString() == product._id.toString()) {
                return product;
            }
        })

        return itemsWithDetails;
    })

    return newArray;
}