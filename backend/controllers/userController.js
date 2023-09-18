const aysncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcyrpt = require('bcryptjs')
const User = require('../models/userModel')


//@desc Register a user
//@route POST api/users
//@access public
const registerUser  = aysncHandler(async(req, res)=> {
    const {name, email, password } = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //check if user exists
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists');
    }

    //hash password
    const salt = await bcyrpt.genSalt(10)
    const hashedPassword = await bcyrpt.hash(password, salt)

    //Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
    // res.json({message: 'registered a User'})
}) ;

//@desc Login a user
//@route POST api/users/login
//@access public
const loginUser  = aysncHandler(async(req, res)=> {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(user && bcyrpt.compare(password, user.password)){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
}) ;

//@desc Get user data
//@route GET api/users/me
//@access private
const getUser  = aysncHandler(async(req, res)=> {
    const {_id, name, email} = await User.findById(req.user.id)
    res.status(200).json({
        id: _id,
        name,
        email
    })
});

//Generate JWT Token
const generateToken = (id) =>{
    return jwt.sign({ id }, process.env.JWT_SECRET, 
        {expiresIn: '30d'})
}

module.exports = {
    registerUser,
    loginUser,
    getUser
}
