const fs = require('fs/promises')


const getRecieptByCartId = async (req, res) => {
    const filePath = __dirname.toString().replace("controllers", "reciepts");

    try {
        const data = await fs.readFile(`${filePath}/${req.params.id}.txt`, 'utf8');
        res.json(data)
        
    } catch (error) {
        res.status(404).json({ error, message: "failed to find receipt" });
    }
}

module.exports = {
    getRecieptByCartId
}
