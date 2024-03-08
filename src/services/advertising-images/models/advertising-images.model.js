/* eslint-disable quotes */
// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const advertisingImages = sequelizeClient.define(
    "advertising_images",
    {
      fileName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fileDescription: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fileReference: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fileExpirerDate: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fileUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
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
  advertisingImages.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return advertisingImages;
};
