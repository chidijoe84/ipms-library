import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingSkeleton = () => {
  return (
    <div className="mainForm" style={{display: 'flex', flexDirection: "row", alignItems: "center", justifyContent:"space-between"}}>
      <div className='form1' style={{marginBottom:"3%", marginTop:"3%"}}>
        <div className='room_type' style={{display: 'flex', flexDirection: "column", alignItems:"flex-start", justifyContent:"space-between"}}>
          <div className='book_img'>
            <Skeleton height={300} width={400} />
          </div>
          <div className='namediv'>
            <h3 className='roomNamePlc'>
              <Skeleton count={3} width={240} />
              <Skeleton width={100} style={{marginLeft:"2%", marginTop:"5%"}} />
            </h3>
          </div>
        </div>
      </div>

      <div className='form1' style={{marginBottom:"3%", marginTop:"3%"}}>
        <div className='room_type' style={{display: 'flex', flexDirection: "column", alignItems: "flex-start", justifyContent:"space-between"}}>
          <div className='book_img'>
            <Skeleton height={300} width={400} />
          </div>
          <div className='namediv'>
            <h3 className='roomNamePlc'>
              <Skeleton count={3} width={240} />
              <Skeleton width={100} style={{marginLeft:"2%", marginTop:"5%"}} />
            </h3>
          </div>
        </div>
      </div>

      <div className='form1' style={{marginBottom:"3%", marginTop:"3%"}}>
        <div className='room_type' style={{display: 'flex', flexDirection: "column", alignItems: "flex-start" , justifyContent:"space-between"}}>
          <div className='book_img'>
            <Skeleton height={300} width={400} />
          </div>
          <div className='namediv'>
            <h3 className='roomNamePlc'>
              <Skeleton count={3} width={240} />
              <Skeleton width={100} style={{marginLeft:"2%", marginTop:"5%"}} />
            </h3>
          </div>
        </div>
      </div>

      {/* <div className='form1' style={{marginBottom:"3%"}}>
        <div className='room_type' style={{display: 'flex', flexDirection: "row", alignItems: "center", justifyContent:"space-between"}}>
          <div className='book_img'>
            <Skeleton height={200} width={200} />
          </div>
          <div className='namediv'>
            <h3 className='roomNamePlc'>
              <Skeleton count={4} width={640} />
              <Skeleton width={100} style={{marginLeft:"5%", marginTop:"5%"}} />
            </h3>
          </div>
        </div>
      </div>

      <div className='form1'>
        <div className='room_type' style={{display: 'flex', flexDirection: "row", alignItems: "center", justifyContent:"space-between"}}>
          <div className='book_img'>
            <Skeleton height={200} width={200} />
          </div>
          <div className='namediv'>
            <h3 className='roomNamePlc'>
              <Skeleton count={4} width={640} />
              <Skeleton width={100} style={{marginLeft:"5%", marginTop:"5%"}} />
            </h3>
          </div>
        </div>
      </div> */}

      
    </div>
  );
};

export default LoadingSkeleton;
