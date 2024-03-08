/* eslint-disable quotes */
// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;
const { v4: uuid } = require("uuid");

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const users = sequelizeClient.define(
    "users",
    {
      userPhone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      userPhoneEmergency: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userPassword: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userFullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userEmail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userEmailEmergency: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userCity: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userImageProfile: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "images", key: "id" },
      },
      // userImageProfile: {
      //   type: DataTypes.STRING,
      //   allowNull: true,
      // },
      userReceiveNotifications: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      userMuteNotifications: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      userUuid: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: uuid(),
      },
      userCurrentRole: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "roles", key: "id" },
        default: 1,
      },
      userSettingId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "settings", key: "id" },
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
  users.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return users;
};
