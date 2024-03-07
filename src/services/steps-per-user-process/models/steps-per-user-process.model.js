/* eslint-disable quotes */
// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const stepsPerUserProcess = sequelizeClient.define(
    "steps_per_user_process",
    {
      stepPerUserProcessReadySteps: {
        type: DataTypes.ARRAY({
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: "steps", key: "id" },
        }),
        allowNull: false,
      },
      stepPerUserProcessStepsPerProcessId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "steps_per_process", key: "id" },
      },
      stepPerUserProcessInvalidSteps: {
        type: DataTypes.ARRAY({
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: "steps", key: "id" },
        }),
        allowNull: false,
      },
      stepPerUserProcessUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
      },
      // stepPerUserProcessOwnerId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
      // stepPerUserProcessOwnerRoleId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: { model: "roles", key: "id" },
      // },
      // stepPerUserProcessDriverId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: { model: "drivers", key: "id" },
      // },
      stepPerUserProcessType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "types", key: "id" },
      },
      stepPerUserProcessState: {
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
  stepsPerUserProcess.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return stepsPerUserProcess;
};
