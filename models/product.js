const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    product_image: {
        type: String,
        required: true
    },
    main_ingredient: {
        type: [String],
        required: true
    },
    shapes: {
        type: [String],
        required: true
    },
    expansion_process: {
        type: [String],
        required: true
    },
    cooking_after_image: {
        type: String,
        required: true
    },
    cooking_before_image: {
        type: String,
        required: true
    },
    technical_infos: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    product_title: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);