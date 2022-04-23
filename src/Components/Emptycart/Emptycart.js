import React from 'react'
import {FiShoppingCart} from '../../Assets/icons';
import "../Emptycart/Emptycart.css";
import {useNavigate} from 'react-router-dom';
const Emptycart = () => {

    const navigate = useNavigate();
    return (
        <div className=" emptycart center">  
            <FiShoppingCart  className="emptycart_icon" />
            <div>
                <h3>
                    Your Cart Is Empty
                </h3>
                <button className="btn_size btn-empty" onClick={()=>navigate('/')}  >
                    Shop More
                </button>
            </div>
        </div>
    )
}

export default Emptycart;
