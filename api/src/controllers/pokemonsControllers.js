const axios = require('axios');
const URL = "https://pokeapi.co/api/v2/pokemon/"
const { Pokemon, Type } = require('../db')
const { allPokemon, allPokemonId, searchPokemonName} = require("../utils/utils");


// ================== GET POKEMONS/NAME ==================
async function getPokemon(req, res) {
    // todos
  const {name} = req.query
  if(!name) {
    let getAllPokemon = await allPokemon();
    res.status(200).json(getAllPokemon);
  }else{
    // por nombre
    try {
      let pokemonName = await searchPokemonName(name.toLowerCase());
      res.status(200).json(pokemonName);      
    } catch (error) {
        res.status(404).send(`Error: No existe el pokemon llamado ${name}`);
    }
  }
}

// ================== GET ID ==================
async function getPokemonById(req, res) {
  const { id } = req.params;
  try {
    let infoPokemon = await allPokemonId(id);
    res.status(200).json(infoPokemon);
  } catch (error) {
    res.status(404).json({ err: `No se encontró un Pokemon para el id: ${id}` });
  }
};

//================== POST ==================
var idRef = 1200;
async function createPokemon(req, res){
  const {name, image, hp, attack, defense, speed, height, weight, type} = req.body

  // validando todo
  if(!Object.keys(req.body).length) return res.status(400).send({err: 'Error'})

  // validando name 
  if(!name) return res.status(404).send({err: 'Error, no ingresaste el name del Pokemon'});
  
  // nota:findOne mantiene el error por separado
  try{
    let findOrCreatePokemon = await Pokemon.findOne({
      where: {
        name: name.toLowerCase()
      }
    });
    // verificanndo si el name esta disponible 
    if(findOrCreatePokemon) 
      return res.json({msg: 'Ya existe un Pokemon con ese nombre'})
  
    let newPokemon = await Pokemon.create({
        id: ++idRef,
        name: name.toLowerCase(),
        image: image,
        type: type,
        hp: hp,
        attack: attack,
        defense: defense,
        speed: speed,
        height: height,
        weight: weight,
    })
    let addType = await Type.findAll({ where: { name: type } });
    await newPokemon.setTypes(addType);
    return res
    .status(201)
    .send({ msg: `El Pokemon ${newPokemon.name} fue creado con éxito!.` });
} catch (error) {
  res.status(404).send(error);
  console.log(error);
}
};

module.exports = {
  getPokemon,
  getPokemonById,
  createPokemon  
}