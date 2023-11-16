import React from 'react'
import Select_HotelField from './Select_Hotel/Select_HotelField'
import Select_Date from './Select_Date/Select_Date'
import Room_Selection from './Room_List/Room_ListDisplay/Room_Selection'
import './HomeRoute.css'

const HomeRoutes = ({hotelGroups, hotelGroupName}) => {
  return (
    <div className='homeRoutesFile' style={{display:'flex', flexDirection:'column', justifyContent:'center', alignContent:'center'}}>
        <Select_HotelField hotelGroups={hotelGroups} hotelGroupName={hotelGroupName}/>
        {/* <Select_Date/> */}
        {/* <Room_Selection/> */}
    </div>
  )
}

export default HomeRoutes