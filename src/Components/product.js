import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { AiOutlineShoppingCart, FcLike } from "../Assets/icons";
import "../styles/product.css";
const Product = () => {
  const appContext = useContext(AppContext);
  const [product, setProduct] = appContext.value3;
  const [relatedProducts, setRelatedProducts] = appContext.value6;
  const [cart, setCart] = appContext.value4;
  const [count, setCount] = appContext.value5;
  const [wishlist, setWishlist] = appContext.value7;
  const [wishlistCount, setWishlistCount] = appContext.value8;

  const addProduct = (el) => {
    console.log(el);
    if (!cart.includes(el)) {
      setCart([...cart, el]);
      setCount(count + 1);
    }
    el.quantity += 1;
  };

  const addToWishlist = (el) => {
    if (!wishlist.includes(el)) {
      setWishlist([...wishlist, el]);
      setWishlistCount(wishlistCount + 1);
    }
  };

  return (
    <div className="">
      {product.map((current) => {
        return (
          <>
            <div className="one_product">
              <img src={`/${current.imgSrc}`} alt={current.productName} />
              <div className="product_details right_div">
                <h4 className="product_detail_head">{current.category}</h4>
                <h2>{current.productName}</h2>
                <h5>{current.subCategory}</h5>
                <div>
                  <h5>Discount </h5>
                  {current.discount === 20 ? (
                    <div className="product_badge oneproduct_badge">
                      20% OFF
                    </div>
                  ) : current.discount === 50 ? (
                    <div className="product_badge oneproduct_badge">
                      50% OFF
                    </div>
                  ) : (
                    <div className="product_badge oneproduct_badge">
                      No Discount Available
                    </div>
                  )}
                </div>

                <div className="product_sub oneproduct_price">
                  <div className="oneproduct_price">
                    MRP Rs.{" "}
                    <span
                      className={current.discount !== 0 ? "new_price" : "price"}
                    >
                      {" "}
                      {current.price}
                    </span>
                    {current.discount !== 0 ? (
                      <span className="product_detail_head">{current.mrp}</span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="btn_holder web_btn">
                  <button
                    onClick={() => addProduct(current)}
                    className="btn_size add_to_cart_btn"
                  >
                    Add to cart <AiOutlineShoppingCart />
                  </button>
                  <button
                    className="btn_size wishlist_btn pointer"
                    onClick={() => addToWishlist(current)}
                  >
                    <FcLike /> Save to Wishlist{" "}
                  </button>
                </div>
              </div>
            </div>
            {/* <div className="btn_holder mob_btn">
                            <button onClick={()=>addProduct(current)} className="btn_size add_to_cart_btn">Add to cart <AiOutlineShoppingCart /></button>
                            <button className="btn_size wishlist_btn" onClick={()=>addToWishlist(current)}  ><FcLike /> Save to Wishlist  </button>
                        
                            
                         </div> */}
          </>
        );
      })}
    </div>
  );
};

export default Product;
