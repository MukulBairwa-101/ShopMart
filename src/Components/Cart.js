import React, { useState, useContext, useEffect } from "react";
import AppContext from "../Context/AppContext";
import {
  MdDelete,
  BiRupee,
  MdOutlineContentCopy,
  RiCloseCircleFill,
  FaAngleUp,
  FaAngleDown,
} from "../Assets/icons";
import "../styles/cart.css";
import Modal from "react-modal";
import Emptycart from "./Emptycart/Emptycart";
import { useNavigate } from "react-router-dom";

import promocodes from "../Assets/promocodes";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    borderColor: "rgb(238, 238, 238)",
    border: "1px solid rgb(238, 238, 238)",
    boxShadow: ".4rem .4rem  .9rem  #f0f0f0",
    padding: "30px 20px",
    backgroundColor: "#242B2E",
    color: "white",
  },
};

const Cart = () => {
  const appContext = useContext(AppContext);
  const [cart, setCart] = appContext.value4;
  const [count, setCount] = appContext.value5;

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [voutcher, setVoutcher] = useState("");
  const [discount, setDiscount] = useState(0);
  const [DISCOUNTED_PRICE, setDISCOUNTED_PRICE] = useState(0);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const [order, setOrder] = useState({
    orderItems: 0,
    orderTotal: 0,
  });

  useEffect(() => {
    setBill();
  }, [cart]);

  const applyCode = (codeid) => {
    if (codeid === "10OFF") {
      setVoutcher("10OFF");
      let discountAmount = (order.orderTotal * (10 / 100)).toFixed(2);
      setDiscount(discountAmount);
      setDISCOUNTED_PRICE(order.orderTotal - discountAmount);
    } else if (codeid === "40OFF") {
      setVoutcher("40OFF");
      let discountAmount = (order.orderTotal * (40 / 100)).toFixed(2);
      setDiscount(discountAmount);
      setDISCOUNTED_PRICE(order.orderTotal - discountAmount);
    } else setVoutcher("");
  };

  const setBill = () => {
    let items = 0;
    let total = 0;

    cart.length === 0
      ? setOrder({
          orderItems: 0,
          orderTotal: 0,
        })
      : cart.map((el) => {
          items += el.quantity;
          if (el.quantity === 1) total += el.mrp;
          else total += el.totalPrice;

          setOrder({
            orderItems: items,
            orderTotal: total,
          });
        });
  };

  const setQuantity = (el, actionType) => {
    const itemExist = cart.find((item) => item.id === el.id);

    if (itemExist) {
      if (actionType === "add") {
        itemExist.quantity += 1;
        itemExist.totalPrice = itemExist.mrp * itemExist.quantity;
      } else if (actionType === "minus") {
        if (itemExist.quantity > 0) {
          itemExist.quantity -= 1;
        } else itemExist.quantity = 0;

        itemExist.totalPrice = itemExist.mrp * itemExist.quantity;
      } else console.log(itemExist, "no action is performed");

      setCart([...cart]);
    }
  };

  const removeItem = (el) => {
    const updatedCart = cart.filter((item) => item.id !== el.id);
    console.log(updatedCart);
    setCart(updatedCart);
    setCount(updatedCart.length);
  };

  const handleCheckout = () => {
    setCart([]);
    setCount(0);
    setDiscount(0);
    setDISCOUNTED_PRICE(0);
    setVoutcher("");
  };

  return (
    <div className="cart_container">
      <div>
        <div className="cart_header center web_mode">
          <h4>
            You have {count} {count <= 1 ? "item" : "items"} in your bag
          </h4>
        </div>

        <div className="cart_header mob center">
          <h4 onClick={() => setShow(!show)}>
            You have {count} {count <= 1 ? "item" : "items"} in your bag{" "}
            {show ? <FaAngleUp /> : <FaAngleDown />}{" "}
          </h4>

          {show ? (
            <div>
              <div className="bill bill_mob ">
                <h4>Summary</h4>
                <div className="bill_values">
                  <h5>Total items</h5>
                  <h5>{order.orderItems}</h5>
                </div>
                <div className="bill_values">
                  <h5>Total Price</h5>
                  <h5>
                    <BiRupee />
                    {order.orderTotal}
                  </h5>
                </div>
                {voutcher !== "" ? (
                  <div className="bill_values discount_div">
                    <h5>Discount</h5>
                    <h5>
                      {" "}
                      - <BiRupee /> {discount}
                    </h5>
                  </div>
                ) : (
                  ""
                )}

                {discount !== 0 ? (
                  <div className="bill_values total_div">
                    <h5>Grand Total</h5>
                    <h5>
                      <BiRupee />
                      {DISCOUNTED_PRICE}
                    </h5>
                  </div>
                ) : (
                  <div className="bill_values total_div">
                    <h5>Grand Total</h5>
                    <h5>
                      <BiRupee />
                      {order.orderTotal}
                    </h5>
                  </div>
                )}

                <span
                  onClick={openModal}
                  className="btn_size btn_cart btn_code"
                >
                  Have a Promocode ?
                </span>
                <button className="btn_size btn_cart" onClick={() => handleCheckout()}>Checkout</button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        {cart.length === 0 ? (
          <Emptycart />
        ) : (
          <>
            <div className="cart">
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
              >
                <RiCloseCircleFill
                  onClick={closeModal}
                  className="btn_size close"
                />
                {promocodes.map((code) => {
                  return (
                    <div className="promocode flex align-center space-between">
                      <p>{code.codeName}</p>
                      <MdOutlineContentCopy
                        className="copy pointer"
                        onClick={() => applyCode(code.codeId)}
                      />
                    </div>
                  );
                })}
              </Modal>

              {cart.map((item) => {
                return (
                  <div className="item_holder" key={item.id}>
                    <div className="item_detail">
                      <img
                        src={`/${item.imgSrc}`}
                        alt=""
                        className="item_image"
                      />
                      <div className="item_detail sub_detail">
                        <h4>{item.productName}</h4>
                        <span>Rs. {item.mrp} each</span>
                        <div className="mob">
                          <div className="cart_actions ">
                            <div className="flex align-center">
                              <button
                                onClick={() => setQuantity(item, "minus")}
                                className="cart_btn"
                              >
                                -
                              </button>
                              <span>{item.quantity}</span>
                              <button
                                onClick={() => setQuantity(item, "add")}
                                className="cart_btn"
                              >
                                +
                              </button>
                              <MdDelete
                                onClick={() => removeItem(item)}
                                className="delete"
                              />
                              <div className="flex align-center">
                                <BiRupee />
                                <h3 className="item_price">
                                  {" "}
                                  {item.quantity === 1
                                    ? item.mrp
                                    : item.totalPrice}{" "}
                                </h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="web ">
                      <div className="cart_actions ">
                        <div>
                          <button
                            onClick={() => setQuantity(item, "minus")}
                            className="cart_btn"
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => setQuantity(item, "add")}
                            className="cart_btn"
                          >
                            +
                          </button>
                          <MdDelete
                            onClick={() => removeItem(item)}
                            className="delete"
                          />
                        </div>

                        <h3 className="item_price">
                          {" "}
                          <BiRupee />{" "}
                          {item.quantity === 1
                            ? item.mrp
                            : item.totalPrice}{" "}
                        </h3>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="center addmore_btn">
              <button
                className="btn_size btn-empty "
                onClick={() => navigate("/")}
              >
                Shop More
              </button>
            </div>
          </>
        )}
      </div>

      <div className="web_mode">
        <div className="bill bill_web ">
          <h4>Summary</h4>
          <div className="bill_values">
            <h5>Total items</h5>
            <h5>{order.orderItems}</h5>
          </div>
          <div className="bill_values">
            <h5>Total Price</h5>
            <h5>
              <BiRupee />
              {order.orderTotal}
            </h5>
          </div>
          {voutcher !== "" ? (
            <div className="bill_values discount_div">
              <h5>Discount</h5>
              <h5>
                {" "}
                - <BiRupee /> {discount}
              </h5>
            </div>
          ) : (
            ""
          )}

          {discount !== 0 ? (
            <div className="bill_values total_div">
              <h5>Grand Total</h5>
              <h5>
                <BiRupee />
                {DISCOUNTED_PRICE}
              </h5>
            </div>
          ) : (
            <div className="bill_values total_div">
              <h5>Grand Total</h5>
              <h5>
                <BiRupee />
                {order.orderTotal}
              </h5>
            </div>
          )}

          <span onClick={openModal} className="btn_size btn_cart btn_code">
            Have a Promocode ?
          </span>
          <button
            className="btn_size btn_cart"
            onClick={() => handleCheckout()}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
