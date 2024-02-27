/* eslint-disable quotes */
// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const updates = sequelizeClient.define(
    "updates",
    {
      updateType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "types", key: "id" },
      },
      updateReason: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "reasons", key: "id" },
      },
      updateDescription: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      updateDriverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "drivers", key: "id" },
      },
      updateState: {
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
  updates.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return updates;
};
