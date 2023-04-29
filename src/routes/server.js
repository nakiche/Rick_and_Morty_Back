const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const morgan = require("morgan");
const axios = require("axios");

const { getAllChars } = require("../controllers/characters.js");
const {
  deleteFavorites,
  postFavorites,
  getFavorites,
} = require("../controllers/favorites.js");

const utils = require("../utils/utils.js");

app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); //Autorizo recibir solicitudes de este dominio
  res.header("Access-Control-Allow-Credentials", true); //Autorizo recibir solicitudes que incluyan el encabezado con credenciales
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  ); //Autorizo recibir solicitudes con dichos hedears
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE"); //Autorizo las solicitudes tipo GET, POST, OPTIONS, PUT y DELETE.
  next();
});

let fav = utils.fav;

app.get("/rickandmorty/allCharacters", async function (req, res) {
  try {
    let allCharacters = await getAllChars();
    res.status(200).json(allCharacters);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

app.get("/rickandmorty/character/:id", async function (req, res) {
  //corregir controladores, en los controladores no hay RES
  let { id } = req.params;
  try {
    let response = await axios(
      `https://rickandmortyapi.com/api/character/${id}`
    );
    let data = response.data;
    let objeto = {
      id: data.id,
      name: data.name,
      species: data.species,
      gender: data.gender,
      image: data.image,
    };
    return res.status(200).json(objeto);
  } catch (e) {
    if (e.response.status === 404)
      return res.status(404).json(`No existen personajes con el id ${id}`);
    return res.status(400).json(e.message);
  }
});

app.get("/rickandmorty/detail/:id", async function (req, res) {
  let { id } = req.params;
  try {
    let response = await axios(
      `https://rickandmortyapi.com/api/character/${id}`
    );
    let data = response.data;
    let objeto = {
      id: data.id,
      name: data.name,
      species: data.species,
      gender: data.gender,
      image: data.image,
      status: data.status,
      origin: data.origin,
    };
    return res.status(200).json(objeto);
  } catch (e) {
    if (e.response.status === 404)
      return res.status(404).json(`No existen personajes con el id ${id}`);
    return res.status(400).json(e.message);
  }
});

app.get("/rickandmorty/fav", async function (req, res) {
  //que obtenga los personajes guardados en el arreglo fav.
  try {
    let favorites = await getFavorites();
    //if (favorites.length < 1) throw new Error("No existen favoritos");
    return res.status(200).json(favorites);
  } catch (e) {
    return res.status(400).json(e.message);
  }
});

app.post("/rickandmorty/fav", async function (req, res) {
  //que guarde los personajes en el arreglo fav.
  if (Object.entries(req.body).length == 0) {
    return res.status(400).json("no hay body");
  }
  try {
    let newFavorite = await postFavorites(req.body);
    return res
      .status(200)
      .json(`Favorito ${newFavorite.dataValues.name} agregado correctamente`);
  } catch (e) {
    res.status(404).json(e.message);
  }
});

app.delete("/rickandmorty/fav/:id", async function (req, res) {
  //que elimine el personaje en el arreglo fav a partir del id
  let { id } = req.params;
  try {
    let favorite = await deleteFavorites(id);
    return res.status(200).json(`Favorito eliminado`);
  } catch (e) {
    return res.status(400).json(e.message);
  }
});

module.exports = app;
