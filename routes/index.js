const express = require('express');
const router = express.Router();

const contactRouter = require("../controllers/contact");
const insightRouter = require("../controllers/insights");
const productRouter = require("../controllers/product");

router.use('/contact', contactRouter);
router.use('/insight', insightRouter);
router.use('/product', productRouter);

module.exports = router;
