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
        len: [0, 25]
      }
    },
    image: {
      type: DataTypes.STRING(2000),
      allowNull: true,
      defaultValue: "https://as01.epimg.net/meristation/imagenes/2020/02/14/noticias/1581656735_610153_1581656812_noticia_normal.jpg"
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
      validate: {
        min: 1,
        max: 255
      }
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 5,
      validate: {
        min: 5,
        max: 190
      }
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 5,
      validate: {
        min: 5,
        max: 250
      }
    },
    speed:{
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 5,      
      validate: {
        min: 5,
        max: 200
      }
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
      validate: {
        min: 1,
        max: 20
      }
    },
    weight:{
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
      validate: {
        min: 1,
        max: 999
      }
    },
  },{ 
    timestamps: false 
  });
};
