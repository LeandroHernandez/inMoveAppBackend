/* eslint-disable quotes */
// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const ratings = sequelizeClient.define(
    "ratings",
    {
      ratingScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ratingTripSpecifications: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
      },
      ratingComment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ratingTripId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "trips", key: "id" },
      },
      state: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
    },
    {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        },
      },
    }
  );

  // eslint-disable-next-line no-unused-vars
  ratings.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return ratings;
};
