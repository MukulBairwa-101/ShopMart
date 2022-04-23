import React, { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import EmptyWishlist from "../Emptycart/EmptyWishlist";
import "../../styles/wishlist.css";

const Wishlist = () => {
  const appContext = useContext(AppContext);
  const [wishlistData, setWishlistData] = appContext.value7;
  const [wishlistCount, setWishlistCount] = appContext.value8;

  const emptyWishlist = () => {
    setWishlistData([]);
    setWishlistCount(0);
  };

  return (
    <div className="wishlist_container wrapper">
      {wishlistData.length !== 0 ? (
        <div className="wishlist_header flex ">
          <h4>YOUR WISHLIST ITEMS ARE LISTED BELOW </h4>
          <button
            className="btn_size  btn_cart btn_size_mob"
            onClick={() => emptyWishlist()}
          >
            Empty Wishlist
          </button>
        </div>
      ) : (
        ""
      )}

      <div className="flex wishlist_item_wrapper">
        {wishlistData.length !== 0 ? (
          wishlistData.map((item) => {
            return (
              <div key={item.id} className="wishlist-item flex box  ">
                <img src={item.imgSrc} className="item-img" alt="wishlist-img" />
                <h4>{item.productName}</h4>
              </div>
            );
          })
        ) : (
          <EmptyWishlist />
        )}
      </div>
    </div>
  );
};

export default Wishlist;
