import React,{useState, useEffect} from "react";
import axios from '../../Utilities/axios'
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { PaystackButton } from "react-paystack";
import './Room_CartSumary.css'
import { connect } from "react-redux";
import {
  handleAddToCart,
  handleClearStore,
  GetCartData,
  handleRemoveFromCart,
  handleAdjustQty
} from '../../Redux/Actions/room_actions';
import { AiFillDelete } from 'react-icons/ai';
import {FaMoneyBillWave} from 'react-icons/fa'

const Room_CartSumary = ({storeItems, totalAmount, handleAdjustQty, handleRemoveFromCart, days, days2, dates, hotelData}) => {
  const [submitted, setSubmitted] = useState(false);
  const [payingGuest, setPayingGuest] = useState();
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      gender: "",
      guestTitle: "",
      address: "",
      tipTopGoGuestId: null,
      guestId: null,
      sourceType: "companySite",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(3, "first name must be more")
        .required("first name is Required"),
      lastName: Yup.string()
        .min(3, "last name is require")
        .required("last name is Required"),

      email: Yup.string()
        .email("invalid email address")
        .required("Email is Required"),
      phoneNumber: Yup.string()
        .matches(/^[0-9]*$/, "Phone number must only contain numbers")
        .max(14, "Must be 14 characters")
        .required("Phone number is required"),

      //  password: Yup.string().min(6, "password must be 6 characters").required("password is Required"),
      // country: Yup.string().max("please enter your country").required("country is Required"),
      guestTitle: Yup.string()
        .max(6, "please enter your title")
        .required("title is Required"),
      gender: Yup.string()
        .max(6, "please enter your gender")
        .required("gender is Required"),
      address: Yup.string()
        .max(100, "please enter your address")
        .required("address is Required"),
    }),

    onSubmit: async (values) => {
      setSubmitted(true);
      // setSubmitting(false);
      setPayingGuest(values);
    },
  });

  // const cancelBookingProcess = () => {
  //   formik.values.address = "";
  //   formik.values.phoneNumber = "";
  //   formik.values.email = "";
  //   formik.values.guestTitle = "";
  //   formik.values.firstName = "";
  //   formik.values.lastName = "";
  //   formik.values.gender = "";
  //   setSubmitted(false);
  //   handleClearStore();
  // };
  // const bookArr = [];
  //   for (const book of storeItems && storeItems) {
  //     bookArr.push({ ...book, quantity: book.qty });
  //   }


  // const handlePaystackSuccessAction = async (reference) => {
  //   const allBookingDetails = {
  //     payingGuest,
  //     paymentReference: reference.reference,
  //     totalBill: totalAmount,
  //     paymentType: 'paystack',
  //     showBreakfastLabel: false,
  //     breakfastCost: 0,
  //     reservationType: 'booked',
  //     hotelName: hotelData[0].hotelName,
  //     hotelId: hotelData[0].hotelId,
  //     numOfDays: days,
  //     checkInDate: dates[0],
  //     checkOutDate: dates[1],
  //     guestId: null,
  //     bookingStatus: 'unprocessed',
  //     referralName: 'companySite',
  //     sourceType: 'companySite',
  //     includeBreakfast: '1 breakfast',
  //     bookingId: 'qMOuBxyiSPXXkwGOKVNmHn8V',
  //     bookings: bookArr,
  //     paymentDetails: [
  //       {
  //         paymentType: 'cash',
  //         amount: totalAmount,
  //         bankName: 'Select a Bank',
  //         transactionId: '',
  //         managerName: '',
  //         referenceNumber: '',
  //         creditId: ''
  //       }
  //     ]
  //   };
  //   const notify = (res) => {
  //     let bookCode = res.data.bookingCode;
  //     console.log("allbook", allBookingDetails)
  //     setTimeout(() => {
  //       navigate('/', {
  //         state: {
  //           // allBookingDetails: allBookingDetails,
  //           // // roomTypes: roomTypes,
  //           // bookCode: bookCode
  //         }
  //       });
  //     }, 3000);
  //   };
  //   console.log("allbook", allBookingDetails)
  //   await axios
  //     .post('/guests/makeWebReservation', allBookingDetails)
  //     .then((res) => {
  //       // notify(res);
  //       // console.log('ress from backend', res);
  //       notify(res);
  //       handleClearStore();
  //     })
  //     .catch((err) => console.log('the booking wasnt successfull'));
  // };

  // const handlePaystackCloseAction = () => {
  //   // implementation for  whatever you want to do when the Paystack dialog closed.
  //   console.log("closed");
  // };

  // const config = {
  //   reference: new Date().getTime().toString(),
  //   email: formik.values.email,
  //   amount: totalAmount * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
  //   // publicKey: 'pk_test_573cca83eaa8a37b2ac10bd98015fde5b4fe4df3',
  //   publicKey: "pk_test_1a009b53638d9550b7b51fcab8ef964d1d9fa171", // personal key
  //   // publicKey: 'pk_live_b3304b8274925a6dd5479dc6972a3ce6adde2396'
  // };

  // const componentProps = {
  //   ...config,
  //   text: "Pay Now",
  //   onSuccess: (reference) => handlePaystackSuccessAction(reference),
  //   onClose: handlePaystackCloseAction,
  //   // setReference(reference),
  // };

  const onChangeHandler = (e, storeItem) => {
    // setQuantity(e.target.value);
    handleAdjustQty(storeItem.roomTypeId, e.target.value);
    if (storeItem.availableRooms < e.target.value) {
      handleAdjustQty(storeItem.roomTypeId,  e.target.value);
      handleAdjustQty(storeItem.roomTypeId, storeItem.availableRooms);
    } 
  };


  return (
    <div>
      <div className='card border-success mb-3'>
        <div className='card-header bg-transparent border-success'>
          Selected Room Details
        </div>

        {
          storeItems && storeItems.map((storeItem)=>(
            <div className='card-body'>
          <h5 className='card-title'>{storeItem.roomTypeName}</h5>
          <p className='card-text'>
            <ul className='list-group'>
              <li className='list-group-item d-flex justify-content-between align-items-center'>
                Amount
                <span className='badge bg-success p-2 rounded-pill'>
                  &#8358; {storeItem.roomCost.toLocaleString()}
                </span>
              </li>
              <li className='list-group-item d-flex justify-content-between align-items-center'>
                Quantity
                <span className='badge bg-success rounded-pill'>{storeItem.qty}</span>
              </li>
              <li className='list-group-item d-flex justify-content-between align-items-center'>
                Number of days
                <span className='badge bg-success rounded-pill'>{storeItem.lengthOfStay}</span>
              </li>
              <li className='list-group-item d-flex justify-content-between align-items-center'>
                Add Quantity
                <span className='badge badge2 rounded-pill'>
                  <input
                    type='number'
                    className='form__'
                    id='exampleInputEmail1'
                    aria-describedby='emailHelp'
                    value={storeItem.changeQty}
                    onChange={(e) =>
                      onChangeHandler(
                        e,
                        storeItem,
                      )
                    }
                    min='1'
                    max='100'
                  />
                </span>
              </li>
              <li className='list-group-item d-flex justify-content-between align-items-center'>
                Remove Room
                <span className='badge del  rounded-pill'
                 onClick={() =>
                      handleRemoveFromCart(
                        storeItem.roomTypeId,
                     
                      )
                            }>
                  <AiFillDelete />
                </span>
              </li>
              
              {
                storeItem.changeQty >= storeItem.availableRooms ? <span
                className='error'
                style={{ color: "red", fontSize: "0.6em" }}
              >
               <p > OOP!! The Quantity you entered is more than availableRooms{" "}</p>
              </span> : null
              }

              
            </ul>
          </p>
          <div className='card-header bg-transparent border-success'></div>
        </div>
          ))
        }
        

        <div className='card-header bg-transparent border-success'></div>

        <div className='card-body '>
          <p className='card-text'>
            <ul className='list-group'>
              <li className='list-group-item d-flex justify-content-between align-items-center'>
                Total Bill
                <span
                  className='badge bg-dark p-2'
                  style={{ fontSize: "1.5em" }}
                >
                  {" "}
                  &#8358; {totalAmount.toLocaleString()}
                </span>
              </li>
            </ul>
          </p>
        </div>
        <div className='card-footer bg-transparent border-success '>
          <button
            className='btn btn-primary shadow-none col-md-12 '
            data-dismiss='modal'
            data-bs-toggle='modal'
            data-bs-target='#exampleModalToggle2'
            disabled={totalAmount === 0 ? true : false}
          >
            Proceed To Payment
          </button>
        </div>
      </div>

      {/* first modal */}
    </div>
  );
};

export default connect(null, {
  handleAdjustQty,
  handleRemoveFromCart
})(Room_CartSumary);
