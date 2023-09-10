const aysncHandler = require('express-async-handler')

const registerUser  = (req, res) => {
    res.json({message: 'registered a User'})
};

module.exports = {
    registerUser
}