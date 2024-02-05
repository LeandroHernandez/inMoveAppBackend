// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const advertisingImages = sequelizeClient.define(
    "advertising_images",
    {
      imageName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageFile: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageState: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageValidityDeadline: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      imageReference: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageURL: {
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
  advertisingImages.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return advertisingImages;
};
