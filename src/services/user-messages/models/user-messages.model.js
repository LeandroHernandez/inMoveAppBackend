/* eslint-disable quotes */
// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const userMessages = sequelizeClient.define(
    "user_messages",
    {
      userMessage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userMessageDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userMessageResult: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userMessageReference: {
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
  userMessages.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return userMessages;
};
