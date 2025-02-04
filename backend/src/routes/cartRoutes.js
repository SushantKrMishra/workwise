const express = require("express");
const {
  addToCart,
  removeFromCart,
  getCartItems,
} = require("../controllers/cartController");
const authenticate = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/items", authenticate, getCartItems);
router.post("/add", authenticate, addToCart);
router.delete("/remove/:id", authenticate, removeFromCart);

module.exports = router;
