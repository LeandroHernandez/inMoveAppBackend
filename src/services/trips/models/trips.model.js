/* eslint-disable quotes */
// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const trips = sequelizeClient.define(
    "trips",
    {
      tripDepartureTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tripArrivalTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tripDepartureAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tripDestinyAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tripDuration: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tripDistance: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tripPaymentMethod: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "types", key: "id" },
      },
      tripRate: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "rates", key: "id" },
      },
      tripDriverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "drivers", key: "id" },
      },
      tripPassengerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
      },
      state: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: true,
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
  trips.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return trips;
};
