import React from 'react'

const CountdownTimer = ({timer}) => {
    return (
        <div className="timer">
            <div className="timer_value">
                <span>{timer.days}</span>
                <span>Days</span>
            </div>
            <div className="timer_value">
                <span>{timer.hours}</span>
                <span>Hours</span>
            </div>
            <div className="timer_value">
                <span>{timer.minutes}</span>
                <span>Minutes</span>
            </div>
            <div className="timer_value">
                <span>{timer.seconds}</span>
                <span>Seconds</span>
            </div>
        </div>
    )
}

export default CountdownTimer;
