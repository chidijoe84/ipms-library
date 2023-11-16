import React, {useState, useEffect} from 'react'
import * as Yup from "yup";
import { useFormik } from "formik";
import './Book_RoomBtn.css'
import { useNavigate } from 'react-router-dom'
import axios from '../Utilities/axios'
import HomeRoutes from '../HomeRoutes'
import {
  handleAddToCart,
  handleClearStore,
  GetCartData,
  handleRemoveFromCart,
  handleAdjustQty
} from '../Redux/Actions/room_actions';
import {FaMoneyBillWave} from 'react-icons/fa'
import { PaystackButton } from "react-paystack";
import Select_Date from '../Select_Date/Select_Date';
import Select_HotelField from '../Select_Hotel/Select_HotelField';
import moment from 'moment/moment';
import { connect } from 'react-redux';

const Book_RoomBtn = ({hotelGroupName, 
  // totalAmount,
   handleAdjustQty, 
   handleRemoveFromCart,
   handleClearStore
    }) => {
  const [hotelGroup, setHotelGroup] = useState([])
  const [submitted, setSubmitted] = useState(false);
  const [payingGuest, setPayingGuest] = useState();
  const [hotelName, setHotelName] = useState('')
  const [hotelId, setHotelId] = useState()
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [dates, setDates] = useState([])
  const navigate = useNavigate()
  const storeItems = GetCartData()
 const sourceType = "showInCompanySite" 

  const onClickBooking = async () => {
    const hotels = await axios.get(`/registrations/hotels?sourceType=${sourceType}&hotelGroupName=${hotelGroupName}`);
    setHotelGroup(hotels.data)
    handleClearStore();
  }

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

  const cancelBookingProcess = () => {
    formik.values.address = "";
    formik.values.phoneNumber = "";
    formik.values.email = "";
    formik.values.guestTitle = "";
    formik.values.firstName = "";
    formik.values.lastName = "";
    formik.values.gender = "";
    setSubmitted(false);
    handleClearStore();
  };

  const bookArr = [];
    for (const book of storeItems && storeItems) {
      bookArr.push({ ...book, quantity: book.qty });
    }
    const totalAmount = bookArr.reduce((accumulator, currentObject) => {
      return (accumulator + currentObject.totalCost);
    }, 0);

    const getHotelName = (hotelName, hotelId) =>{
      console.log("hotelName ==>",hotelName, hotelId)
      setHotelName(hotelName)
      setHotelId(hotelId)
    }

    const getBookingDateBookBtn = (dates, startDate, endDate) => {
      setDates(dates)
      setStartDate(startDate)
      setEndDate(endDate)
    }

  const handlePaystackSuccessAction = async (reference) => {
    const allBookingDetails = {
      payingGuest,
      paymentReference: reference.reference,
      totalBill: totalAmount,
      paymentType: 'paystack',
      showBreakfastLabel: false,
      breakfastCost: 0,
      reservationType: 'booked',
      hotelName: hotelName,
      hotelId: hotelId,
      numOfDays: storeItems[0].lengthOfStay,
      checkInDate:`${moment(startDate ? startDate : dates[0]).format('YYYY-MM-DD')} 15:00:00` ,
      checkOutDate: `${moment(endDate ? endDate : dates[1]).format('YYYY-MM-DD')} 13:00:00`,
      guestId: null,
      bookingStatus: 'unprocessed',
      referralName: 'companySite',
      sourceType: 'companySite',
      includeBreakfast: '1 breakfast',
      bookingId: 'qMOuBxyiSPXXkwGOKVNmHn8V',
      bookings: bookArr,
      paymentDetails: [
        {
          paymentType: 'cash',
          amount: totalAmount,
          bankName: 'Select a Bank',
          transactionId: '',
          managerName: '',
          referenceNumber: '',
          creditId: ''
        }
      ]
    };
    const notify = (res) => {
      let bookCode = res.data.bookingCode;
      // console.log("allbook", allBookingDetails)
      // setTimeout(() => {
        // navigate('/', {
        //   state: {
        //     // allBookingDetails: allBookingDetails,
        //     // // roomTypes: roomTypes,
        //     // bookCode: bookCode
        //   }
        // });
      // }, 3000);
    };
    await axios
      .post('/guests/makeWebReservation', allBookingDetails)
      .then((res) => {
        // notify(res);
        // console.log('ress from backend', res);
        notify(res);
       
      })
      .catch((err) => console.log('the booking wasnt successfull'));
  };

  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const config = {
    reference: new Date().getTime().toString(),
    email: formik.values.email,
    amount: totalAmount * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    // publicKey: 'pk_test_573cca83eaa8a37b2ac10bd98015fde5b4fe4df3',
    publicKey: "pk_test_1a009b53638d9550b7b51fcab8ef964d1d9fa171", // personal key
    // publicKey: 'pk_live_b3304b8274925a6dd5479dc6972a3ce6adde2396'
  };

  const componentProps = {
    ...config,
    text: "Pay Now",
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
    // setReference(reference),
  };

  const onChangeHandler = (e, storeItem) => {
    // setQuantity(e.target.value);
    handleAdjustQty(storeItem.roomTypeId, e.target.value);
    if (storeItem.availableRooms < e.target.value) {
      handleAdjustQty(storeItem.roomTypeId,  e.target.value);
      handleAdjustQty(storeItem.roomTypeId, storeItem.availableRooms);
    } 
  };

  
  
  return (
    <div >
      <div className='container buttonStyleFirst'>
    <button type="button" className="btn btn-outline-secondary firstButtonBook" data-bs-toggle="modal" data-bs-target="#exampleModalToggle" onClick={onClickBooking}>
        Book A Room
    </button>
</div>

<div className="modal fade" id="exampleModalToggle" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
    <div className="modal-xl modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalToggleLabel">Make a reservation now to secure your stay</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                {/* <HomeRoutes hotelGroups={hotelGroup} hotelGroupName={hotelGroupName}/> */}
                <Select_HotelField hotelGroups={hotelGroup} hotelGroupName={hotelGroupName} getHotelName={getHotelName} getBookingDateBookBtn={getBookingDateBookBtn}/>
            </div>
            {/* <div className="modal-footer">
                <button className="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">
                Proceed To Payment
                </button>
            </div> */}
        </div>
    </div>
</div>


<div className="modal fade" 
id="exampleModalToggle2" 
aria-hidden="true"  
data-bs-backdrop="static" 
data-bs-keyboard="false"  
aria-labelledby="exampleModalToggleLabel"
 tabindex="-1"
 >
      <div className="modal-dialog modal-l">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalToggleLabel">please fill the form</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form onSubmit={formik.handleSubmit}>
                <div className='container-fluid'>
                  <div className='row'>
                    <div className='mb-3 col-md-6'>
                      <label
                        htmlFor='exampleInputEmail1'
                        className='form-label'
                      >
                        Title
                      </label>
                      <select
                        className={`form-control form-select ${
                          formik.touched.guestTitle && formik.errors.guestTitle ? 'is-invalid' : ''
                        }`}
                        aria-label='Default select example'
                        name='guestTitle'
                        id='guestTitle'
                        value={formik.values.guestTitle}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option selected disabled value={""}>
                          {" "}
                          select title
                        </option>
                        <option id='Mr' value='Mr'>
                          Mr
                        </option>
                        <option id='Mrs' value='Mrs'>
                          Mrs
                        </option>
                        <option id='Dr' value='Dr'>
                          Dr
                        </option>
                        <option id='Chief' value='Chief'>
                          Chief
                        </option>
                      </select>
                      {formik.touched.guestTitle && formik.errors.guestTitle ? (
                        <p className='error'>{formik.errors.guestTitle}</p>
                      ) : null}
                    </div>

                    <div className='mb-3 col-md-6'>
                      <label
                        htmlFor='exampleInputEmail1'
                        className='form-label'
                      >
                        Gender
                      </label>
                      <select
                        className={`form-control form-select ${
                          formik.touched.gender && formik.errors.gender ? 'is-invalid' : ''
                        }`}
                        aria-label='Default select example'
                        name='gender'
                        id='gender'
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option selected disabled value={""}>
                          select gender
                        </option>
                        <option id='Male' value='Male'>
                          Male
                        </option>
                        <option id='Female' value='Female'>
                          Female
                        </option>
                      </select>
                      {formik.touched.gender && formik.errors.gender ? (
                        <p className='error'>{formik.errors.gender}</p>
                      ) : null}
                    </div>
                  </div>

                  <div className='row'>
                    <div className='mb-3 col-md-6'>
                      <label
                        htmlFor='exampleInputEmail1'
                        className='form-label'
                      >
                        First Name
                      </label>
                      <input
                        type='text'
                        className={`form-control ${
                          formik.touched.firstName && formik.errors.firstName ? 'is-invalid' : ''
                        }`}
                        aria-describedby='emailHelp'
                        name='firstName'
                        id='firstName'
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.firstName && formik.errors.firstName ? (
                        <p className='error'>{formik.errors.firstName}</p>
                      ) : null}
                    </div>
                    <div className='mb-3 col-md-6'>
                      <label
                        htmlFor='exampleInputEmail1'
                        className='form-label'
                      >
                        Last Name
                      </label>
                      <input
                        type='text'
                        className={`form-control ${
                          formik.touched.lastName && formik.errors.lastName ? 'is-invalid' : ''
                        }`}
                        aria-describedby='emailHelp'
                        name='lastName'
                        id='lastName'
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.lastName && formik.errors.lastName ? (
                        <p className='error'>{formik.errors.lastName}</p>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className='mb-3'>
                  <label htmlFor='exampleInputEmail1' className='form-label'>
                    Email address
                  </label>
                  <input
                    type='email'
                    className={`form-control ${
                      formik.touched.email && formik.errors.email ? 'is-invalid' : ''
                    }`}
                    aria-describedby='emailHelp'
                    name='email'
                    id='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <p className='error'>{formik.errors.email}</p>
                  ) : null}

                  <div id='emailHelp' className='form-text'>
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className='mb-3'>
                  <label htmlFor='exampleInputPassword1' className='form-label'>
                    Phone Number
                  </label>
                  <input
                    type='tel'
                    className={`form-control ${
                      formik.touched.phoneNumber && formik.errors.phoneNumber ? 'is-invalid' : ''
                    }`}
                    name='phoneNumber'
                    id='phoneNumber'
                    placeholder="0813872903"
                    value={formik.values.phoneNumber.trim()}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                    <p className='error'>{formik.errors.phoneNumber}</p>
                  ) : null}
                </div>
                <div className='mb-3'>
                  <label htmlFor='exampleInputPassword1' className='form-label'>
                    Address
                  </label>
                  <div className='form-floating'>
                    <textarea
                      className={`form-control ${
                        formik.touched.address && formik.errors.address ? 'is-invalid' : ''
                      }`}
                      placeholder='Leave a comment here'
                      name='address'
                      id='address'
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      style={{ height: "100px" }}
                    ></textarea>
                    <label htmlFor='floatingTextarea2'>Address</label>
                  </div>
                  {formik.touched.address && formik.errors.address ? (
                    <p className='error'>{formik.errors.address}</p>
                  ) : null}
                </div>

               
                <div className='modal-footer'>
                  <button
                    type='button'
                    className='btn btn-secondary'
                    data-bs-dismiss='modal'
                    onClick={cancelBookingProcess}
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='btn btn-primary'
                    data-bs-toggle={submitted ? "modal" : ""}
                    data-bs-target='#bookingSummaryModal '
                    // data-dismiss='modal'
                  >
                    Submit
                  </button>
                </div>
              </form>
      </div>
      
    </div>
  </div>
