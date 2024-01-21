// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const parameters = sequelizeClient.define('parameters', {
    parameterName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    parameterValue: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    parameterDescription: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    parameterState: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  parameters.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return parameters;
};
