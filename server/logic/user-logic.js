const userDal = require('../dal/user-dal');
const jwtUtils = require('../utils/jwt-util');
const { validateUserId, validatePassword, validateEmail, validateString } = require("../utils/validation-util");

const getAllUsers = async () => {
    const successfulGetAllUsers = await userDal.getAllUsers();
    return successfulGetAllUsers;
}

const addNewUser = async (payload) => {
    const errorObject = validatePayload(payload)
    const isError = Object.values(errorObject).some((error) => error != null)
    if (isError) throw errorObject;

    payload.encrpytedPassword = jwtUtils.encryptPassword(payload.password);
    await userDal.addNewUser(payload)
}

const login = async (payload) => {
    payload.encrpytedPassword = jwtUtils.encryptPassword(payload.password);
    const succesfulLoginData = await userDal.login(payload);
    if (!succesfulLoginData) throw new Error('login failed');
    succesfulLoginData.token = jwtUtils.generateToken(succesfulLoginData);
    return succesfulLoginData;
}

const loginWithToken = async (payload) => {
    const token = jwtUtils.decodeToken(payload.token);

    const succesfulLoginData = await userDal.loginWithToken(token.userId);
    succesfulLoginData.token = jwtUtils.generateToken(succesfulLoginData);

    return succesfulLoginData;
}

const isIdUnique = async (id) => {
    const isUnique = await userDal.isIdUnique(id);
    return isUnique ? false : true;
}

module.exports = {
    getAllUsers,
    addNewUser,
    login,
    loginWithToken,
    isIdUnique
}

const validatePayload = (payload) => {
    let errorObject = {};
   
    errorObject.userIdError = validateUserId(payload.userId)
    errorObject.firstNameError = validateString(payload.firstName);
    errorObject.lastNameError = validateString(payload.lastName);
    errorObject.emailError = validateEmail(payload.email);
    errorObject.passwordError = validatePassword(payload.password);
    errorObject.cityError = validateString(payload.city);
    errorObject.streetError = validateString(payload.street);
    errorObject.houseNumberError = validateString(payload.houseNumber, 1);

    return errorObject;
}