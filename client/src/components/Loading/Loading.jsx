import React from "react";
import imageLoading from "../../assets/ImageLoading.gif";
import "./LoadingStyles.css";
export function Loading() {
  return (
    <div className="loader-container">
      <img className="loading-img" src={imageLoading} alt="loaging" />
    </div>
  );
}
