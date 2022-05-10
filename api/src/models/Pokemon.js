const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
      index: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [0, 15]
      }
    },
    image: {
      type: DataTypes.STRING(20000),
      allowNull: true,
      validate: { isUrl: true },
      defaultValue: "https://www.models-resource.com/resources/big_icons/11/10411.png"
    },
    hp: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 999
      }
    },
    attack: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 999
      }
    },
    defense: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 999
      }
    },
    speed:{
      type: DataTypes.INTEGER,      
      validate: {
        min: 1,
        max: 999
      }
    },
    height: {
      type: DataTypes.DECIMAL,
      validate: {
        min: 1,
        max: 999
      }
    },
    weight:{
      type: DataTypes.DECIMAL,
      validate: {
        min: 1,
        max: 999
      }
    },
  },{ 
    timestamps: false 
  });
};
