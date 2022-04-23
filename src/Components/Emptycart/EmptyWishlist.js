import React from 'react'
import {useNavigate} from 'react-router-dom';
import "./EmptyWishlist.css"

const EmptyWishlist = () => {

    const navigate = useNavigate();
    return (
        <div className="emptywishlist flex">
            <h1 className="center">
                You have not not saved any item in your wishlist
            </h1>
            <div className="center addmore_btn" >

            <button className="btn_size btn-empty" onClick={()=>navigate('/')}  >
                    Explore Now 
            </button>
            </div>
        </div>
    )
}

export default EmptyWishlist;
