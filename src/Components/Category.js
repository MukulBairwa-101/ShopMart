import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import {
  GiRunningShoe,
  AiOutlineShoppingCart,
  GoWatch,
  CgTrending,
  FaFemale,
  FaMale,
  // AiOutlineSortAscending,
  // AiOutlineSortDescending,
  // GiPriceTag,
  // BsArrowDownShort,
  // BsArrowUpShort,
} from "../Assets/icons";

import "../styles/category.css";

const categories = [
  {
    name: "Trending",
    route: "/categories/Trending",
    icon: <CgTrending />,
  },
  {
    name: "Mens",
    route: "/categories/Mens",
    icon: <FaMale />,
  },
  {
    name: "Womens",
    route: "/categories/Womens",
    icon: <FaFemale />,
  },
  {
    name: "Shoe",
    route: "/categories/Shoe",
    icon: <GiRunningShoe />,
  },
  {
    name: "Watch",
    route: "/categories/Watch",
    icon: <GoWatch />,
  },
];

const Category = () => {
  const appContext = useContext(AppContext);
  const [productCollection, setProductCollection] = useState(
    appContext.value1[0].products
  );
  const [category, setCategory] = appContext.value2;
  const [cart, setCart] = appContext.value4;
  const [count, setCount] = appContext.value5;
  const [product, setProduct] = appContext.value3;

  let categoryHeader = category[0].category;

  const navigate = useNavigate();

  const handleCategory = (type) => {
    if (type !== "Trending") {
      let filterdData = [];
      console.log(type);
      filterdData = productCollection.filter(
        (product) => product.category === type
      );

      setCategory(filterdData);

      navigate(`/categories/${type}`);
    } else if (type === "Trending") {
      setCategory(productCollection);

      navigate(`/categories/${type}`);
    } else console.log("nothing to do");
  };

  const getProduct = (idx, type, subCategory) => {
    let filteredData = category.filter((item) => item.id === idx);
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

  const sortItems = (taskKey) => {
    let sortedData = [];

    if (taskKey === "lth") {
      console.log("called");
      sortedData = category.sort((a, b) => a.mrp - b.mrp);
      console.log("sorted", sortedData);
      setCategory(sortedData);
    } else if (taskKey === "htl") {
      console.log("called");
      sortedData = category.sort((a, b) => b.mrp - a.mrp);
      console.log("sorted", sortedData);
      setCategory(sortedData);
    } else console.log("not");
  };

  console.log(category);
  return (
    <div className="category_container">
      <div className="categories-sidebar">
        <h5 className="category_tag_label">Explore</h5>
        <div className="categories">
          {categories.map((element) => {
            return (
              <>
                <Link
                  to={element.route}
                  onClick={() => handleCategory(element.name)}
                  className="align-center"
                >
                  <div>{element.icon}</div>
                  {element.name}{" "}
                </Link>
              </>
            );
          })}
        </div>
      </div>
      <div className="sub_container">
        <div className="category_header">
          <h3>{categoryHeader}</h3>
          {/* <div className="actions_holder">
            <h4>Sort by</h4>
            <div className="actions">
              <AiOutlineSortAscending onClick={() => sortItems("asc")} />
              <AiOutlineSortDescending onClick={() => sortItems("des")} />
              <div>
                <GiPriceTag onClick={() => sortItems("lth")} />
                <BsArrowUpShort />
              </div>
              <div>
                <GiPriceTag onClick={() => sortItems("htl")} />
                <BsArrowDownShort />
              </div>
            </div>
          </div> */}
        </div>
        <div className="products_container category_product_container ">
          {category.map((product) => {
            return (
              <div className="product_card category_product_card " key ={product.id}>
                {product.discount === 20 ? (
                  <div className="product_badge">20% OFF</div>
                ) : product.discount === 50 ? (
                  <div className="product_badge">50% OFF</div>
                ) : (
                  ""
                )}

                <div className="product_image">
                  <img src={`/${product.imgSrc}`} alt={product.productName} />
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
    </div>
  );
};

export default Category;
