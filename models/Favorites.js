const { Model, DataTypes } = require("sequelize");

const db = require("../config/db");

class Favorites extends Model {}

Favorites.init(
  {
    code: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "favorites" }
);

module.exports = Favorites;
