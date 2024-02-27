/* eslint-disable quotes */
// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const states = sequelizeClient.define(
    "states",
    {
      stateName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stateType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "types", key: "id" },
      },
      stateDescription: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      stateState: {
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
  states.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return states;
};
