import React from "react";
import "./PokemonStyles.css";

export function Pokemon({ image, name, types }) {
  return (
    <div class="card-pokemon-container" key={name}>
      <div>
        <img
          class="poke-img"
          src={image || "https://imgur.com/fOOL1IV"}
          alt="Imagen del Pokemon."
        />
      </div>
      <h3 class="poke-name">{name}</h3>
      <div>
        <h4 class="poke-types">
          {typeof types[0] === 'string' ? types[0] : types[0]?.name.charAt() + types[0].name.slice(1)}   
          {typeof types[1] === 'string' ? " - " + types[1]  : types[1]?.name  }
        </h4>
      </div>
    </div>
  );
}
