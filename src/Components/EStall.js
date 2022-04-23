import React, { useState, useContext } from "react";
import CategoryCollection from "./CategoryCollection";
import SuperSale from "../Components/Banners/SuperSale";

import { AppContext } from "../Context/AppContext";
import { AiOutlineShoppingCart } from "../Assets/icons";
import { useNavigate } from "react-router-dom";

const EStall = () => {
  const appContext = useContext(AppContext);

  const [products, setProducts] = useState(appContext.value1[0].products);
  const [product, setProduct] = appContext.value3;
  const [cart, setCart] = appContext.value4;
  const [count, setCount] = appContext.value5;
  const [relatedProducts, setRelatedProducts] = appContext.value6;

  const navigate = useNavigate();

  const getProduct = (idx, type, subCategory) => {
    let filteredData = products.filter((item) => item.id === idx);
    setProduct(filteredData);

    //    let related = products.filter(item=> item.category === category)
    //    setRelatedProducts(related);

    navigate(`/products/${idx}`);
  };

  const addProduct = (el) => {
    if (!cart.includes(el)) {
      setCart([...cart, el]);
      setCount(count + 1);
    }

    el.quantity += 1;
  };

  return (
    <div>
      <CategoryCollection products={products} />

      <div className="wrapper">
        <h2 className="center sub_head">Our Products</h2>

        <div className="products_container">
          {products.map((product) => {
            return (
              <div className="product_card" key={product.id}>
                {product.discount === 20 ? (
                  <div className="product_badge">20% OFF</div>
                ) : product.discount === 50 ? (
                  <div className="product_badge">50% OFF</div>
                ) : (
                  ""
                )}

                <div className="product_image">
                  <img src={product.imgSrc} alt={product.category} />
                </div>
                <div className="product_details">
                  <h5
                    onClick={() =>
                      getProduct(product.id, product.subCategory, product.type)
                    }
                  >
                    {product.productName}
                    {/* <Link to={`/products/${product.id}`}></Link> */}
                  </h5>
                  <div className="product_sub">
                    <div>
                      MRP Rs.{" "}
                      <span
                        className={
                          product.discount !== 0 ? "new_price" : "price"
                        }
                      >
                        {" "}
                        {product.price}
                      </span>
                      {product.discount !== 0 ? <span>{product.mrp}</span> : ""}
                    </div>
                    <AiOutlineShoppingCart
                      className={
                        product.quantity === 0
                          ? "add_to_cart"
                          : "add_to_cart added"
                      }
                      onClick={() => addProduct(product)}
                    />
                  </div>
                </div>
                {/* <h4>{product.category}</h4> */}
              </div>
            );
          })}
        </div>
      </div>
      <SuperSale />
    </div>
  );
};

export default EStall;
