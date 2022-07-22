const userLogic = require('../logic/user-logic');

const getAllUsers = async (req, res) => {
    try {
        const successfulGetAllUsers = await userLogic.getAllUsers()        
        res.json(successfulGetAllUsers);
    } catch (error) {
        res.status(500).json({ error, msg: "something went wrong" });   
    }
}

const addNewUser = async (req, res) => {
    try {
        await userLogic.addNewUser(req.body)
        res.send({msg: 'User saved'})                
    } catch (error) {
        res.status(500).json(error);
    }
}

const login = async (req, res) => {
    try {
        const user = await userLogic.login(req.body);
        res.send(user)
    } catch (error) {
        res.status(500).json( error.message );
    }
}

const loginWithToken = async (req, res) => {
    try {
        const user = await userLogic.loginWithToken(req.body);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error, msg: "Login falied" })
    }
}

const isIdUnique = async (req, res) => {
    try {
        const isUnique = await userLogic.isIdUnique(req.params.id);
        res.json(isUnique);
    } catch (error) {
        res.status(500).json({ error, msg: "id is already in use" })
    }
}

module.exports = {
    getAllUsers,
    addNewUser,
    login,
    loginWithToken,
    isIdUnique
}
