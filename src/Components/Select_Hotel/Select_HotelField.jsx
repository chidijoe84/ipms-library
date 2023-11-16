import React, {useState, useEffect} from 'react'
import axios from '../Utilities/axios'
import './Select_HotelField.css'
import Select_Date from '../Select_Date/Select_Date'
import { useLocation } from 'react-router-dom'
import { handleClearStore } from '../Redux/Actions/room_actions';
import { connect } from 'react-redux'

const Select_HotelField = ({
  handleClearStore, 
  hotelGroups,
  hotelGroupName,
  getHotelName,
  getBookingDateBookBtn
}) => {
  const [showDateField, setShowDateField] = useState(false)
  // const [hotelGroups, setHotelGroup] = useState([])
  const [hotelName, setHotelName] = useState('')
  const [hotelId, setHotelId] = useState()
  const [singleHotel, setSingleHotel] = useState()
  const history = useLocation()
  const sourceType = "showInCompanySite"
  // const hotelGroupName = history.state.hotelGroupName
  useEffect(()=>{
    // setHotelGroup(history.state.hotelGroup)
  },[history])

  
  const onHotelChange = (event) => {
    const selectedHotelId = event.target.value;
    const selectedHotel = hotelGroups.find((hotel) => hotel.hotelId === selectedHotelId);
    const selectedHotelName = selectedHotel ? selectedHotel.hotelName : '';
    setHotelName(selectedHotelName)
    getHotelName(selectedHotelName, selectedHotelId)
    setHotelId(selectedHotelId)
  };   

  const getHotelRoom = async (event) =>{
    // console.log("value", value)
    event.preventDefault();
    // setIsLoading(true);
    // setShowDateDiv(true)
    handleClearStore()
    const hotelsLocation = await axios.get(`/registrations/hotels?genFilter=${hotelName}&sourceType=${sourceType}&hotelGroupName=${hotelGroupName}`);
    const realData = hotelsLocation.data;
    console.log("realData", realData)
    setSingleHotel(realData)
    // setIsLoading(false);
    setShowDateField(true)
  }

  const getBookingDate = (dates, startDate, endDate) => {
    getBookingDateBookBtn(dates, startDate, endDate)
    // console.log("getBookingDate",dates)
    // console.log("startDate",startDate)
    // console.log("endDate",endDate)
  }
 
  
  return (
    <div className='hotelFieldDiv'>
    <div className='separatDiv'>
    <div className='container hotelFieldSelect'  >
      {/* <div className='welcomIpms'>
        <p>Welcome To <span className='ipmsStyle'> IPMS</span> <br/> Your Intelligent Property <br/> <span className='styleManage'>management System</span> Gate Way</p> 
        </div> */}
        <div className="row"  >
            <div className="col-md-9" style={{display:'flex', alignItems:"center", justifyContent:'center'}} >
                <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" onChange={onHotelChange} style={{ height:'72%', marginTop:'2%'}}>
                    <option selected>Open this select menu</option>
                    {hotelGroups && hotelGroups.map((hotel, i) => (
                    <option
                      value={`${hotel.hotelId}`}
                      key={hotel.hotelId}
                      style={{ fontSize: "1em" }}
                    >
                      {hotel.hotelName}
                    </option>
                  ))}
                    
                </select>
            </div>
            <div className="col-md-3" style={{display:'flex', alignItems:"center", justifyContent:'center'}}>
            <button
             type="button" 
            className= {hotelName === '' ? 'disabledBtn' : "btn btn-outline-secondary mainBtn" }
             onClick={(event)=>getHotelRoom(event)} 
             disabled={hotelName === '' ? true : false}
             style={{width:'80%'}}
              >Get Hotel Rooms</button>
            </div>
      </div>
      
    </div>
    </div>
    {
      showDateField && showDateField ? <Select_Date hotelId={hotelId} hotelData={singleHotel} getBookingDate={getBookingDate} /> : null
    }
    </div>
  )
}

export default connect(null, {
  handleClearStore
})(Select_HotelField)