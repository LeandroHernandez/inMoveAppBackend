/* eslint-disable quotes */
// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const exclusiveUsers = sequelizeClient.define(
    "exclusive_users",
    {
      exclusiveUserBankAccount: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      exclusiveUserExactAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      exclusiveUserShirtSize: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      exclusiveUserPantSize: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      exclusiveUserDateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      exclusiveUserCivilState: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "states", key: "id" },
      },
      exclusiveUserChildren: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      exclusiveUserOwnOrRentedVehicle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      exclusiveUserReferenceContact: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      exclusiveUserDriverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "drivers", key: "id" },
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
  exclusiveUsers.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return exclusiveUsers;
};
