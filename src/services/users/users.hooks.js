/* eslint-disable quotes */
const { authenticate } = require("@feathersjs/authentication").hooks;
const createUUID = require("./../../functions/create-uuid");
const { populate } = require("feathers-hooks-common");

const registerDevice = require("./hooks/register-device");
const filterUser = require("./hooks/filter-users");
const deleteAllUserImages = require("./hooks/delete-all-user-images");
const setUserRole = require("./hooks/set-user-role");
const registerStepsPerUserProcess = require("./hooks/register-steps-per-user-process");

const { hashPassword, protect } =
  require("@feathersjs/authentication-local").hooks;

const schema = {
  include: [
    {
      service: "cities",
      nameAs: "city",
      parentField: "userCity", // *** campo padre en el este modelo (ejem: users) contiene el id de la ciudad ***
      childField: "id", // *** campo hijo e la tabla cities ***
      asArray: false,
    },
  ],
};

module.exports = {
  before: {
    all: [],
    find: [authenticate("jwt"), filterUser()],
    get: [authenticate("jwt"), filterUser()],
    create: [hashPassword("userPassword"), createUUID()],
    // create: [hashPassword("userPassword"), createUUID(), validateUser()],
    update: [hashPassword("userPassword"), authenticate("jwt")],
    patch: [hashPassword("userPassword"), authenticate("jwt")],
    remove: [authenticate("jwt"), deleteAllUserImages()],
  },

  after: {
    all: [
      // Make sure the userPassword field is never sent to the client
      // Always must be the last hook
      populate({ schema }),
      protect("userPassword"),
    ],
    find: [],
    get: [],
    create: [registerDevice(), setUserRole(), registerStepsPerUserProcess()],
    update: [],
    patch: [setUserRole()],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
