import React from 'react'
import { Route, Routes } from 'react-router-dom'
import App from '../App'
import HomeRoutes from './HomeRoutes'
import Book_RoomBtn from './Book_RoomBtn/Book_RoomBtn'

const AppRoute = () => {
  
  return (
    <div>
         <Routes>
            <Route path="/" element={<Book_RoomBtn hotelGroupName={"Ontrac Hotel"} />} />
            <Route path='/room-booking' element={<HomeRoutes />}/>
        </Routes>
    </div>
  )
}

export default AppRoute