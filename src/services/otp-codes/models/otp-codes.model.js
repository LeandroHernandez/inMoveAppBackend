/* eslint-disable quotes */
// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const otpCodes = sequelizeClient.define(
    "otp_codes",
    {
      otpIp: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      otpMac: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      otpDevice: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      otpCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      otpType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "otp_types", key: "id" },
      },
      otpChecked: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      otpNumberOfAttempts: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "0",
      },
      state: {
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
  otpCodes.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return otpCodes;
};
