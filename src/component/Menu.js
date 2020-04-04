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
import Modal from './Modal';

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

function createData(classification, stratPoint, trainNumber, endPoint) {
  return {classification, stratPoint, trainNumber, endPoint};
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
  const [ss,setSs] = useState(false);
  const [isModalOpen, toggleModal] = useState(false); 
  const [select, setSelect] = useState(false);
  const [ticket, setTicket] = useState();

  const searchTickets = () => {
    // let frd = new FormData();

    // frd.append('date', '20200202');
    // frd.append('hour', '160000');
    // frd.append('start', '서울');
    // frd.append('end', '부산');

    // console.log(frd) // body form-data를 넘길때 사용
    try {
        setSs(false);
      axios
        .get('http://15.165.170.3:8000/info/tickets/', {
          headers: {'Content-Type': 'multipart/form-data'},
          params: {
            // date: tdate,
            // hour: time,
            // start: from,
            // end: to,
            date: '20200228',
            hour: '160000',
            start: '서울',
            end: '부산',
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
          setSelect(false);
          setRows(temp);
          return true;
        });
    } catch (e) {
      console.log(e);
    }
  };

  const getTicket = () => {

    let frd = new FormData();
    frd.append('phone', '01012345678');
    frd.append('pw','rhrnak2628!')
    frd.append('source', '서울')
    frd.append('destination','부산')
    frd.append('index','1')
    frd.append('year','2020')
    frd.append('month','02')
    frd.append('day','28')
    try {
      axios
        .post('http://15.165.170.3:8000/account/user/',frd, {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        //   data: {
        //     id : '01087841576',
        //     pw : '1q2w3e4r!Q',
        //     source : '서울',
        //     destination : '부산',
        //     index : '1',
        //     year : '2020',
        //     month : '02',
        //     day : '28',
        //   },
        })
        .then(response => {
          //   setData(response.data.tickets);
            console.log(response)
          return true;
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
     
    <div >
        <fieldlist className="station-wrapper">
        <legend className="menu-title">승차권 예매하기</legend>
        <ul>
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
            <label className="date-wrapper"> 출발일 </label>
            <input className="menu-input-date" type="date" name="date" onChange  = {(e) => {setDate(e.target.value.replace(/-/gi,''));}}/>
            </li>
        </ul>
        <ul>
            <li className="li-wrapper">
            <label className="time-wrapper"> 시간 </label>
            <input className="menu-input-time" type="time" name="time" onChange  = {(e) => {setTime(e.target.value.replace(/:/gi,'').concat('00')) }}/>
            </li>
        </ul>
        <div>
            <button onClick={searchTickets}>기차 검색하기</button> {ss && <button onClick = {()=>{toggleModal(true)}}>로그인 후 자동 예매</button>}
            <Modal isOpen = { isModalOpen } toggle = { toggleModal } >
                <h1>로그인</h1>
                <label>id</label><input></input>
                <label>pw</label><input></input>
                <button onClick = {getTicket}>자동 예약 하기 버튼</button>
            </Modal>
        </div>
        </fieldlist>
        </div>
        <div>
            {select ? 
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
                    <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                            {ticket.classification}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            {ticket.stratPoint}
                        </StyledTableCell>
                        <StyledTableCell align="right">{ticket.trainNumber}</StyledTableCell>
                        <StyledTableCell align="right">{ticket.endPoint}</StyledTableCell>
                        </StyledTableRow>

                    </TableBody>
                </Table>
                </TableContainer>
                :
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
                        <StyledTableRow key={row.index} onClick = {()=>{setSelect(true); setTicket(row); setSs(true)}}>
                        <StyledTableCell component="th" scope="row">
                            {row.classification}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            {row.stratPoint}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.trainNumber}</StyledTableCell>
                        <StyledTableCell align="right">{row.endPoint}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>

            }
        </div>
    </>
  );
};

export default Menu;
