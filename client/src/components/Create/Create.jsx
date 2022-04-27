import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { postPokemon, getTypes, getAllPokemons,} from "../../redux/action.pokemons";
import { useDispatch, useSelector } from "react-redux";
import "./CreateStyles.css";
import imageCreate from "../../assets/ImageCreate.png"

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

  function handleInputChange(e) { // el name
    setInput({ 
      ...input, 
      [e.target.name]: e.target.value 
    });
    setErrorForm(
      validate({ 
        ...input, 
        [e.target.name]: e.target.value }));
  };

  function handleDeleteType(el) { // borrar el type
    setInput({
      ...input,
      types: input.types.filter((type) => type !== el),
    });
  };

  function handleTypesChange(e) { // agregar el type
    setInput({ 
      ...input, 
      types: [...input.types, e.target.value] 
    });
  };

  function handleSubmit(e) {
    // e.preventDefault();
    // dispatch(postPokemon(input))
    // alert("Pokemon creado con exito")
    // setInput({
    //   name: ``,
    //   hp: ``,
    //   attack: ``,
    //   defense: ``,
    //   speed: ``,
    //   height: ``,
    //   weight: ``,
    //   types: ``,
    // });
    // navigate(`/pokemons/index`)
    
    try {
      let findName = totalPokemon.filter(
        (e) => e.name.toLowerCase() === input.name.toLowerCase()
      )
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
        };
        console.log(newPokemon);
        dispatch(postPokemon(newPokemon));
      }
      alert(`El Pokémon fue creado con éxito.`)
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
      navigate(`/pokemons/index`)
      
    } catch (error) {
      console.log(error);
      return alert(
        "Oh no! Algo falló al crear el Pokémon. ¡Intentalo de nuevo!"
      );
    }
  };
  // console.log(input);
  return (
    <div className="create_container">
        <img className="imgCreate" src={imageCreate} alt="" />
      <h1 className="title">¡Crea tu Pokémon!</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="info-form">
          <div>
            <label>NAME</label>
            <input
              onChange={handleInputChange}
              value={input.name}
              name="name"
              type="text"
              placeholder="¿Cómo se llama el Pokémon?..."
            />
            {errors.name && (
              <div className="errors">
                <div id="name">{errors.name}</div>
              </div>
            )}
          </div>
          <div>
            <label>HP</label>
            <input
              onChange={handleInputChange}
              value={input.hp}
              name="hp"
              type="number"
              min="1"
              placeholder="Inserte el hp..."
            />
            {errors.hp && (
              <div className="errors">
                <div>{errors.hp}</div>
              </div>
            )}
          </div>
          <label>ATTACK<input
              onChange={handleInputChange}
              value={input.attack}
              name="attack"
              type="number"
              min="1"
              placeholder="Poder de ataque..."
            />
            {errors.attack && (
              <div className="errors">
                <div>{errors.attack}</div>
              </div>
            )}
          </label>
          <div>
            <label>DEFENSE</label>
            <input
              onChange={handleInputChange}
              value={input.defense}
              name="defense"
              type="number"
              min="1"
              placeholder="Poder de defensa.."
            />
            {errors.defense && (
              <div className="errors">
                <div>{errors.defense}</div>
              </div>
            )}
          </div>
          <div>
            <label>SPEED</label>
            <input
              onChange={handleInputChange}
              value={input.speed}
              name="speed"
              type="number"
              min="1"
              placeholder="Inserta su velocidad..."
            />
            {errors.speed && (
              <div className="errors">
                <div>{errors.speed}</div>
              </div>
            )}
          </div>
          <div>
            <label>WEIGHT</label>
            <input
              onChange={handleInputChange}
              value={input.weight}
              name="weight"
              type="number"
              min="1"
              placeholder="Inserta el peso (en kg)"
            />
            {errors.weight && (
              <div className="errors">
                <div>{errors.weight}</div>
              </div>
            )}
          </div>
          <div>
            <label>HEIGHT</label>
            <input
              onChange={handleInputChange}
              value={input.height}
              name="height"
              type="number"
              min="1"
              placeholder="Inserta el tamaño (cm)"
            />
            {errors.height && (
              <div className="errors">
                <div>{errors.height}</div>
              </div>
            )}
          </div>
          <div>
            <label>IMAGE</label>
            <input
              onChange={handleInputChange}
              value={input.image}
              name="image"
              type="url"
              placeholder="Copia la url de la imagen..."
            />
            {errors.image && (
              <div className="errors">
                <div>{errors.image}</div>
              </div>
            )}
          </div>
          <div>
            <label>TYPE</label>
            {input.types.length === 0 ? (
              <p>SELECT TWO TYPES! </p>
            ) : input.types.length > 2 ? (
              <p> Maximum Types: 2 </p>
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
                    <button onClick={(e) => handleDeleteType(el)}>Delete Type</button>
                  </p>
                ))}
              </h5>
            </div>
          </div>
        </div>
        <div className="BTNS">
        <button className="btn-create" type="submit">
          <a>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Crear
          </a>
        </button>
          <Link to="/pokemons/index" style={{ textDecoration: "none" }}>
            <a>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <li class="home">Home</li>
            </a>
          </Link>
        </div>
      </form>
      <div>
        <Footer />
      </div>
    </div>

  );
}
