import React, {useState} from 'react';
import axios from 'axios';
import Station from './Station';
// import Reservation from './Reservation';


import './Menu.css';
import Reservation from './Reservation';

const Menu = () => {
    
    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    console.log("from:",from);
    console.log("to:",to);
    const [tdata,setData] = useState();

    const onClick = async () => {

        let frd = new FormData();
        
        frd.append('date', '20200202');
        frd.append('hour', '160000');
        frd.append('start', '서울');
        frd.append('end', '부산');

        // console.log(frd)

        try {
            const response = await axios.post('http://15.165.170.3:8000/info/tickets/' , frd, {
                    headers : { "Content-Type": "multipart/form-data"} ,
                });
            setData(response)
            console.log(response);

            // const body = { date: '20200220', hour: '160000', start:'서울', end:'부산' };
            // axios({
            //     url:'http://15.165.170.3:8000/info/tickets/',
            //     method:'GET',
            //     headers:{
            //     'Content-Type':'multipart/form-data'
            //     },
            //     data:body,
            // })
            // setData(response);
        } catch (e) {
            console.log(e);
        }

    };


    return (
        <>
            <div className = "menu-wrapper">
                <fieldlist className = "station-wrapper">
                    <legend className = "menu-title">승차권 예매하기</legend>
                    <ul className = "menu-ul">
                        <li className = "li-wrapper">
                            <label className = "menu-leg"> 출발역 </label>
                            <Station setStation = {setFrom} station = {from}></Station>
                        </li>
                    </ul>
                    <ul>
                        <li className = "li-wrapper">
                            <label className = "menu-leg"> 도착역 </label>
                            <Station setStation = {setTo} station = {to}></Station>
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
                    <div>
                        <button onClick={onClick}>기차 검색하기</button>
                    </div>
                    <div>
                        {tdata && <textarea rows={7} value = {JSON.stringify(tdata,null,2)}/>}
                    </div>
                </fieldlist>
            </div>
            
        </>
    )
}

export default Menu;