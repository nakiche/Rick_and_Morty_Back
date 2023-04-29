const { Favorite } = require("../DB_connection");

var postFavorites = async function (newFav) {
  try {
    let favorito = await Favorite.create({
      id: newFav.id,
      name: newFav.name,
      species: newFav.species,
      gender: newFav.gender,
      image: newFav.image,
    });
    return favorito;
  } catch (e) {
    return { msg: e.message };
  }
};

var getFavorites = async function () {
  try {
    let favorites = await Favorite.findAll({});
    return favorites;
  } catch (e) {
    return { msg: e.message };
  }
};

var deleteFavorites = async function (id) {
  try {
    let favorite = await Favorite.destroy({
      where: { id: id },
    });
    console.log(favorite);
    return favorite;
  } catch (e) {
    return { msg: e.message };
  }
};

module.exports = { getFavorites, postFavorites, deleteFavorites };
