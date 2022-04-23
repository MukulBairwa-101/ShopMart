import React,{useState,useEffect} from 'react'
import CountdownTimer from "../CountDownTimer/CountdownTimer";
import "../../styles/supersale.css";
const SuperSale = () => {
    const [timer,setTimer]=useState({
        days:10,
        hours:10,
        minutes:10,
        seconds:10
    })

    let interval;
    const startTimer =()=>{
        const futureDate = new Date('30 May,2022').getTime();

        interval = setInterval(()=>{
            const now = new Date().getTime();

            const timeDistance =  futureDate - now ;

            const days = Math.floor(timeDistance/(24*60*60*1000));
            const hours = Math.floor((timeDistance % (24*60*60*1000))/(1000*60*60));
            const minutes = Math.floor((timeDistance % (60*60*1000))/(1000*60));
            const seconds = Math.floor((timeDistance % (60*1000))/(1000));

            if(timeDistance>0){
                setTimer({
                    days:days,
                    hours:hours,
                    minutes:minutes,
                    seconds:seconds
                });
            }
            else clearInterval(interval.current);

        })
    }
    useEffect(()=>{
        startTimer();
    });
    return (
        <div className="banner">
            <div className="left_div">
                <img  src= "/images/streetrunner.jpg" alt ="super-sale"/>
            </div>
            <div className="right_div_banner ">
                <h2 className="center">Super Sale is live now </h2>
                <p className="p">Buy Watches , Shoes ,Jackets , wearable clothes for mens and womens and all trending products at 50%  discount </p>
                <p className="p">Explore all products at 50% Off and fill your bags with the amazing products </p>

                <span className="">Sale ends in</span>
                <CountdownTimer timer={timer} />
            </div>
        </div>
    )
}

export default SuperSale;
