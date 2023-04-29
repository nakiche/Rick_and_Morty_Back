require('dotenv').config();
const { Sequelize,Op } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST,DB_NAME,DB_DEPLOY } = process.env;
const modelCharacter = require('./models/Character.js');
const modelFavorite = require('./models/Favorite.js');
/*
EJERCICIO 01
A la instancia de Sequelize le falta la URL de conexión.
Recuerda pasarle la información de tu archivo '.env'.

URL ----> postgres://DB_USER:DB_PASSWORD@DB_HOST/rickandmorty
*/
// const sequelize = new Sequelize(
//    // URL
//    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
//    { logging: false, native: false }
// );

const sequelize = new Sequelize(DB_DEPLOY, {
   logging: false, // set to console.log to see the raw SQL queries
   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
 });
 

/*
EJERCICIO 03
Debajo de este comentario puedes ejecutar la función de los modelos.
*/

modelCharacter(sequelize);
modelFavorite(sequelize);

const { Character,Favorite } = sequelize.models;

module.exports = {
   ...sequelize.models,
   db:sequelize,
   Op
};
