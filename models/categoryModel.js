const mongoose = require ('mongoose');

const categorySchema = new mongoose.Schema({
    categoryName : {
        type : String,
        required : [true, 'category name is required']
    }
},{timestamps: true})

const categoryModel = mongoose.model('Category', categorySchema);
module.exports = categoryModel;