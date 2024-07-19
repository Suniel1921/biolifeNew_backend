const mongoose = require ('mongoose');

const brandSchema = new mongoose.Schema({
    brandName : {
        type : String,
        required : [true, 'brand name is required']
    }
},{timestamps: true})

const brandModel = mongoose.model('Brand', brandSchema);
module.exports = brandModel;