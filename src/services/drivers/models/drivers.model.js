/* eslint-disable quotes */
// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const drivers = sequelizeClient.define(
    "drivers",
    {
      driverNames: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      driverLastNames: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      driverDateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      driverIdentificationDocument: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      driverEmail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      driverAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      driverDNIConfirmationSelfie: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "images", key: "id" },
      },
      driverReceiveDeliveryNotifications: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: true,
      },
      driverReceiveToursNotifications: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: true,
      },
      driverSettingId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "settings", key: "id" },
      },
      driverUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
      },
      driverState: {
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
  drivers.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return drivers;
};
