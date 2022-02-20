module.exports = async(req,res) => {
    const { name, email, password } = req.body;
    let error = {};
    if (!name || name.trim().length === 0) {
        error.name = 'Name field must be required'
    }
    if (Object.keys(error).length) {
        return res.status(422).json({ error })
    }
    res.json("hola")
}