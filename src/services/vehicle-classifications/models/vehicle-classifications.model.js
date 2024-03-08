/* eslint-disable quotes */
// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const vehicleClassifications = sequelizeClient.define(
    "vehicle_classifications",
    {
      vehicleClassificationYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      vehicleClassificationBodyWorkType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "types", key: "id" },
      },
      vehicleClassificationVehicleCondition: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "states", key: "id" },
      },
      vehicleClassificationPolarizedMoons: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      vehicleClassificationCargoRack: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      vehicleClassificationMultimediaScreen: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      vehicleClassificationNumberOfSeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      vehicleClassificationVehicleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "vehicles", key: "id" },
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
  vehicleClassifications.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return vehicleClassifications;
};
