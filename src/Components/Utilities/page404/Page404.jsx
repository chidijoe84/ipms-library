import React from "react";
import Navbar from "../../Components/hero/Navbar";
import Footer from "../../Components/Footer/Footer";

import "./Page404.css";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div>
      <Navbar />
      <div className='page404'>
        <div className="rightText">
          Oops! It seems like you've stumbled upon a page that doesn't exist or
          has been moved. The resource you are looking for might have been
          removed, had its name changed, or is temporarily unavailable.
        </div>
        <div className="t404">404</div>
        <div className="button"> <Link to='/'><button>Go to Home </button></Link></div>
        <div className="bouncing-div"></div>
        <div className="bouncing-div2"></div>
      </div>
      <Footer />
    </div>
  );
};

export default Page404;
