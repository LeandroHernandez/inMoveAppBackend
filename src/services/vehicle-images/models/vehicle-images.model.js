/* eslint-disable quotes */
// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;
const { v4: uuid } = require("uuid");

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const vehicleImages = sequelizeClient.define(
    "vehicle_images",
    {
      uuid: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: uuid(),
      },
      vehicleFileName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vehicleFileDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vehicleFileReference: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vehicleFileState: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vehicleFilevehicleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "vehicles", key: "id" },
      },
      vehicleFileUrl: {
        type: DataTypes.STRING,
        allowNull: false,
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
  vehicleImages.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return vehicleImages;
};
