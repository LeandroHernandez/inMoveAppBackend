// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const userImages = sequelizeClient.define(
    "user_images",
    {
      userFileName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userFileDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userFileReference: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userFileState: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userFileUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
      },
      userFileUrl: {
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
  userImages.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return userImages;
};
