import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { API_URL, formatPrice } from "../config";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();

  // Fetch the selected product from the Express backend.
  // ProductDetails -> useParams -> useEffect -> fetch -> Express API -> product
  useEffect(() => {
    fetch(`${API_URL}/products/${id}`)
      .then((res) => {
        if (res.status === 404) {
          navigate("/");
          return null;
        }
        if (!res.ok) {
          throw new Error("Request failed");
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setProduct(data);
        }
      })
      .catch(() => {
        setError("Unable to load product.");
      });
  }, [id, navigate]);

  if (error) {
    return <h1>{error}</h1>;
  }

  if (!product) {
    return <h1>Loading...</h1>;
  }

  const productInCart = cartItems.find((item) => item.id === product.id);

  const productQuantityLabel = productInCart
    ? `(${productInCart.quantity})`
    : "";

  return (
    <div className="page">
      <div className="container">
        <div className="product-detail">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-detail-content">
            <h1 className="product-detail-name">{product.name}</h1>
            <p className="product-detail-price">₹{formatPrice(product.price)}</p>
            <p className="product-detail-description">{product.description}</p>

          
            <div className="product-detail-addtocart">
            <button
              className="product-detail-addtocartbutton"
              onClick={() => addToCart(product.id)}
            >
              Add to Cart {productQuantityLabel}
            </button></div>
            <div className="product-detail-goback">
            <button
              className="product-detail-gobackbutton"
              onClick={() => navigate("/")}
            >
              <pre className="product-detail-hometext">⟪ Home</pre>
            </button></div>
        </div>
    </div>
      </div>
    </div>
  );
}
