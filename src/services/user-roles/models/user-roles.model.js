/* eslint-disable quotes */
// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const userRoles = sequelizeClient.define(
    "user_roles",
    {
      userRoleIdUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
      },
      userRoleIdRole: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "roles", key: "id" },
      },
      state: {
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
  userRoles.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return userRoles;
};