</div>

<div className="modal fade" id="bookingSummaryModal" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
    <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalToggleLabel">Here is your booking summary</h1>
                <button type="button" onClick={cancelBookingProcess} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className='modal-body'>
              <div className='container'>
                <table className='table table-striped table-hover'>
                  <thead>
                   
                  </thead>
                  <tbody>
                    <tr>
                      <th scope='row'></th>
                      <td colspan='2'>Name</td>
                      <td></td>
                      <td></td>
                      <td>
                        {formik.values.guestTitle} {formik.values.firstName}{" "}
                        {formik.values.lastName}
                      </td>
                    </tr>
                    <tr>
                      <th scope='row'></th>
                      <td colspan='2'>Phone Number</td>
                      <td></td>
                      <td></td>
                      <td>{formik.values.phoneNumber}</td>
                    </tr>
                    <tr>
                      <th scope='row'></th>
                      <td colspan='2'>Email</td>
                      <td></td>
                      <td></td>
                      <td>{formik.values.email}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className=''>
                <table className='table'>
                  <thead>
                    <tr>
                      <th scope='col'>S/n</th>
                      <th scope='col'>Room Type</th>
                      <th scope='col'>Quantity</th>
                      <th scope='col'>Price</th>
                      <th scope='col'>Day(s)</th>
                      <th scope='col'>Total Price</th>
                    </tr>
                  </thead>
                  <tbody className='table-group-divider'>
                  {storeItems &&
                        storeItems.map((selections, i) => (
                          <tr>
                            <th scope='row'>{i + 1}</th>
                            <td>{selections.roomTypeName}</td>
                            <td>X {selections.qty}</td>
                            <td>
                              {" "}
                              &#8358; {selections.roomCost.toLocaleString()}
                            </td>
                            <td>{selections.lengthOfStay}</td>
                            <td>
                              {" "}
                              &#8358;{" "}
                              {(
                                selections.totalCost * selections.lengthOfStay
                              ).toLocaleString()}
                            </td>
                          </tr>
                        ))}

                    <tr>
                      <th scope='row'></th>
                      <td colspan='2'>Total Payment:</td>

                      <td
                        colspan='3'
                        style={{ color: "green", fontSize: "1.5em" }}
                      >
                        {" "}
                        &#8358; {(totalAmount * storeItems[0]?.lengthOfStay).toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
                onClick={cancelBookingProcess}
              >
                Cancel
              </button>
              <button
                  type='button'
                  disabled={totalAmount === 0 ? true : false}
                  class='btn btn-primary'
                  data-bs-dismiss='modal'
                >
                  <FaMoneyBillWave style={{fontSize:'1.5em'}} />
                  <PaystackButton {...componentProps} className='payNow' />
                </button>
            </div>
        </div>
    </div>
</div>

    </div>
    
  )
}
   

export default connect(null,{handleClearStore})(
  Book_RoomBtn
);