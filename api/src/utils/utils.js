const axios = require('axios');
const URL = "https://pokeapi.co/api/v2/pokemon/"
const URL_TYPES = "https://pokeapi.co/api/v2/type"
const { Pokemon, Type } = require('../db')


// -------------->> POKEMONS DESDE LA API <<--------------
async function apiPokemon() {
  try {
    let savePokemons = [];
    
    for (let i = 1; i <= 40; i++) {
      savePokemons.push(axios.get(URL + i));
    }
    return await Promise.all(savePokemons)
    .then((res) => {
      const pokemons = res.map(e => {
        return {
          id: e.data.id,
          name: e.data.name,
          image: e.data.sprites.other.home.front_default,
          types: e.data.types.map((e) => e.type.name),
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

// -------------->> POKEMONS DESDE LA DB <<--------------

async function dbPokemon() {
  try {
    const dbPokemonInfo = await Pokemon.findAll({
      include: [
        {
          model: Type,
          as: "types",
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
      through: { attributes: ["name"] },
      attributes: ["id", "name", "image", "attack"],
    });
    
    if(dbPokemonInfo){
      return dbPokemonInfo.map( pokemon => {
        const typeArr = pokemon.dataValue.types.map(e => e.name)
        return {
          ...pokemon.dataValue,
          type: typeArr,
        }
      });
    }
  } catch (error) {
    console.log(error)
  }
}
// -------------->> CONCATENANDO POKEMONS API/DB <<--------------

async function allPokemon() {
  try {
    let apiPokemonInfo = await apiPokemon();
    let dbPokemonInfo = await dbPokemon();
    let totalPokemonInfo = [];
    
    if(!dbPokemonInfo){
      totalPokemonInfo = [...apiPokemonInfo];
    }
    else{
      totalPokemonInfo = [...dbPokemonInfo, ...apiPokemonInfo];
    }
    return totalPokemonInfo;
  } catch (error) {
    return error;
  }
};
// -------------->> BUSCAR POKEMON POR NOMBRE <<--------------

async function searchPokemonName(name) {
  try {
    // console.log("--FLAG SEARCH NOMBRE--");
    let findNamePokemon = await Pokemon.findOne({
      where: {
        name: name.toLowerCase(),
      },
      include: [
        {
          model: Type,
          as: "types",
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
      through: { attributes: ["name"] },
      attributes: ["id", "name", "image", "attack", "defense", "speed", "height", "weight"],
    });
    // console.log("--FLAG SEARCH NAME DB--");
    if (findNamePokemon) {
      let { dataValues } = findNamePokemon;
      dataValues.types = dataValues.types.map((t) => t.name);
      return dataValues;
    } else {
      // console.log("--FLAG SEARCH NAME API--");

      let pokeNameAPI = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      let nameAPIPokemon = {
        id: pokeNameAPI.data.id,
        name: pokeNameAPI.data.name,
        types: pokeNameAPI.data.types.map((t) => t.type.name),
        image: pokeNameAPI.data.sprites.other.home.front_default,
        hp: pokeNameAPI.data.stats[0].base_stat,
        attack: pokeNameAPI.data.stats[1].base_stat,
        defense: pokeNameAPI.data.stats[2].base_stat,
        speed: pokeNameAPI.data.stats[5].base_stat,
        height: pokeNameAPI.data.height,
        weight: pokeNameAPI.data.weight,
      };
      // console.log(nameAPIPokemon);

      return nameAPIPokemon;
    }
  } catch (error) {
    return res.send({ alert: `"No se encuentra el Pokémon llamado ${name}` });
  }
};


// -------------->> POKEMONS POR ID <<--------------

async function allPokemonId(id) {
  // petision de la id a la api

  if(!id) {
    res.send('Falta agregar una ID')
  } 
  // cantidad de pokemons = 898 => 3 digitos
  else if (id.length > 4) {
    res.send('La ID debe ser menor a 4 digitos')
  }
  // pokemons x ID desde db
  try {
    if (id > 1200) {
      try {
        let dbPokemonById = await Pokemon.findByPk(id, {
          include: [
            {
              model: Type,
              as: "types",
              attributes: ["name"],
              through: {
                attributes: [],
              },
            },
          ],

          through: { attributes: ["name"] },
          attributes: [
            "id",
            "name",
            "image",
            "hp",
            "attack",
            "defense",
            "speed",
            "height",
            "weight",
          ],
        });
        const { dataValues } = dbPokemonById;
        dataValues.types = dataValues.types.map((t) => t.name);
        if (dbPokemonById) return dataValues;
      } catch (error) {
        console.log(error);
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
  searchPokemonName
};
