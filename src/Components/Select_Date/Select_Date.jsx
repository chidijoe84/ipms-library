import React, {useState, useEffect} from 'react'
import axios from '../Utilities/axios'
import dayjs from 'dayjs';
import moment from 'moment';
// import 'antd/lib/date-picker/style/css';
import { DatePicker } from 'antd';
// import 'antd/dist/antd.css';
import './Select_Date.css'
import Room_Selection from '../Room_List/Room_ListDisplay/Room_Selection';
import {handleClearStore,} from '../Redux/Actions/room_actions';
// import { Button } from 'test-button-lib-trace/dist/Button'
import { connect } from 'react-redux';

const Select_Date = ({hotelId, hotelData, handleClearStore, getBookingDate}) => {
  const [allHotelRooms, setAllHotelRooms] = useState([])
  const [days, setDays] = useState(0);
    const [days2, setDays2] = useState(0);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState()
    const dateFormat = 'YYYY-MM-DD HH:mm:ss';
    const sourceType = "showInCompanySite"
    const today = moment().format("YYYY-MM-DD HH:mm:ss");
    const tomorrow = moment().add(1, "day").format("YYYY-MM-DD HH:mm:ss");
    const dates = [today, tomorrow];

    useEffect(()=>{
      const calculateDaysBetweenDates = () => {
        getBookingDate(dates, startDate, endDate)
        const date1 = new Date(startDate ? startDate : dates[0]);
        const date2 = new Date(endDate ? endDate : dates[1]);
    
        const timeDifference = date2.getTime() - date1.getTime();
        const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
       
        setDays2(numberOfDays)
       
      };
      calculateDaysBetweenDates()
    },[startDate, endDate])
// console.log(dates)
    useEffect(()=>{
      const calculateDaysWhenDatesChange = () => {
        const date1 = new Date(startDate ? startDate : dates[0]);
        const date2 = new Date(endDate ? endDate : dates[1]);
        const timeDifference = date2.getTime() - date1.getTime();
        const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

        setDays(numberOfDays)
       
      };
      calculateDaysWhenDatesChange()
    },[dates])

    const onStartDateChange = (value, dateString) => {
      handleClearStore()
        setStartDate(dateString)
      };


      const onEndDateChange = (value, dateString) => {
        handleClearStore()
        setEndDate(dateString)
      };
    
      const onOk = (value) => {
        console.log("onOk: ", value);
      };

      const disabledDate = current => {
        return current && current <= moment().endOf('day');
      };

      useEffect(()=>{
    const getRoomData = async (e) => {
        const roomsData = await axios.get(`/hotels/${hotelId}/roomAvailabilitySummary?startDate=${dates[0]}&endDate=${dates[1]}&sourceType=${sourceType}`);
    
        const combinedRooms = [];
        for (const room of roomsData.data) {
          const [roomImage] = hotelData[0].roomTypeImages.filter((hotel) => hotel.roomTypeId == room.roomTypeId);
    
          if (roomImage) {
            combinedRooms.push({ ...room, ...roomImage });
          } else {
            combinedRooms.push({ ...room, roomTypePicture: null });
          }
        }
    
        setAllHotelRooms(combinedRooms);
      };
    getRoomData()
  },[hotelData])

  // console.log("allroomData", allHotelRooms)

  return (
    <>
    <div className='container dateFieldSelect'>
      {/* <div className='changeDateDiv'> */}
      <div className='row  p-4' style={{opacity:'0.9', background:'#006CD9', zIndex:'-1'}}>
        <div className='col-md-5 mb-3'>
          <label htmlFor='exampleInputEmail1' className='form-label' style={{color:'whitesmoke'}}>
            Check-in date
          </label>
          <DatePicker
            allowClear={false}
            className='form-control form-control-lg datePicj'
            defaultValue={dayjs(dates[0], dateFormat)}
            onChange={onStartDateChange}
            showToday={false}
            onOk={onOk}
            format={dateFormat}
            // style={{zIndex:'10000'}}
          />
        </div>

        <div class='col-md-5'>
          <label htmlFor='exampleInputEmail1' className='form-label' style={{color:'whitesmoke'}}>
            Check-out date
          </label>
          <DatePicker
            allowClear={false}
            className='form-control form-control-lg'
            defaultValue={dayjs(dates[1], dateFormat)}
            onChange={onEndDateChange}
            onOk={onOk}
            disabledDate={disabledDate}
            showToday={false}
            format={dateFormat}   
          />
        </div>

        <div className='col-md-2' style={{display:'flex', alignItems:"center", justifyContent:'center'}}>
            <button className='btn btn-primary  mainBtn2' style={{width:'100%', background:'#222', color:"whitesmoke"}}>
                  Check Available Rooms
            </button>
        </div>
      </div>

      {/* <Button text={'click me'} /> */}
      
    </div>
    {
      allHotelRooms.length < 1 ? null :  <Room_Selection allHotelRooms={allHotelRooms} dates={dates} days={days} days2={days2} hotelData={hotelData}/>
    }
   
    </>
  );
}

export default connect(null, {
  handleClearStore
})(Select_Date)