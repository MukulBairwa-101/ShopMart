import React,{useState,createContext} from 'react'
import data from "../Assets/data"
export const AppContext = createContext();

export const Provider = (props) => {
    const [alldata,setAlldata]= useState(data);
    const [category,setCategory]= useState([]);
    const [cart,setCart]= useState([]);
    const [product,setProduct]= useState([]);
    const [count, setCount] = useState(cart.length);
    const [relatedProducts,setRelatedProducts]= useState([]);
    const [wishlist,setWishlist]= useState([]);
    const [wishlistCount,setWishlistCount] =useState(wishlist.length);


    

    const globalStateObject ={
        value1:alldata,
        value2:[category,setCategory],
        value3:[product,setProduct],
        value4:[cart,setCart],
        value5:[count,setCount],
        value6:[relatedProducts,setRelatedProducts],
        value7:[wishlist,setWishlist],
        value8:[wishlistCount,setWishlistCount]
    }

    return (
    <AppContext.Provider value={globalStateObject}>
        {props.children}
      </AppContext.Provider>
    )
}

export default AppContext;
