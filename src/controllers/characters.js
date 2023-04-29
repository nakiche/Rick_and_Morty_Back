const { Character } = require("../DB_connection.js");
const axios = require("axios");

const getAllChars = async function () {
  try {
    let allCharacters = await Character.findAll({});
    return allCharacters;
  } catch (e) {
    return { msg: e.message };
  }
};

module.exports = { getAllChars };
