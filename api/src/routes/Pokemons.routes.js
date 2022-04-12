const { Router } = require('express');
const { getPokemon, getPokemonById, createPokemon } = require('../controllers/pokemonsControllers')

const router = Router()


router.get('/', getPokemon)

router.get('/:id', getPokemonById)

router.post('/create', createPokemon)

module.exports= router