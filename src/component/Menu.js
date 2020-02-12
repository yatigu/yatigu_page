import React from 'react';
import Station from './Station';

import './Menu.css';

const Menu = () => {
    return (
        <div className = "menu-wrapper">
            <fieldlist className = "station-wrapper">
                <legend className = "menu-title">승차권 예매하기</legend>
                <ul className = "menu-ul">
                    <li className = "li-wrapper">
                        <label className = "menu-leg"> 출발역 </label>
                        <Station/>
                    </li>
                </ul>
                <ul>
                    <li className = "li-wrapper">
                        <label className = "menu-leg"> 도착역 </label>
                        <Station/>
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
    )
}

export default Menu;