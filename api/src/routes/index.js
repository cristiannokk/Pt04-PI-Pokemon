const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Pokemon = require('./Pokemons.routes.js') 
const Type = require('./Types.routes')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemons', Pokemon)
router.use('/types', Type)


// router.use()

module.exports = router;
