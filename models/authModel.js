const mongoose = require ('mongoose');

const userAuthSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Name is required'],
    },
    email: {
        type : String,
        required : [true, 'Email is required'],
    },
    password : {
        type : String,
        required: [true, 'Password is requried'],
    },
    role : {
        type : String,
        default: 'user'
    }
},{timestamps: true})

const userAuthModel = mongoose.model('UserAuth', userAuthSchema);
module.exports = userAuthModel;