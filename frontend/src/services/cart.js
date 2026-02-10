export const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

export const addToCart = (product) => {
  const cart = getCart();

  const existing = cart.find(
    (item) => item._id === product._id
  );

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

export const removeFromCart = (id) => {
  const cart = getCart().filter((item) => item._id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
};
