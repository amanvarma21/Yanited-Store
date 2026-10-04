import { Component } from "react";
import ProductCard from "./ProductCard";
import { API_URL } from "../config";

// ProductList is a React CLASS component.
// It fetches products from the Express backend, holds them in state, and
// renders a ProductCard for each one. This demonstrates class-based state
// (this.state / this.setState) and the componentDidMount lifecycle method,
// which is the class equivalent of useEffect(() => {...}, []).
class ProductList extends Component {
  constructor(props) {
    super(props);
    // State for fetched products plus loading/error UI states.
    this.state = {
      products: [],
      loading: true,
      error: null,
    };
  }

  // Lifecycle method: runs once after the component is first rendered.
  // ProductList -> componentDidMount -> fetch -> Express API -> products -> setState -> ProductCard
  componentDidMount() {
    fetch(`${API_URL}/products`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Request failed");
        }
        return res.json();
      })
      .then((data) => {
        this.setState({ products: data, loading: false });
      })
      .catch(() => {
        this.setState({ error: "Unable to load products.", loading: false });
      });
  }

  render() {
    const { products, loading, error } = this.state;
    // Search text comes in as a prop from the Home page (parent -> child).
    const search = (this.props.search || "").toLowerCase().trim();

    if (loading) {
      return <p>Loading products...</p>;
    }

    if (error) {
      return <p className="error-message">{error}</p>;
    }

    // Filter products by name based on the search prop.
    const visibleProducts = search
      ? products.filter((product) =>
          product.name.toLowerCase().includes(search)
        )
      : products;

    if (visibleProducts.length === 0) {
      return <p>No products found.</p>;
    }

    return (
      <div className="product-grid">
        {visibleProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    );
  }
}

export default ProductList;
