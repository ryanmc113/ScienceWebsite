const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add name']
    },
    email: {
        type: String,
        required: [true, 'Please add your email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add name'],
        unique: true
    },
    //this will be added once there is a fron end. role teacher, student or admin
    // role: {
    //     type: String,
    //     required: [true, 'Please add name']
    // },
},
{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema)