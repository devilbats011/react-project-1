import React from 'react'
import ReactLoading from 'react-loading';

function LoadingOverlay({type,color}) {
    return (
        <>
        <main className="loading-overlay-bg" >
        </main>
      <main className="loading-overlay d-flex flex-column justify-content-center align-items-center" >
            <ReactLoading type={type} color={color} height={110} width={150} />
            <h5 style={{color:"#fff",letterSpacing: "4px"}} >  LOADING  </h5>
      </main>
      </>
    )
}

export default LoadingOverlay
