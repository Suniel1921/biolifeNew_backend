const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    description:{
        type: String,
        required: true,
    },
    realPrice: {
        type: Number, 
        required: [true, 'realPrice is required'],
    },
    salePrice: {
        type: Number,
        required: [true, 'salePrice is required'],
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true,

    },
    sku: {
        type: String,
        // required: true,
        unique: true
    },
    discount: {
        type: Number,
        // required: true
    },
    slug: { 
        type: String,
        unique: true
    },
    images: [{
        type: String
    }]
}, { timestamps: true });

productSchema.pre('save', function(next) {
    if (this.realPrice && this.salePrice) {
        this.discount = ((this.realPrice - this.salePrice) / this.realPrice) * 100;
    }
    next();
});


productSchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});


const productModel = mongoose.model('Product', productSchema);
module.exports = productModel;
