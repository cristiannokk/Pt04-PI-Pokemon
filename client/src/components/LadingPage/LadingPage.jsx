import React from "react";
import { Link } from "react-router-dom";
import "./LadingStyles.css";
import imgLanding from "../../assets/IMAGE_LANDING_PNG.png";

export function LandingPage() {
  return (
    <div class="landing-container">
      <section class="content">
        <h1 class="title">¿Listo para conocer más sobre tu Pokémon ?</h1>
        <Link to="/pokemons/index">
          <button class="btn">¡Hazlo ahora!</button>
        </Link>
      </section>
      <img class="img" src={imgLanding} alt="landing" />
    </div>
  );
}
