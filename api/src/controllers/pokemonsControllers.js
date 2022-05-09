const { Pokemon, Type } = require('../db')
const { allPokemon, allPokemonId} = require("../utils/utils");


// ================== GET POKEMONS/NAME ==================
async function getPokemon(req, res, next) {

  try {
    let name = req.query.name; //Recibo la request en una variable
    let pokemonsTotal = await allPokemon(); //Guardo mi controlador que trae todos los pokemons en una variable..
    if (name) { //Consulto si me pasan un nombre y lo busco en la variable de arriba
      let pokemonName = await pokemonsTotal.filter((e) => 
        e.name.toLowerCase().includes(name.toLowerCase())
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
  try {
    let { name, image, hp, attack, defense, speed, height, weight, types} = req.body //Datos que necesito pedir

    let findOnePokemon = await Pokemon.findOne({
      where: {
        name: name.toLowerCase(),
      },
    });
    //Primero verifico que el nombre este disponible.
    if (findOnePokemon)
      return res.json({ msg: "El Pokemon ya existe. Intenta crear otro." });

    const newPokemon = await Pokemon.create({
      id: idRef++,
      name,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      types, 
    });
  
    if (!name) return res.json({ info: "El nombre es obligatorio" });
    if(Array.isArray(types) && types.length){ //Consulto si lo que me llega en types es un arreglo y si tiene algo adentro.
      let dbTypes = await Promise.all( //Armo una variable que dentro tendra una resolucion de promesas
        types.map((e) => { // Agarro la data de types y le hago un map para verificar que cada elemento exista en nuestra tabla de types
          return Type.findOne({where:{ name: e}}) 
        })
      )
     await newPokemon.setTypes(dbTypes) //Una vez que se resuelva la promesa del Pokemon.create, le agrego los types

     return res.send("Pokemon creado exitosamente");
    }
  } catch (err) {
    console.log(err)
    res.status(400).send("Error en data");
  }
};

module.exports = {
  getPokemon,
  getPokemonById,
  createPokemon  
}