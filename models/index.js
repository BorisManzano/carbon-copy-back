const Users = require("./Users");
const Favorites = require("./Favorites");

Users.hasMany(Favorites);
Favorites.belongsTo(Users, { as: "user", foreignKey: "userId" });

module.exports = { Users, Favorites };
