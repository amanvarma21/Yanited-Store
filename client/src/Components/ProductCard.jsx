import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { formatPrice } from "../config";

export default function ProductCard({ product }) {
  const { addToCart, cartItems } = useCart();
  const productInCart = cartItems.find((item) => item.id === product.id);

  const productQuantityLabel = productInCart
    ? `(${productInCart.quantity})`
    : "";
  return (
    <div className="product-card">
      
      <div className="product-card-content">
        <Link to={`/products/${product.id}`}>
              <img
        src={product.image}
        alt={product.name}
        className="product-card-image"
      /></Link>
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-price">₹{formatPrice(product.price)}</p>
        <div className="Cardbuttons">
          <Link className="Cardbuttons-details" to={`/products/${product.id}`}>
            View Details
          </Link>
          <button
          
            className="Cardbuttons-addtocart"
            onClick={() => addToCart(product.id)}>

            Add to Cart {productQuantityLabel}
         
          </button>
        </div>
      </div>
    </div>
  );
}
