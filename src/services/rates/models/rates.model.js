/* eslint-disable quotes */
// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const rates = sequelizeClient.define(
    "rates",
    {
      rateTripCost: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rateShootingGuard: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rateAgent: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rateTotal: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rateState: {
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
  rates.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return rates;
};
