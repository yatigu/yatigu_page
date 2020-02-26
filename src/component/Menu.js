import React, {useState} from 'react';
import axios from 'axios';
import Station from './Station';
import './Menu.css';
// import Reservation from './Reservation';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs) {
  return {name, calories, fat, carbs};
}

const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
});

const Menu = () => {
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  //   const [tdata, setData] = useState();
  const [rows, setRows] = useState([]);
  const [tdate, setDate] = useState();
  const [time, setTime] = useState();
  const classes = useStyles();

  const searchTickets = () => {
    // let frd = new FormData();

    // frd.append('date', '20200202');
    // frd.append('hour', '160000');
    // frd.append('start', '서울');
    // frd.append('end', '부산');

    // console.log(frd) // body form-data를 넘길때 사용
    try {
        console.log(tdate, time, from, to)
      axios
        .get('http://15.165.170.3:8000/info/tickets/', {
          headers: {'Content-Type': 'multipart/form-data'},
          params: {
            date: tdate,
            hour: time,
            start: from,
            end: to,
          },
        })
        .then(response => {
          //   setData(response.data.tickets);
          const data = response.data.tickets;
          let temp = [];
          for (var i in response.data.tickets) {
            temp = temp.concat(
              createData(
                data[i].구분,
                data[i].출발시간,
                data[i].열차번호,
                data[i].도착시간,
              )
            );
          }
          setRows(temp);
          return true;
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="menu-wrapper">
        <fieldlist className="station-wrapper">
          <legend className="menu-title">승차권 예매하기</legend>
          <ul className="menu-ul">
            <li className="li-wrapper">
              <label className="menu-leg"> 출발역 </label>
              <Station setStation={setFrom} station={from}></Station>
            </li>
          </ul>
          <ul>
            <li className="li-wrapper">
              <label className="menu-leg"> 도착역 </label>
              <Station setStation={setTo} station={to}></Station>
            </li>
          </ul>
          <ul>
            <li className="li-wrapper">
              <label className="date-wrapper">출발일 </label>
              <input className="menu-input-date" type="date" name="date" onChange  = {(e) => {setDate(e.target.value.replace(/-/gi,''))}}/>
            </li>
          </ul>
          <ul>
            <li className="li-wrapper">
              <label className="time-wrapper">시간</label>
              <input className="menu-input-time" type="time" name="time" onChange  = {(e) => {setTime(e.target.value.replace(/:/gi,'').concat('00')) }}/>
            </li>
          </ul>
          <div>
            <button onClick={searchTickets}>기차 검색하기</button>
          </div>
        </fieldlist>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>구분</StyledTableCell>
                <StyledTableCell align="right">출발시간</StyledTableCell>
                <StyledTableCell align="right">열차번호</StyledTableCell>
                <StyledTableCell align="right">도착시간</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.calories}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.fat}</StyledTableCell>
                  <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Menu;
