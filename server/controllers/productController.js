// Controller functions for the product resource.
// Keeps the request/response logic separate from the route definitions.

const products = require("../data/products");

// GET /api/products -> return all products
function getAllProducts(req, res) {
  res.json(products);
}

// GET /api/products/:id -> return a single product by id
function getProductById(req, res) {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
}

module.exports = { getAllProducts, getProductById };
