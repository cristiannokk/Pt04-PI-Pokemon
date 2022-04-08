const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.INTEGER,
    },
    weight:{
      type: DataTypes.INTEGER,
    }
  },{ 
    timestamps: false 
  });
};


// ID (Número de Pokemon) * : No puede ser un ID de un pokemon ya existente en la API pokeapi
// Nombre *-
// Vida -
// Fuerza
// Defensa
// Velocidad
// Altura
// Peso