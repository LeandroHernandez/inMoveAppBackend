/* eslint-disable quotes */
// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const companies = sequelizeClient.define(
    "companies",
    {
      companyBusinessName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      companyRUC: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      companyLineOfWork: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      companyPhoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      companyEmail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      companySubject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      companyMessage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      companyUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
      },
      companyState: {
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
  companies.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return companies;
};
