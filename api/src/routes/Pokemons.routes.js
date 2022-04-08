const { Router } = require('express');
const { getPokemon, getPokemonById,  } = require('../controllers/pokemonsControllers')

const router = Router()


router.get('/', getPokemon)

router.get('/:id', getPokemonById)

router.post('/')

module.exports= router