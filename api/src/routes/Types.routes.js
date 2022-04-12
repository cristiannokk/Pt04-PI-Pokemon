//Exporto todas las funcionalidades del controlador del cual se encarga index.
const { Router } = require("express");
const router = Router();
const getAllTypes = require("../controllers/typesControllers");

router.get("/", getAllTypes);

module.exports = router;
