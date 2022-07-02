import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pokemon } from "../Pokemon/Pokemon";
import {
  getAllPokemons,
  getTypes,
  resetDetail,
} from "../../redux/action.pokemons";
import { Loading } from "../Loading/Loading";
import "./AllPokemonsStyles.css";
import { Link } from "react-router-dom";

export function AllPokemon() {
  let dispatch = useDispatch();
  let allPokemon = useSelector((state) => state.backUp);
  let errorRender = useSelector((state) => state.errorRender);

  const [counterPokemon, setCounterPokemon] = useState(1);
  const [pokemonPerPage ] = useState(12);

  const lastPokemon = counterPokemon * pokemonPerPage; // 1 * 12 = 12
  const firstPoke = lastPokemon - pokemonPerPage; // 12 - 12 = 0
  //Indicador:
  const indexPages = Math.ceil(allPokemon.length / pokemonPerPage);

  const pokemonData = useSelector((state) =>
    state.backUp ? state.backUp.slice(firstPoke, lastPokemon) : false
  );

  const back = () => {
    if (counterPokemon !== 1) {
      setCounterPokemon(counterPokemon - 1);
    }
  };

  const next = () => {
    if (counterPokemon !== indexPages) {
      setCounterPokemon(counterPokemon + 1);
    }
  };

  const begin = () => {
    setCounterPokemon(1);
  };

  const end = () => {
    setCounterPokemon(indexPages);
  };

  if (counterPokemon > indexPages) {
    back();
  }

  useEffect(() => {
    dispatch(resetDetail());
    dispatch(getAllPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  if (errorRender.length === 0) {
    return (
      <div>
        <Loading />
      </div>
    );
  } else {
    return (
      <div>
        <div class="main-pokemons-card">
          {pokemonData.length === 0 ? (
            <p className="sinPokemon">No se encontraron Pokémones con estas caracteristicas.</p>
          ) : (
            pokemonData.map((p, index) => (
              <Link key={index} to={"/pokemons/" + p.id} class= "linked">
                <Pokemon
                  key={index}
                  name={p.name}
                  types={p.types}
                  image={p.image}
                  hp={p.hp}
                  defense={p.defense}
                  speed={p.speed}
                  id={p.id}
                />
              </Link>
            ))
          )}
        </div>
        <div class="pagination">
          {pokemonData.length !== 0 ? (
            <div class="pagination-buttons">
              <button class="pagination-button" onClick={begin}>
                {" "}
                {"<<"}{" "}
              </button>
              <button class="pagination-button" onClick={back}>
                {" "}
                {"<"}{" "}
              </button>
              <p className="pagination-counter">
                {counterPokemon} de {indexPages}
              </p>
              <button class="pagination-button" onClick={next}>
                {" "}
                {">"}{" "}
              </button>
              <button class="pagination-button" onClick={end}>
                {" "}
                {">>"}{" "}
              </button>
            </div>
          ) : (
            <p> </p>
          )}
        </div>
      </div>
    );
  }
}
