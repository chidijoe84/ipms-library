import React from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { PaystackButton } from 'react-paystack';

const ModalPay = () => {

    const formik = useFormik({
        initialValues: {
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          gender: '',
          guestTitle: '',
          address: '',
          tipTopGoGuestId: null,
          guestId: null,
          sourceType: 'companySite'
        },
        validationSchema: Yup.object({
          firstName: Yup.string()
            .min(3, 'first name must be more')
            .required('first name is Required'),
          lastName: Yup.string()
            .min(3, 'last name is require')
            .required('last name is Required'),
    
          email: Yup.string()
            .email('invalid email address')
            .required('Email is Required'),
            phoneNumber: Yup.string()
            .matches(/^[0-9]*$/, 'Phone number must only contain numbers')
            .max(14, 'Must be 14 characters')
            .required('Phone number is required'),
    
          //  password: Yup.string().min(6, "password must be 6 characters").required("password is Required"),
          // country: Yup.string().max("please enter your country").required("country is Required"),
          guestTitle: Yup.string()
            .max(6, 'please enter your title')
            .required('title is Required'),
          gender: Yup.string()
            .max(6, 'please enter your gender')
            .required('gender is Required'),
          address: Yup.string()
            .max(100, 'please enter your address')
            .required('address is Required')
        }),
    
        onSubmit: async (values) => {
          // setSubmitted(true);
          // setSubmitting(false);
          // setPayingGuest(values);
        }
      });

      const handlePaystackSuccessAction = async (reference) => {
        // Implementation for whatever you want to do with reference and after success call.
    
        // setReference(reference);
        // const allBookingDetails = {
        //   payingGuest,
        //   paymentReference: reference.reference,
        //   totalBill: totalAmount,
        //   paymentType: 'paystack',
        //   showBreakfastLabel: false,
        //   breakfastCost: 0,
        //   reservationType: 'booked',
        //   hotelName: roomTypes.hotelName,
        //   hotelId: roomTypes.hotelId,
        //   numOfDays: days,
        //   checkInDate: dates[0],
        //   checkOutDate: dates[1],
        //   guestId: null,
        //   bookingStatus: 'unprocessed',
        //   referralName: 'companySite',
        //   sourceType: 'companySite',
        //   includeBreakfast: '1 breakfast',
        //   bookingId: 'qMOuBxyiSPXXkwGOKVNmHn8V',
        //   bookings: bookArr,
        //   paymentDetails: [
        //     {
        //       paymentType: 'cash',
        //       amount: totalAmount,
        //       bankName: 'Select a Bank',
        //       transactionId: '',
        //       managerName: '',
        //       referenceNumber: '',
        //       creditId: ''
        //     }
        //   ]
        // };
        // console.log('bookingValue', allBookingDetails);
    
        // const notify = (res) => {
        //   toast.success(res.data.message, {
        //     position: 'top-right',
        //     autoClose: 3000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: 'dark'
        //   });
    
        // //   let bookCode = res.data.bookingCode;
    
        // //   setTimeout(() => {
        // //     Navigate('/template-1/bookingSummary', {
        // //       state: {
        // //         allBookingDetails: allBookingDetails,
        // //         roomTypes: roomTypes,
        // //         bookCode: bookCode
        // //       }
        // //     });
        // //   }, 3000);
        // };
    
        // await axios
        //   .post('/guests/makeWebReservation', allBookingDetails)
        //   .then((res) => {
        //     // notify(res);
        //     // console.log('ress from backend', res);
        //     notify(res);
        //     handleClearStore();
        //   })
        //   .catch((err) => console.log('the booking wasnt successfull'));
          
      };

      const handlePaystackCloseAction = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed');
      };

      const config = {
        reference: new Date().getTime().toString(),
        email: formik.values.email,
        amount: totalAmount * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        // publicKey: 'pk_test_573cca83eaa8a37b2ac10bd98015fde5b4fe4df3',
        publicKey: 'pk_test_1a009b53638d9550b7b51fcab8ef964d1d9fa171' // personal key
        // publicKey: 'pk_live_b3304b8274925a6dd5479dc6972a3ce6adde2396'
      };

      const componentProps = {
        ...config,
        text: 'Pay Now',
        onSuccess: (reference) => handlePaystackSuccessAction(reference),
        onClose: handlePaystackCloseAction
        // setReference(reference),
      };
    
  return (
    <div
        className="modal fade"
        id="staticBackdrop2"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Here is your Booking details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container">
                <table className="table table-striped table-hover">
                  <thead>
                    {/* <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr> */}
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row"></th>
                      <td colspan="2">Name</td>
                      <td></td>
                      <td></td>
                      <td>
                        {formik.values.guestTitle} {formik.values.firstName}{' '}
                        {formik.values.lastName}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"></th>
                      <td colspan="2">Phone Number</td>
                      <td></td>
                      <td></td>
                      <td>{formik.values.phoneNumber}</td>
                    </tr>
                    <tr>
                      <th scope="row"></th>
                      <td colspan="2">Email</td>
                      <td></td>
                      <td></td>
                      <td>{formik.values.email}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">S/n</th>
                      <th scope="col">Room Type</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Price</th>
                      <th scope="col">Day(s)</th>
                      <th scope="col">Total Price</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                  
                   
                        <tr>
                          <th scope="row">{1}</th>
                          <td>Deluxe</td>
                          <td>X 5</td>
                          <td>
                            {' '}
                            &#8358; 5000
                          </td>
                          <td>8</td>
                          <td>
                            {' '}
                            &#8358;{' '}
                            3
                          </td>
                        </tr>
                
                    <tr>
                      <th scope="row"></th>
                      <td colspan="2">Total Payment:</td>

                      <td
                        colspan="3"
                        style={{ color: 'green', fontSize: '1.5em' }}
                      >
                        {' '}
                        &#8358; 10000
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              {/* <button type="button" class="btn btn-primary">Pay Now</button> */}
              <PaystackButton {...componentProps} className="btn btn-primary" />
            </div>
          </div>
        </div>
      </div>
  )
}

export default ModalPay