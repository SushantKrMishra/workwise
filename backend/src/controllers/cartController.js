const prisma = require("../../prismaClient");

async function addToCart(req, res) {
  const { productId, quantity } = req.body;
  const buyerId = req.user.userId;

  const cartItem = await prisma.cart.create({
    data: {
      quantity: quantity,
      user: {
        connect: { id: buyerId },
      },
      product: {
        connect: { id: productId },
      },
    },
  });

  res.status(201).json({ message: "Product added to cart", cartItem });
}

async function removeFromCart(req, res) {
  const { id } = req.params;

  try {
    const cartItem = await prisma.cart.findUnique({
      where: { id },
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    await prisma.cart.delete({
      where: { id },
    });

    res.status(200).json({ message: "Product removed from cart" });
  } catch (error) {
    res.status(500).json({ message: "Error removing item from cart", error });
  }
}

async function getCartItems(req, res) {
  const { id } = req.params;

  try {
    const cartItems = await prisma.cart.findMany({
      where: { id },
      include: { product: true },
    });

    res.status(200).json({ cartItems });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart items", error });
  }
}

module.exports = { addToCart, removeFromCart, getCartItems };
