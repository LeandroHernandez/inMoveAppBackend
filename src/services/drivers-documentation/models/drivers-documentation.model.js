/* eslint-disable quotes */
// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const driversDocumentation = sequelizeClient.define(
    "drivers_documentation",
    {
      driverDocumentationDriversLicense: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      driverDocumentationCategory: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "categories", key: "id" },
      },
      driverDocumentationLicensePhotoOnTheFront: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "images", key: "id" },
      },
      driverDocumentationLicensePhotoFromBehind: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "images", key: "id" },
      },
      driverDocumentationDateOfIssue: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      driverDocumentationDateOfExpiry: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      driverDocumentationDriverId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "drivers", key: "id" },
      },
      driverDocumentationState: {
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
  driversDocumentation.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return driversDocumentation;
};
