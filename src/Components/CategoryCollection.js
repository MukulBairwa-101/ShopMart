import React, { useState, useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

const CategoryCollection = ({ products }) => {
  const appContext = useContext(AppContext);
  const [productCollection, setProductCollection] = useState(products);
  const [category, setCategory] = appContext.value2;

  // const [error,setError]= useState('');
  // const[succes,setSucces]= useState('...');
  const navigate = useNavigate();

  const handleCategory = (type) => {
    if (type !== "Trending" && type !== 20) {
      let filterdData = [];
      filterdData = productCollection.filter(
        (product) => product.category === type
      );
      setCategory(filterdData);

      navigate(`/categories/${type}`);
    } else if (type === 20) {
      let filterdData = [];
      filterdData = productCollection.filter(
        (product) => product.discount === type
      );

      setCategory(filterdData);

      navigate(`/categories/${type}`);
    } else if (type === "Trending") {
      setCategory(productCollection);

      navigate(`/categories/${type}`);
    } else console.log("nothing to do");
  };

  return (
    <div className="tabs_wrapper wrapper">
      <h2 className="sub_head center">Featured Collections</h2>
      <div className="tabs_container">
        <div
          className="btn_box a"
          style={{ backgroundImage: "url(images/allproducts.jpg)" }}
        >
          <button onClick={() => handleCategory("Trending")}>Trending </button>
        </div>
        <div
          className="btn_box e"
          style={{ backgroundImage: "url(images/watches.jpg)" }}
          x
        >
          {/* <div>
                        <div>
                            <span>Buy products at 20% Discount</span>
                        </div>
                        <button onClick={()=>handleCategory(20)} >20% Off</button>
                    </div> */}
          {/* <div > */}
          {/* <img src="images/watches.jpg" alt="watches" /> */}
          <button onClick={() => handleCategory("Watch")}>Watches</button>
          {/* </div> */}
        </div>
        <div
          className="btn_box b"
          style={{ backgroundImage: "url(images/mensclothing1.jpg)" }}
        >
          <button onClick={() => handleCategory("Mens")}>Mens</button>
        </div>
        <div
          className="btn_box c "
          style={{ backgroundImage: "url(images/womensclothing1.jpg)" }}
        >
          <button onClick={() => handleCategory("Womens")}>
            Womens Fashion
          </button>
        </div>
        <div
          className="btn_box d"
          style={{ backgroundImage: "url(images/shoes.jpg)" }}
        >
          <button onClick={() => handleCategory("Shoe")}>Shoes</button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCollection;
