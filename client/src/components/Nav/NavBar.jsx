import React from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
// import LogoPokemon from "../../assets/LogoPokemon.jpeg";
import "./NavbarStyles.css";

export function NavBar() {
  return (
    <div className="nav-container">
      <div className="all-li">
        <div className="bot-nav">
          <Link to="/pokemons/" style={{ textDecoration: "inherit" }}>
            <li className="link-route">Home</li>
          </Link>
          <Link to="/create" style={{ textDecoration: "inherit" }}>
            <li className="link-route">Create</li>
          </Link>
          {/* <img className="logo-pokemon" src={LogoPokemon} alt="Pokemon App Logo" /> */}
        </div>
        <SearchBar />
      </div>
    </div>
  );
}
