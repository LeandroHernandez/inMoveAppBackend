/* eslint-disable quotes */
// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;
const { v4: uuid } = require("uuid");

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const images = sequelizeClient.define(
    "images",
    {
      uuid: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: uuid(),
      },
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
      fileType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "types", key: "id" },
      },
      userFileProfileCondition: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      fileExpirerDate: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fileUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fileUserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
  images.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return images;
};
