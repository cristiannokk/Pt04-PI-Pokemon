const axios = require('axios');
const URL = "https://pokeapi.co/api/v2/pokemon/"
const { Pokemon } = require('../db')
const { allPokemon} = require("../utils/utils");



async function getPokemon(req, res) {
  let getAllPokemon = await allPokemon();
  res.status(200).json(getAllPokemon);

}


function getPokemonById(req, res) {
  const {id} = req.params;
  axios.get(`${URL}${id}`)
  .then(response => {
    let pokemon = {
      id: response.data.id,
      name: response.data.name,
      hp: response.data.stats[0].base_stat,
      attack: response.data.stats[1].base_stat,
      defense: response.data.stats[2].base_stat,
      speed: response.data.stats[5].base_stat,
      height: response.data.height,
      weight: response.data.weight,
    }
    res.send(pokemon);
  })
  .catch(err => res.send({err: "No existe"}));
}





module.exports = {
  getPokemon,
  getPokemonById,
  
}