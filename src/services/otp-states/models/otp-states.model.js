/* eslint-disable quotes */
// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const states = sequelizeClient.define(
    "otp_states",
    {
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stateDescription: {
        type: DataTypes.STRING,
        allowNull: false,
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
  states.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return states;
};
