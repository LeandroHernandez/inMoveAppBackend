/* eslint-disable quotes */
// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const settings = sequelizeClient.define(
    "settings",
    {
      settingDarkMode: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      settingNotificationSound: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      settingKeepTheScreenOn: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      settingMapBrowser: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // settingZoneBlocking: {
      //   type: DataTypes.BOOLEAN,
      //   allowNull: false,
      // },
      settingRequestFilterByRATING: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      settingRequestFilterByRATE: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      settingFloatingShortcutButton: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      // settingUserId: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
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
  settings.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return settings;
};
