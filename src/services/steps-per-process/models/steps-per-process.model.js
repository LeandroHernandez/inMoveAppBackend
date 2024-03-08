/* eslint-disable quotes */
// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const stepsPerProcess = sequelizeClient.define(
    "steps_per_process",
    {
      stepPerProcessProcessName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // stepPerProcessSteps: {
      //   type: DataTypes.ARRAY(DataTypes.INTEGER),
      //   allowNull: false,
      // },
      stepPerProcessSteps: {
        type: DataTypes.ARRAY({
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: "steps", key: "id" },
        }),
        allowNull: false,
      },
      stepPerProcessProcessDescription: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      stepPerProcessType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "types", key: "id" },
      },
      stepPerProcessReference: {
        type: DataTypes.STRING,
        allowNull: true,
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
  stepsPerProcess.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return stepsPerProcess;
};
