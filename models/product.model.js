const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true, unique: true, trim: true },
    price: { type: Number, required: true },
    atStore: { type: Number, required: true },
    description: { type: String, required: true },
    imgPath: { type: String, required: true },
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;