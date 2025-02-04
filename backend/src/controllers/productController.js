const prisma = require("../../prismaClient");

async function addProduct(req, res) {
  const { name, category, description, price, discount } = req.body;
  const sellerId = req.user.userId;

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
}

async function editProduct(req, res) {
  const { name, category, description, price, discount } = req.body;
  const { id } = req.params;

  const product = await prisma.product.update({
    where: { id },
    data: { name, category, description, price, discount },
  });

  res.status(200).json({ message: "Product updated", product });
}

async function deleteProduct(req, res) {
  const { id } = req.params;

  await prisma.product.delete({
    where: { id },
  });

  res.status(200).json({ message: "Product deleted" });
}

module.exports = { addProduct, editProduct, deleteProduct };
