import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/action.pokemons";
import imgError from "../../assets/error_sad.gif";
import "./ErrorAlerStyles.css";

export function ErrorAlert({ msg = "Error. Return to home.", code }) {
  const dispatch = useDispatch();

  function handleGoHome() {
    dispatch(setLoading(true));
  }

  return (
    <div className="error_container">
      <img className="gifPikachu" src={imgError} alt="img error" />
      <span className="errorCode">{code}</span>
      <p className="error">Error</p>
      <span className="spanError">{msg}</span>
      <div onClick={handleGoHome()}>
        <Link to="/pokemons/">
          <button className="btn-goHome">Go to the main page.</button>
        </Link>
      </div>
    </div>
  );
}
