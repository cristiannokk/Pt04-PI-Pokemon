import React from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import LogoPokemon from "../../assets/LogoPokemon.jpeg";
import "./NavbarStyles.css";

export function NavBar() {
  return (
    <div class="nav-container">
      <div class="all-li">
        <div class="bot-nav">
          <Link to="/pokemons/" style={{ textDecoration: "inherit" }}>
            <li class="link-route">Home</li>
          </Link>
          <Link to="/create" style={{ textDecoration: "inherit" }}>
            <li class="link-route">Create</li>
          </Link>
          {/* <img class="logo-pokemon" src={LogoPokemon} alt="Pokemon App Logo" /> */}
        </div>
        <SearchBar />
      </div>
    </div>
  );
}
