const prisma = require("../../prismaClient");

async function addToCart(req, res) {
  const { productId, quantity } = req.body;
  const buyerId = req.user.userId;

  const cartItem = await prisma.cart.create({
    data: {
      productId,
      buyerId,
      quantity,
    },
  });

  res.status(201).json({ message: "Product added to cart", cartItem });
}

async function removeFromCart(req, res) {
  const { id } = req.params;

  await prisma.cart.delete({
    where: { id },
  });

  res.status(200).json({ message: "Product removed from cart" });
}

module.exports = { addToCart, removeFromCart };
