/* eslint-disable quotes */
// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;
const { v4: uuid } = require("uuid");

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const types = sequelizeClient.define(
    "types",
    {
      uuid: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: uuid(),
      },
      typeName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      typeClass: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "type_classes", key: "id" },
      },
      typeDescription: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      typeState: {
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
  types.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return types;
};
