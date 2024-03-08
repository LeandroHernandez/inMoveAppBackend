/* eslint-disable quotes */
// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const tripSpecifications = sequelizeClient.define(
    "trip_specifications",
    {
      tripSpecificationName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tripSpecificationDescription: {
        type: DataTypes.STRING,
        allowNull: true,
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
  tripSpecifications.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return tripSpecifications;
};
