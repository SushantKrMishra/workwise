const express = require("express");
const { addToCart, removeFromCart } = require("../controllers/cartController");
const authenticate = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/add", authenticate, addToCart);
router.delete("/remove/:id", authenticate, removeFromCart);

module.exports = router;
