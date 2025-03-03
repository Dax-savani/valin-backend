const express = require('express');
const multer = require('multer');
const Product = require('../models/product');
const {uploadFile} = require("../services/uploadFile");

const router = express.Router();
const upload = multer();

const processImage = async (files, fieldName, existingValue) => {
    return files[fieldName] ? await uploadFile(files[fieldName][0].buffer) : existingValue;
};

router.post('/', upload.fields([
    {name: 'product_image'},
    {name: 'cooking_after_image'},
    {name: 'cooking_before_image'}
]), async (req, res) => {
    try {
        const {product_name, main_ingredient, shapes, expansion_process, technical_infos, product_title} = req.body;

        const productImage = await processImage(req.files, 'product_image', null);
        const cookingAfterImage = await processImage(req.files, 'cooking_after_image', null);
        const cookingBeforeImage = await processImage(req.files, 'cooking_before_image', null);

        if (!productImage) {
            return res.status(400).json({message: 'Product image is required'});
        }

        const newProduct = await Product.create({
            product_name,
            product_image: productImage,
            main_ingredient: JSON.parse(main_ingredient),
            shapes: JSON.parse(shapes),
            expansion_process: JSON.parse(expansion_process),
            cooking_after_image: cookingAfterImage,
            cooking_before_image: cookingBeforeImage,
            technical_infos: JSON.parse(technical_infos),
            product_title
        });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error.message);
        res.status(500).json({message: 'Failed to create product', error: error.message});
    }
});

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: 'Failed to retrieve products', error: error.message});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: 'Failed to retrieve product', error: error.message});
    }
});

router.put('/:id', upload.fields([
    {name: 'product_image'},
    {name: 'cooking_after_image'},
    {name: 'cooking_before_image'}
]), async (req, res) => {
    try {
        const {product_name, main_ingredient, shapes, expansion_process, technical_infos, product_title} = req.body;
        let updateData = {
            product_name,
            main_ingredient: JSON.parse(main_ingredient),
            shapes: JSON.parse(shapes),
            expansion_process: JSON.parse(expansion_process),
            technical_infos: JSON.parse(technical_infos),
            product_title
        };

        updateData.product_image = await processImage(req.files, 'product_image', req.body.product_image);
        updateData.cooking_after_image = await processImage(req.files, 'cooking_after_image', req.body.cooking_after_image);
        updateData.cooking_before_image = await processImage(req.files, 'cooking_before_image', req.body.cooking_before_image);

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, {new: true});
        if (!updatedProduct) {
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: 'Failed to update product', error: error.message});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json({message: 'Product deleted successfully'});
    } catch (error) {
        res.status(500).json({message: 'Failed to delete product', error: error.message});
    }
});

module.exports = router;
