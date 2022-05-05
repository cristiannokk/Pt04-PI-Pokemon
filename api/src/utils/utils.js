const axios = require('axios');
const URL = "https://pokeapi.co/api/v2/pokemon/"
const { Pokemon, Type } = require('../db')


// -------------->> POKEMONS DESDE LA API <<--------------
async function apiPokemon() {
    const savePokemons = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40").then(data => {
      return data.data.results;
    })
    .then(data => {
      return Promise.all(data.map(res => axios.get(res.url)))
    })
    .then(data => {
      return data.map(res => res.data)
    })
    let arrayPokeApi = savePokemons.map(result => {
      return {        
        id: result.id,
        name: result.name,
        types: result.types.map((t) => t.type.name), //lOS TYPES ESTAN EN SU PROPIEDAD NAME
        image: result.sprites.other.home.front_default,
        hp: result.stats[0].base_stat,
        attack: result.stats[1].base_stat,
        defense: result.stats[2].base_stat,
        speed: result.stats[3].base_stat,
        height: result.height,
        weight: result.weight,
      }
    })
    return arrayPokeApi
};
// -------------->> POKEMONS DESDE LA DB <<--------------

async function dbPokemon() {
  try {
    const dbPokemonInfo = await Pokemon.findAll({ // TRAIGO TODO DE LA TABLA POKEMON CON LA RELACION CON TYPE
      include: [
        {
          attributes: ["name"],
          model: Type,
          through: {
            attributes: [],
          },
        },
      ],
    });
    return dbPokemonInfo  
  } catch (error) {
    console.log(error)
  }
}
// -------------->> CONCATENANDO POKEMONS API/DB <<--------------

async function allPokemon() {
  try {
    let apiPokemonInfo = await apiPokemon();// DATOS DE LA API 
    let dbPokemonInfo = await dbPokemon(); // DATOS DE LA DB
    const totalPokemonInfo = apiPokemonInfo.concat(dbPokemonInfo) // CONCATENANDO AMBAS
    return totalPokemonInfo;
  } catch (error) {
    return error;
  }
};
// -------------->> POKEMONS POR ID <<--------------

async function allPokemonId(id) {
  try {
    if (id > 1125) {
      try {
        let dbPokemonById = await Pokemon.findByPk(id, {
          include: [
            {
              model: Type,
              attributes: ["name"],
              through: {
                attributes: [],
              },
            },
          ],
          through: { 
            attributes: [] 
          }
        });
        const { dataValues } = dbPokemonById;
        dataValues.types = dataValues.types.map((t) => t.name);
        if (dbPokemonById) return dataValues;
      } catch (error) {
        res.status(403)
      }
    } else {
      // pokemons x id desde la api
    let pokeId = await axios.get(`${URL}${id}`);
      let onePokemon = {
        id: pokeId.data.id,
        name: pokeId.data.name,
        image: pokeId.data.sprites.other.home.front_default,
        types: pokeId.data.types.map(t => t.type.name),
        hp: pokeId.data.stats[0].base_stat,
        attack: pokeId.data.stats[1].base_stat,
        defense: pokeId.data.stats[2].base_stat,
        speed: pokeId.data.stats[5].base_stat,
        height: pokeId.data.height,
        weight: pokeId.data.weight,
      };
      return onePokemon;    
    }
  } catch (err) {
    console.log(err);   
    res.status(404).json({ err: `No se encontró un Pokemon para el id: ${id}` });
  }
}



module.exports = {
  allPokemon,
  allPokemonId,
};
