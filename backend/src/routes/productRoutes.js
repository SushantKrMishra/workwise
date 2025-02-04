const express = require("express");
const {
  addProduct,
  editProduct,
  deleteProduct,
} = require("../controllers/productController");
const authenticate = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/add", authenticate, addProduct);
router.put("/edit/:id", authenticate, editProduct);
router.delete("/delete/:id", authenticate, deleteProduct);

module.exports = router;
