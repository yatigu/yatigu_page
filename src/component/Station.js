import React, {useState} from 'react';
import axios from 'axios';
import './Station.css';
import Modal from './Modal';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    label: {
      display: 'block',
    },
    input: {
      width: 200,
    },
    listbox: {
      width: 200,
      margin: 0,
      padding: 0,
      zIndex: 1,
      position: 'absolute',
      listStyle: 'none',
      backgroundColor: theme.palette.background.paper,
      overflow: 'auto',
      maxHeight: 200,
      border: '1px solid rgba(0,0,0,.25)',
      '& li[data-focus="true"]': {
        backgroundColor: '#4a8df6',
        color: 'white',
        cursor: 'pointer',
      },
      '& li:active': {
        backgroundColor: '#2977f5',
        color: 'white',
      },
    },
}));

const Station = () => {

    const [names, setNames] = useState([]); //기차역 전부다 때려박은거
    const [isModalOpen, toggleModal] = useState(false); 
    const [stationList, setStationList] = useState([[]]); // 초성별 기차역 배열
    const [initialList, setInitialList] = useState([]); //초성 리스트
    const [initial, setInitial] = useState(0); //초성 선택
    const [from, SetFrom] = useState();
    const [to,SetTo] = useState();

    const onClick = async () => {

        try {
            const response = await axios.get('http://15.165.170.3:8000/info/stations/');
            const _initials = ['ㄱ','ㄴ','ㄷ','ㄹ','ㅁ','ㅅ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
 
            setStationList(response.data.stations);
            toggleModal(true);
 
            setInitialList(_initials);

        } catch (e) {
            console.log(e);
        }

    };


    const onSearch = async () => {

        try {
            const response = await axios.get('http://15.165.170.3:8000/info/stations/');
            var _names = [];
 
            setStationList(response.data.stations);
 
            for(var i in stationList) {
                for(var j in stationList[i]) {
                    _names = _names.concat(stationList[i][j]);
                }
            }

            setNames(_names);
            console.log("eEEEE");

        } catch (e) {
            console.log(e);
        }

    };


    const classes = useStyles();
    const {
      getRootProps,
      getInputLabelProps,
      getInputProps,
      getListboxProps,
      getOptionProps,
      groupedOptions,
    } = useAutocomplete({
    //   id: 'use-autocomplete-demo',
      options: names,
      getOptionLabel: option => option,
    });
  

    const nameList = names.map((name,index) => <option key = { index } > { name } </option>);
    const ButtonList = initialList.map((ini,index) => <button className = "right-margin" key = { index } onClick = { () => { setInitial(index) } }> { ini } </button>  );
    const selectList = stationList[initial].map((station, index) => <option key = {index}> { station } </option>);

    return ( 
        <div>
            <div>
                <div {...getRootProps()}>
                    <label className = {classes.label} {...getInputLabelProps()}>
                    </label>
                    <input onClick = { onSearch } className = {classes.input} {...getInputProps()} />
                </div>
                    {groupedOptions.length > 0 ? (
                        <ul className = {classes.listbox} {...getListboxProps()}>
                        {groupedOptions.map((option, index) => (
                            <li {...getOptionProps({ option, index })}>{option}</li>
                        ))}
                        </ul>
                    ) : null}
            </div>

            <div valgn="top" className = "sel-box">
                <button onClick = { onClick } > 검색 </button>
                <Modal isOpen = { isModalOpen } toggle = { toggleModal } >
                    <h1>기차역</h1>
                        { ButtonList }
                    <div className = "top-margin">
                        <select>
                            { selectList }
                        </select> 
                    </div>
                    <div className = "top-margin">
                        <button onClick={() => toggleModal(false)}>선택 완료</button>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default Station;