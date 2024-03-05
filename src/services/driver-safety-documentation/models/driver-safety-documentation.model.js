/* eslint-disable quotes */
// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const driverSafetyDocumentation = sequelizeClient.define(
    "driver_safety_documentation",
    {
      driverSafetyDocumentationJobCertificatePhoto: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "images", key: "id" },
      },
      driverSafetyDocumentationCertijovenCertificatePhoto: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "images", key: "id" },
      },
      driverSafetyDocumentationPoliceRecordsPhoto: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "images", key: "id" },
      },
      driverSafetyDocumentationJudicialBackgroundPhoto: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "images", key: "id" },
      },
      driverSafetyDocumentationBackgroundConfirmationPhoto: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "images", key: "id" },
      },
      driverSafetyDocumentationDriverId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "drivers", key: "id" },
      },
      driverSafetyDocumentationState: {
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
  driverSafetyDocumentation.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return driverSafetyDocumentation;
};
