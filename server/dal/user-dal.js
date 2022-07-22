const { User } = require('../db/models');

const getAllUsers = async () => {
    const successfulGetAllUsers = await User.find();
    return successfulGetAllUsers;
}

const addNewUser = async (payload) => {
    const user = await User(payload);
    await user.save();
}

const login = async (payload) => {
    const { userId, encrpytedPassword } = payload

    const succesfulLogin = await User.findOne({ userId, encrpytedPassword }, { encrpytedPassword: 0, _id: 0, __v: 0 });
    return succesfulLogin;
}

const loginWithToken = async (userId) => {
    const succesfulLogin = await User.findOne({ userId }, { encrpytedPassword: 0, _id: 0, __v: 0 });
    return succesfulLogin;
}

const isIdUnique = async (id) => {
    const isUnique = await User.findOne({ userId: id });
    return isUnique;
}

module.exports = {
    getAllUsers,
    addNewUser,
    login,
    loginWithToken,
    isIdUnique
}