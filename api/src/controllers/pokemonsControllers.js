const { Pokemon, Type } = require('../db')
const { allPokemon, allPokemonId} = require("../utils/utils");


// ================== GET POKEMONS/NAME ==================
async function getPokemon(req, res, next) {

  try {
    let name = req.query.name; //Recibo la request en una variable
    let pokemonsTotal = await allPokemon(); //Guardo mi controlador que trae todos los pokemons en una variable..
    if (name) { //Consulto si me pasan un nombre y lo busco en la variable de arriba
      let pokemonName = await pokemonsTotal.filter((el) => 
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      pokemonName.length
        ? res.status(200).send(pokemonName) // Si lo encuentro lo devuelvo,
        : res.status(404).send("El pokemon ingresado no existe"); // y sino devuelvo el texto.
    } else {
      res.status(200).send(pokemonsTotal); //Sino devuelvo todos los pokemons
    }
  } catch (error) {
    next(error);
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
var idRef = 1126;
async function createPokemon(req, res){
  const {name, image, hp, attack, defense, speed, height, weight, type} = req.body

  // validando todo
  if(!Object.keys(req.body).length) return res.status(400).send({err: 'Error. No se recibio información para agregar '})

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

    //agregando el Types:
    let addType = await Type.findAll({ where: { name: type } });
    await newPokemon.setTypes(addType);
    return res.status(201).send({ msg: `El Pokemon ${newPokemon.name} fue creado con éxito!.` });
    
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