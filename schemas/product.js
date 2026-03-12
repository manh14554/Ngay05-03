let mongoose = require('mongoose');

let productSchema = mongoose.Schema({
    title: {
        type: String,
        unique: [true, "title khong duoc trong"],
        required: true
    },
    slug: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: Array
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})
module.exports = new mongoose.model('product', productSchema)