import React, {useState} from 'react';
import Station from './Station';
import Reservation from './Reservation';


import './Menu.css';

const Menu = () => {
    
    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    console.log("from:",from);
    console.log("to:",to);
    

    return (
        <>
            <div className = "menu-wrapper">
                <fieldlist className = "station-wrapper">
                    <legend className = "menu-title">승차권 예매하기</legend>
                    <ul className = "menu-ul">
                        <li className = "li-wrapper">
                            <label className = "menu-leg"> 출발역 </label>
                            <Station setStation = {setFrom}></Station>
                        </li>
                    </ul>
                    <ul>
                        <li className = "li-wrapper">
                            <label className = "menu-leg"> 도착역 </label>
                            <Station setStation = {setTo}></Station>
                        </li>
                    </ul>
                    <ul>
                        <li className = "li-wrapper">
                            <label className = "date-wrapper">출발일 </label>
                            <input className = "menu-input-date" type = "date" name = "date"/>
                        </li>
                    </ul>
                    <ul>
                        <li className= "li-wrapper">
                            <label className = "time-wrapper">시간</label>
                            <input className = "menu-input-time" type = "time" name = "time"/>
                        </li>
                    </ul>
                </fieldlist>
            </div>
            <div>
                <Reservation/>
            </div>
        </>
    )
}

export default Menu;