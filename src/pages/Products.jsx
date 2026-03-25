import { useEffect, useState } from "react";
import API from "../api";
import "../styles/home.css";

function Products({ searchTerm }) {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const scrollToProducts = () => {
    const section = document.getElementById("featured-products");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth"
      });
    }
  };

  // SEARCH FILTER
  const filteredProducts = products.filter((product) =>
  product.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
  product.brand?.toLowerCase().includes(searchTerm?.toLowerCase())
);

  return (
    <div>

      {/* HERO SECTION */}

      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-content">

            <h1>Premium Accessories & Car Spare Parts</h1>

            <p>Quality automotive products for every journey</p>

            <button className="hero-btn" onClick={scrollToProducts}>
              Explore Products
            </button>

          </div>
        </div>
      </section>


      {/* FEATURED PRODUCTS */}

      <div id="featured-products" className="section">

        <h2>Featured Products</h2>

        <div className="products-grid">

          {filteredProducts.slice(0, 50).map((product) => (

            <div className="product-card" key={product._id}>

              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />

              <div className="product-content">

                <h3>{product.name}</h3>

                <p className="brand">Brand: {product.brand}</p>

                <p className="description">
                  {product.description?.substring(0, 80)}...
                </p>

                <p className="stock">
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </p>

                <div className="product-actions">

                  <a href="tel:+919XXXXXXXXX" className="call-btn">
                    📞 Call for Price
                  </a>

                  <a
                    href={`https://wa.me/919XXXXXXXXX?text=Hello I want inquiry about ${product.name}`}
                    className="whatsapp-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    💬 WhatsApp
                  </a>

                </div>

              </div>

            </div>

          ))}

        </div>

        {filteredProducts.length === 0 && (
          <p className="no-products">No products found</p>
        )}

      </div>


      {/* WHY CHOOSE US */}

      <div className="why-choose">

        <h2>Why Choose Paras Enterprises</h2>

        <div className="features">

          <div className="feature-card">
            <h3>🚗 Premium Quality</h3>
            <p>Only genuine and high quality automotive parts.</p>
          </div>

          <div className="feature-card">
            <h3>🔧 Expert Support</h3>
            <p>Automotive experts helping you choose the right parts.</p>
          </div>

          <div className="feature-card">
            <h3>⚡ Fast Service</h3>
            <p>Quick product delivery and service turnaround.</p>
          </div>

          <div className="feature-card">
            <h3>💰 Best Pricing</h3>
            <p>Competitive prices with transparent deals.</p>
          </div>

        </div>

      </div>


      {/* CALL TO ACTION */}

      <div className="cta-section">

        <h2>Upgrade Your Vehicle Today</h2>

        <p>Browse our collection of high performance car parts.</p>

        <button className="hero-btn" onClick={scrollToProducts}>
          Shop Now
        </button>

      </div>

    </div>
  );
}

export default Products;