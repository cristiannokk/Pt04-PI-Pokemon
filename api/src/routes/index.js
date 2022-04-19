// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Router } = require('express');
const router = Router();
const Pokemon = require('./Pokemons.routes.js') 
const Type = require('./Types.routes')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemons', Pokemon)
router.use('/types', Type)


// router.use()

module.exports = router;
