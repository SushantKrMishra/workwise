const express = require("express");
const {
  addProduct,
  editProduct,
  deleteProduct,
  searchProducts,
  fetchProducts,
} = require("../controllers/productController");
const authenticate = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/add", authenticate, addProduct);
router.put("/edit/:id", authenticate, editProduct);
router.delete("/delete/:id", authenticate, deleteProduct);
router.get("/search", searchProducts);
router.get("/fetchProducts", fetchProducts);

module.exports = router;
