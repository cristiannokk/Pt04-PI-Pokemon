import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../Nav/NavBar";
import { Footer } from "../Footer/Footer";
import { postPokemon, getTypes, getAllPokemons,} from "../../redux/action.pokemons";
import { useDispatch, useSelector } from "react-redux";
import "./CreateStyles.css";

//Validacion del formulario:
import { validate } from "./validateForm";

export function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stateTypes = useSelector((state) => state.types);
  const totalPokemon = useSelector((state) => state.pokemons);

  const [errors, setErrorForm] = useState({});
  const [input, setInput] = useState({
    name: ``,
    hp: ``,
    attack: ``,
    defense: ``,
    speed: ``,
    height: ``,
    weight: ``,
    types: [],
  });

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getAllPokemons());
    // console.log(getTypes)
  }, [dispatch]);

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrorForm(validate({ ...input, [e.target.name]: e.target.value }));
  };

  const handleDeleteType = (el) => {
    setInput({
      ...input,
      types: input.types.filter((type) => type !== el),
    });
  };

  const handleTypesChange = (e) => {
    setInput({ ...input, types: [...input.types, e.target.value] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      let findName = totalPokemon.filter(
        (e) => e.name.toLowerCase() === input.name.toLowerCase()
      );

      if (!findName) {
        return alert("Ya existe un pokemon con este nombre. ¡Cambialo!");
      } else if (Object.keys(errors).length) {
        return alert(Object.values(errors));
      } else {
        const newPokemon = {
          name: input.name,
          hp: input.hp,
          attack: input.attack,
          defense: input.defense,
          speed: input.speed,
          height: input.height,
          weight: input.weight,
          types: input.types,
          createdPokemon: true,
        };
        console.log(newPokemon);
        dispatch(postPokemon(newPokemon));
      }

      setInput({
        name: ``,
        hp: ``,
        attack: ``,
        defense: ``,
        speed: ``,
        height: ``,
        weight: ``,
        types: ``,
      });

      return (
        alert(`El Pokémon fue creado con éxito.`), navigate(`/pokemons/index`)
      );
    } catch (error) {
      console.log(error);
      return alert(
        "Oh no! Algo falló al crear el Pokémon. ¡Intentalo de nuevo!"
      );
    }
  };
  console.log(input);
  return (
    <div class="create_container">
      <header>
        <NavBar />
      </header>
      <h1 class="title">¡Crea un nuevo Pokémon!</h1>
      <form class="form" onSubmit={handleSubmit}>
        <div class="info-form">
          <div>
            <label>Nombre</label>
            <input
              onChange={handleInputChange}
              value={input.name}
              name="name"
              type="text"
              placeholder="¿Cómo se llama el Pokémon?..."
            />
            {errors.name && (
              <div class="errors">
                <div id="name">{errors.name}</div>
              </div>
            )}
          </div>
          <div>
            <label>Hp</label>
            <input
              onChange={handleInputChange}
              value={input.hp}
              name="hp"
              type="number"
              min="1"
              placeholder="Inserte el hp..."
            />
            {errors.hp && (
              <div class="errors">
                <div>{errors.hp}</div>
              </div>
            )}
          </div>
          <label>
            Ataque
            <input
              onChange={handleInputChange}
              value={input.attack}
              name="attack"
              type="number"
              min="1"
              placeholder="Poder de ataque..."
            />
            {errors.attack && (
              <div class="errors">
                <div>{errors.attack}</div>
              </div>
            )}
          </label>
          <div>
            <label>Defensa</label>
            <input
              onChange={handleInputChange}
              value={input.defense}
              name="defense"
              type="number"
              min="1"
              placeholder="Poder de defensa.."
            />
            {errors.defense && (
              <div class="errors">
                <div>{errors.defense}</div>
              </div>
            )}
          </div>
          <div>
            <label>Velocidad</label>
            <input
              onChange={handleInputChange}
              value={input.speed}
              name="speed"
              type="number"
              min="1"
              placeholder="Inserta su velocidad..."
            />
            {errors.speed && (
              <div class="errors">
                <div>{errors.speed}</div>
              </div>
            )}
          </div>
          <div>
            <label>Peso</label>
            <input
              onChange={handleInputChange}
              value={input.weight}
              name="weight"
              type="number"
              min="1"
              placeholder="Inserta el peso (en kg)"
            />
            {errors.weight && (
              <div class="errors">
                <div>{errors.weight}</div>
              </div>
            )}
          </div>
          <div>
            <label>Tamaño</label>
            <input
              onChange={handleInputChange}
              value={input.height}
              name="height"
              type="number"
              min="1"
              placeholder="Inserta el tamaño (cm)"
            />
            {errors.height && (
              <div class="errors">
                <div>{errors.height}</div>
              </div>
            )}
          </div>
          <div>
            <label>Imagen</label>
            <input
              onChange={handleInputChange}
              value={input.image}
              name="image"
              type="url"
              placeholder="Copia la url de la imagen..."
            />
            {errors.image && (
              <div class="errors">
                <div>{errors.image}</div>
              </div>
            )}
          </div>
          <div>
            <label>Tipos</label>
            {input.types.length === 0 ? (
              <p>Seleciona dos tipos! </p>
            ) : input.types.length > 2 ? (
              <p> Maximos Tipos: 2 </p>
            ) : null}
            <select
              value={input.types}
              name="types"
              onChange={handleTypesChange}
            >
              <option value="types">-Tipos--</option>
              {stateTypes.length > 0 &&
                stateTypes
                  .sort(function (a, b) {
                    if (a.name < b.name) return -1;
                    if (a.name > b.name) return 1;
                    return 0;
                  })
                  .map((t) => (
                    <option value={t.name} key={t.id}>
                      {t.name}
                    </option>
                  ))}
            </select>

            <div>
              <h5>
                {input.types?.map((el) => (
                  <p>
                    {el}
                    <button onClick={(e) => handleDeleteType(el)}>X</button>
                  </p>
                ))}
              </h5>
            </div>
          </div>
        </div>
        <button class="btn-create" type="submit">
          Crear
        </button>
      </form>

      <div>
        <Footer />
      </div>
    </div>
  );
}
