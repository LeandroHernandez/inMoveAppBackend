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
        allowNull: false,
        references: { model: "user_images", key: "id" },
      },
      vehiclePlateNumber: {
        type: DataTypes.STRING,
        //PENDIENTE A CONSULTAR SI ES O OBLIGATORIO ( POR EJEMPLO EN BICICLETAS O CUALQUIER TIPO DE VEHICULO )
        allowNull: false,
        unique: true,
      },
      vehicleType: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
        allowNull: false,
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
        allowNull: false,
        references: { model: "user_images", key: "id" },
      },
      vehicleLeftSidePhoto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "user_images", key: "id" },
      },
      vehicleDashboardPhoto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "user_images", key: "id" },
      },
      vehicleBackSidePhoto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "user_images", key: "id" },
      },
      vehicleCategories: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
      },
      vehicleDriverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "drivers", key: "id" },
      },
      vehicleState: {
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
  vehicles.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return vehicles;
};
