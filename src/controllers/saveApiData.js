const axios = require("axios");
const { Character } = require("../DB_connection.js");

var getApiData = async function () {
  try {
    let i = 1;
    let characters = [];

    while (i < 6) {
      let response = await axios(
        `https://rickandmortyapi.com/api/character?page=${i}`
      );
      characters.push(response);
      i++;
    } //results es donde se almacena lo que quiero mapear                                                               //data porque axios trae en el objeto data
    characters = (await Promise.all(characters)).map((res) =>
      res.data.results.map((char) => {
        return {
          id: char.id,
          name: char.name,
          status: char.status,
          species: char.species,
          gender: char.gender,
          origin: char.origin.name,
          image: char.image,
        };
      })
    );
    let allCharacters = [];
    characters.map((char) => {
      allCharacters = allCharacters.concat(char);
    });
    return allCharacters;
  } catch (e) {
    return { msg: e.message };
  }
};

var saveApiData = async function () {
  try {
    let arrayCharacters = await getApiData();
    await Character.bulkCreate(arrayCharacters).then(() =>
      console.log("Users data have been saved")
    );
  } catch (e) {
    return { msg: e.message };
  }
};

module.exports = saveApiData;
