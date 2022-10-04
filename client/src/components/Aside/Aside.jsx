import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByOrigin,
  filterByTypes,
  orderByName,
  orderByAttack,
  resetDetail,
} from "../../redux/action.pokemons";
import "./AsideStyles.css";

export function Aside() {
  const [, setOrder] = useState("");
  const [, setTypes] = useState("allPokemon");

  const dispatch = useDispatch();
  const totalTypes = useSelector((state) => state.types);
  // const totalPokemon = useSelector((state) => state.pokemons);

  useEffect(() => {
    dispatch(resetDetail());
  }, [dispatch]);

  //Funcion de reseteo a los filtros/orden:
  function handleReset() {
    window.location.reload();
  }

  //Filtrado por el origen
  function handleFilterOrigin(e) {
    e.preventDefault();
    dispatch(filterByOrigin(e.target.value));
  }

  //Filtro por los Typos:
  function handleFilterByTypes(e) {
    e.preventDefault();
    dispatch(filterByTypes(e.target.value));
    setTypes(e.target.value);
  }

  //Orden alfebetico:
  function handleFilterName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setOrder(`Order by ${e.target.value}`);
  }

  //Orden por fuerza:
  function handleOrderByAttack(e) {
    e.preventDefault();
    dispatch(orderByAttack(e.target.value));
    setOrder(`Order by ${e.target.value}`);
  }

  return (
    <div>
      <aside className="aside-container">
        <div className= "ordenado">
          <label className="label">Sort by: </label>
          <select
            className="select"
            defaultValue="name"
            onChange={(e) => handleFilterName(e)}
          >
            <option className="options" value="name" disabled>
              Name
            </option>
            <option className="options" value="aToZ">
              A - Z
            </option>
            <option className="options" value="zToA">
              Z - A
            </option>
          </select>

          <select
            className="select"
            defaultValue="attack"
            onChange={(e) => handleOrderByAttack(e)}
          >
            <option className="options" value="attack" disabled>
              Attack
            </option>
            <option className="options" value="minToMax">
              Min to Max
            </option>
            <option className="options" value="maxToMin">
              Max to Min
            </option>
          </select>
        </div>

        <div className="filtrado">
          <label className="label">Filter: </label>
          <select
            className="select"
            defaultValue="allOrigin"
            onChange={(e) => handleFilterOrigin(e)}
          >
            <option className="options" value="allOrigin">
              All Origin
            </option>
            <option className="options" value="pokemonApi">
              Poke Api
            </option>
            <option className="options" value="createdPokemon">
              Created
            </option>
          </select>

          <select
            className="select"
            defaultValue="Types"
            onChange={(e) => handleFilterByTypes(e)}
            id="type-select"
          >
            <option className="options" value="Types" disabled>
              Types
            </option>
            <option className="options" value="allTypes">
              All Types
            </option>
            {totalTypes &&
              totalTypes
                .sort(function (a, b) {
                  if (a.name < b.name) return -1;
                  if (a.name > b.name) return 1;
                  return 0;
                })
                .map((t) => (
                  <option className="options" value={t.name} key={t.name}>
                    {t.name}
                  </option>
                ))}
          </select>
        </div>
          <button className="btn-reload" onClick={(e) => handleReset(e)}>
            Reload
          </button>
      </aside>
    </div>
  );
}
