const { Schema, model} = require('mongoose');

const userSchema = new Schema({
    userId: {
        type: String,
        unique: true,
        maxLength: 9,
        minLength: 9
    },
    firstName: String,
    lastName: String,
    email: String,
    encrpytedPassword: String,
    city: String,
    street: String,
    houseNumber: String,
    role: {
        type:String,
        default:'customer'
    },
    token: {
        type: String,
        required: false
    }
})
 
const productSchema = new Schema({
    productName: String,
    productPrice: Number,
    categoryId: {
        type:Schema.Types.ObjectId,
        ref: "category"
    }
})

const categorySchema = new Schema({
    categoryName: String
})

const cartSchema = new Schema({
    userId: {
        type: String,
        ref: "user"
    },
    creationDate: {
        type: Date,
        default: Date
    },
    isComplete: {
        type: Boolean,
        default: false
    }, 
    totalPrice: {
        type: Number,
        required: false
    },
    orderDetails: {
        type: Object,
        required: false,
    }
    
})

const ItemSchema = new Schema({
    cartId: {
        type: Schema.Types.ObjectId,
        ref: "cart"
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "product"
    },
    quantity: Number
})

const User = model('user', userSchema);
const Product = model('product', productSchema)
const Category = model('category', categorySchema); 
const Cart = model('cart', cartSchema); 
const Item = model('item', ItemSchema); 

module.exports = {
    User,
    Product,
    Category,
    Cart,
    Item
}