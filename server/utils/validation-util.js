const isIsraeliIdValid = require('israeli-id-validator');
const cartDal = require('../dal/cart-dal');

const validateUserId = (userId) => {
    if (!isIsraeliIdValid(userId)) {
        return ' invalid id';
    }
    return null;
}

const validatePassword = (password) => {
    if (!password) return ' password must be at least 6 characters long';
    if (password.length < 6) {

        return ' password must be at least 6 characters long';
    }
    return null;
}

const validateEmail = (email) => {
    if (!email) return ' Invalid email adress';

    if (!email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
        return ' Invalid email adress';
    }
    return null;
}

const validateString = (string, length = 2) => {

    const temp = string.toString()
    if (!temp) return ' Must be at least 2 characters';
    if (temp.length < length) {
        return ' Must be at least 2 characters';
    }
    if (temp.match(/[^a-z0-9_ ]/gi)) {
        return 'Only letters allowed';
    }
    return null;
}

const validateDate = async (date) => {
    const isDateAvailable = await cartDal.validateDateAvailability(date);

    return isDateAvailable <= 2 ? null : 'spcified date is not available'
}

const validateProduct = (productData) => {
    const { productName, productPrice, categoryId } = productData;
    const errorObject = {}
    errorObject.productName = validateString(productName);
    errorObject.productPrice = productPrice > 0 ? null : 'Please enter a valid Price';
    errorObject.categoryId = categoryId.length ? null : 'Please choose a category';

    return errorObject;

}

const validateOrderDetails = async (orderDetails) => {
    const errorObject = {}

    const { city, street, houseNumber, shippingDate, contactInfo, last4Digits } = orderDetails;

    errorObject.city = validateString(city);
    errorObject.street = validateString(street);
    errorObject.houseNumber = validateString(houseNumber.toString());
    errorObject.contactInfo = validateString(contactInfo);
    errorObject.last4Digits = validateString(last4Digits.toString());
    errorObject.shippingDate = await validateDate(shippingDate)

    return errorObject;
}

module.exports = {
    validateUserId,
    validatePassword,
    validateEmail,
    validateString,
    validateProduct,
    validateOrderDetails
}






