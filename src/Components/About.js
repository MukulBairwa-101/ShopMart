import React from "react";
import { useNavigate } from "react-router-dom";
const About = () => {

    const navigate = useNavigate();
  return (
    <div>
      <p>
        We are an ecommerce store for products like mens clothings , womens
        clothing , bags , watches ,shoes , electronic products with latest
        technologies and all the latest and trending items are availble at our
        store so,what are you waiting for explore our products with only one
        click press the below explore link to enter our world .
      </p>
      <div className="center addmore_btn">
        <button className="btn_size btn-empty" onClick={() => navigate("/")}>
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default About;
