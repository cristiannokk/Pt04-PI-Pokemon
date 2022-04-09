const axios = require('axios');
const URL = "https://pokeapi.co/api/v2/pokemon/"
const { Pokemon } = require('../db')

async function apiPokemon(req, res) {
  try {
    let savePokemons = [];

    for (let i = 1; i <= 41; i++) {
      savePokemons.push(axios.get(URL + i));
    }
    return await Promise.all(savePokemons)
    .then((res) => {
      const pokemons = res.map((e) => {
        return {
          id: e.data.id,
          name: e.data.name,
          hp: e.data.stats[0].base_stat,
          attack: e.data.stats[1].base_stat,
          defense: e.data.stats[2].base_stat,
          speed: e.data.stats[5].base_stat,
          height: e.data.height,
          weight: e.data.weight,
        };
      });
      return pokemons;
    });
  } catch (err) {
    console.log(err);
  }
};

async function allPokemon() {
  try {
    let apiPokemonInfo = await apiPokemon();
    let totalPokemonInfo = [...apiPokemonInfo];
    if (!totalPokemonInfo) {
      return "No hay pokemones para mostrar.";
    }
    return totalPokemonInfo;
  } catch (error) {
    return error;
  }
};




module.exports = {
  allPokemon,
};
