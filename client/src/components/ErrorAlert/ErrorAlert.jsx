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
    <div class="error_container">
      <img class="gifPikachu" src={imgError} alt="img error" />
      <span>{code}</span>
      <p class="error">Error</p>
      <span class="spanError">{msg}</span>
      <div onClick={handleGoHome()}>
        <Link to="/pokemons/index">
          <button class="btn-goHome">Ir a la pagina principal.</button>
        </Link>
      </div>
    </div>
  );
}
