const prisma = require("../../prismaClient");
async function addProduct(req, res) {
  const { name, category, description, price, discount } = req.body;
  const sellerId = req.user.userId;
  console.log(sellerId);
  try {
    const product = await prisma.product.create({
      data: {
        name,
        category,
        description,
        price,
        discount,
        sellerId,
      },
    });

    res.status(201).json({ message: "Product added", product });
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
}

async function editProduct(req, res) {
  const { name, category, description, price, discount } = req.body;
  const { id } = req.params;
  const sellerId = req.user.userId;

  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(204).json({ message: "Product not found" });
    }

    if (product.sellerId !== sellerId) {
      return res
        .status(403)
        .json({ message: "You can only edit your own products" });
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { name, category, description, price, discount },
    });

    res
      .status(200)
      .json({ message: "Product updated", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
}

async function deleteProduct(req, res) {
  const { id } = req.params;
  const sellerId = req.user.userId;

  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(204).json({ message: "Product not found" });
    }

    if (product.sellerId !== sellerId) {
      return res
        .status(403)
        .json({ message: "You can only delete your own products" });
    }

    await prisma.product.delete({
      where: { id },
    });

    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
}

async function searchProducts(req, res) {
  try {
    const { search, category } = req.query;

    const products = await prisma.product.findMany({
      where: {
        AND: [
          search ? { name: { contains: search, mode: "insensitive" } } : {},
          category
            ? { category: { equals: category, mode: "insensitive" } }
            : {},
        ],
      },
      select: {
        id: true,
        name: true,
        category: true,
        description: true,
        price: true,
        discount: true,
      },
    });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.json(products);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function fetchProducts(req, res) {
  try {
    const products = await prisma.product.findMany({
      take: 10,
      select: {
        id: true,
        name: true,
        category: true,
        description: true,
        price: true,
        discount: true,
        sellerId: true,
      },
    });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  addProduct,
  editProduct,
  deleteProduct,
  searchProducts,
  fetchProducts,
};
