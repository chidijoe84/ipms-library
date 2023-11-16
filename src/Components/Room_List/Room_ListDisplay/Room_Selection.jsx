import React,{useState, useEffect} from "react";
import Room_CartSumary from "../Room_CartSumary/Room_CartSumary";
import {
  handleAddToCart,
  handleClearStore,
  GetCartData,
  handleRemoveFromCart,
  handleAdjustQty
} from '../../Redux/Actions/room_actions';
import { connect } from "react-redux";
import './Room_Selection.css'

const Room_Selection = ({
  allHotelRooms,
  days,
  days2, 
  dates,
  hotelData,
  handleAddToCart,
  handleClearStore,
  handleRemoveFromCart,
  handleAdjustQty,
  totalBills}) => {

    
    
    const storeItems = GetCartData()
    const sendDataToStore = (room) =>{
      // console.log("room", room)
      handleAddToCart({
        ...room,
        type: 'room',
        price: room.roomCost,
        // addqty: setQuantity(1),
        lengthOfStay: days2 ? days2 : days
      });
    }


  let totalAmount;
  let numOfDays = days2 ? days2 : days;
  totalAmount = totalBills * numOfDays;
  return (
    <div className='container '>
      <div className='row '>
        
            <div className='col-md-9'>
            { allHotelRooms && allHotelRooms.map((room)=>(
          <div className='card mb-3 shadow'>
            <div className='row g-0'>
              <div className='col-md-4'>
                <img
                  src={room.roomTypePicture}
                  className='img-fluid rounded-start'
                  style={{ height: "100%" }}
                  alt='...'
                />
              </div>
              <div className='col-md-8'>
                <div className='card-body'>
                  <h5 className='card-title mb-3 border-bottom pb-1'>{room.roomTypeName}</h5>
                  <p>
                    <span style={{ fontWeight: "700", fontSize: "1.3em" }}>
                    &#8358;{room.roomCost.toLocaleString()}
                    </span>{" "}
                    <span className='perNight' style={{ fontSize: "0.7em" }}>
                      / per night
                    </span>
                  </p>
                  <p
                    className='card-text'
                    style={{ fontSize: "0.8em", fontWeight: "200" }}
                  >
                    
                  </p>
                  <p className='card-text'>
                    <small className='text-body-secondary  '>
                      <ul className='list-group list-group-horizontal mt-4'>
                        <li className='list-group-item pt-3'>AC</li>
                        <li className='list-group-item pt-3'>Free Wifi</li>
                        <li className='list-group-item pt-3'>Table</li>
                        <li className='list-group-item pt-3'>Television</li>
                      </ul>
                    </small>
                  </p>
                     <div className="bookingButtonDiv">
                       <button
                            className="btn btn-primary shadow-none "
                            style={{
                              marginLeft: '10%',
                              fontSize: '1em',
                            }}
                            onClick={() => sendDataToStore(room)}
                          >
                            Select Room
                          </button>
                   </div>
                 
                </div>
              </div>
            </div>
          </div>
             ))
            }
        </div>
       
        
        <div className='col-md-3'>
          <Room_CartSumary
           storeItems={storeItems}
            totalAmount={totalAmount} 
            dates={dates} 
            days={days} 
            days2={days} 
            hotelData={hotelData}/>
        </div>
      </div>
    </div>
  );
};

const calcQuickTotal = (items) => {
  if (items) {
    return items.reduce((a, b) => {
      if (b.discountRate) {
        return a + b.qty * b.price; // NB: b.discountPrice
      } else {
        return a + b.qty * b.price;
      }
    }, 0);
  }
  return 0;
};

const mapStateToProps = (state) => {
  const cart = state.rootReducer.cart;
  return {
    totalBills: calcQuickTotal(state.rootReducer.cart),
    cart
  };
};

export default connect(mapStateToProps, {
  handleAddToCart,
  handleClearStore,
  handleRemoveFromCart,
  handleAdjustQty
})(Room_Selection)

// export default Room_Selection;
