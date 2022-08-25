const express = require("express");
const router = express.Router()
const {addPrice} = require("../controllers/productController")

//API
router.post("/products",addPrice)


module.exports = router