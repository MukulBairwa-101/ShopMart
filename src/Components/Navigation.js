import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import {BsBookmarkHeart ,FaTh,FiShoppingCart ,FiShoppingBag} from "../Assets/icons";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import { Link, useNavigate } from "react-router-dom";

const Navigation = () => {
  const appContext = useContext(AppContext);
  const [count,setCount] = appContext.value5;
  const [category, setCategory] = appContext.value2;
  const [productCollection,setProductCollection] = useState(
    appContext.value1[0].products
  );
  const [wishlistCount,setWishlistCount] = appContext.value8;

  const FixedBottomNavigation = () => {
    const [valueBottom, setValueBottom] = useState(0);

    const navigate = useNavigate();

    const bottomNavigation = (path) => {
      handleCategory();
      navigate(path);
    };

    return (
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          
        }}
      >

        <BottomNavigation
          showLabels
          value={valueBottom}
          onChange={(event, newValue) => {
            setValueBottom(newValue);
          }}
        >
          <BottomNavigationAction
            onClick={() => bottomNavigation("/")}
            label="Home"
            icon={<FiShoppingBag />}
          />
          <BottomNavigationAction
            onClick={() => bottomNavigation("/categories/Trending")}
            label="Explore"
            icon={<FaTh />}
          />
          <BottomNavigationAction
            onClick={() => bottomNavigation("/wishlist")}
            label="Wishlist"
            icon={<BsBookmarkHeart />}
          />
          <BottomNavigationAction
            onClick={() => bottomNavigation("/cart")}
            label='Cart'
            icon={<FiShoppingCart />}
          />
          {/* <BottomNavigationAction label="Profile" icon={<AiOutlineShoppingCart />} /> */}
        </BottomNavigation>
      </Paper>
    );
  };

  const handleCategory = () => {
    setCategory(productCollection);
  };

  return (
    <>
      <div className="navigation_container">
        <div className="navigation_wrapper">
          <div className="nav_logo">
            <Link to="/">
              <img src="/images/logo3.png" alt="logo" />
              Shop <span>Mart</span>
            </Link>
          </div>
          <div className="nav_routes">
            <ul>
              <li>
                <Link
                  to="/categories/Trending"
                  onClick={() => handleCategory()}
                >
                  Catgories
                </Link>
              </li>
              {/* <li>
                <Link to="/about">About us</Link>
              </li> */}
              <li>
                <Link to="/wishlist">
                  Wishlist<span>{wishlistCount}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="nav_right_div">
          {/* <p>Guest</p>
          <h4>Sign up</h4> */}
          <Link to="/cart">
            <FiShoppingCart />
            <span>{count}</span>
          </Link>
        </div>
      </div>
      <div className="bottom_nav">
        <FixedBottomNavigation />
      </div>
    </>
  );
};

export default Navigation;
