/* eslint-disable linebreak-style */
/* eslint-disable quotes */
// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const device = sequelizeClient.define(
    "device",
    {
      deviceName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deviceMac: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deviceBrand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deviceUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
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
  device.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return device;
};
