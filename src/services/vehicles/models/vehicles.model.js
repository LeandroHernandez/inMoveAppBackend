/* eslint-disable quotes */
// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const vehicles = sequelizeClient.define(
    "vehicles",
    {
      vehicleFrontPhoto: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "images", key: "id" },
      },
      vehiclePlateNumber: {
        type: DataTypes.STRING,
        //PENDIENTE A CONSULTAR SI ES O OBLIGATORIO ( POR EJEMPLO EN BICICLETAS O CUALQUIER TIPO DE VEHICULO )
        allowNull: true,
        unique: true,
      },
      vehicleType: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "types", key: "id" },
      },
      vehicleTypeBrand: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "brands", key: "id" },
      },
      vehicleTypeModels: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "models", key: "id" },
      },
      vehicleColor: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      vehiclePropertyCard: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      vehicleSOAT: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      vehicleRightSidePhoto: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "images", key: "id" },
      },
      vehicleLeftSidePhoto: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "images", key: "id" },
      },
      vehicleDashboardPhoto: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "images", key: "id" },
      },
      vehicleBackSidePhoto: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "images", key: "id" },
      },
      vehicleCategory: {
        type: DataTypes.INTEGER,
        allowNull: true,
        // references: { model: "categories", key: "id" },
      },
      vehicleDriverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "drivers", key: "id" },
      },
      vehicleCompleteRegister: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
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
  vehicles.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return vehicles;
};
