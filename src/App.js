import React ,{useContext,useState} from "react";
import './App.css';
import EStall from './Components/EStall';
import Cart from "./Components/Cart";
import About from "./Components/About";
import Product from "./Components/product";
import Navigation from './Components/Navigation';
import Category from "./Components/Category";
import Footer from "./Components/Footer/Footer";
import Wishlist from "./Components/Wishlist/Wishlist"
import {Routes, Route} from "react-router-dom";
import {AppContext} from "./Context/AppContext";

function App() {
  const appContext = useContext(AppContext);
  
  const [ product,setProduct]= useState(appContext.value3)
  console.log('product',product);
  return (
    <div className="App">
    <Navigation />  
    <Routes>
      <Route exact  path ="/" element={<EStall />} />
      <Route exact  path ="/categories/:type" element={<Category />} />
      <Route exact  path ="/products/:id" element={<Product />} />
      <Route exact  path ="/aboutus" element={<About />} />
      <Route exact  path ="/cart" element={<Cart />} />
      <Route exact  path ="/wishlist" element={<Wishlist />} />
    </Routes>
    <Footer />
    {/* <EStall />   */}

    </div>
  );
}

export default App;
