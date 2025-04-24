import React from "react";
import Lottie from "react-lottie"; // Import Lottie component
import animationData from "../../assets/preloader.json"; // Import the Lottie JSON animation
import "./style.css";

const Preloader = () => {
  return (
    <div className="preloader-wrapper">
      <div className="preloader-content">
        <Lottie
          options={{
            animationData: animationData,
            loop: true,
            autoplay: true, // Starts animation immediately
          }}
          height={200} // Adjust the height of the animation
          width={200}  // Adjust the width of the animation
        />
        <h2 className="loading-text">MintCode is brewing...</h2>
      </div>
    </div>
  );
};

export default Preloader;
