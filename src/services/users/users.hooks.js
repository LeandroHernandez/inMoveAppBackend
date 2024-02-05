const { authenticate } = require("@feathersjs/authentication").hooks;
const createUUID = require("./../../functions/create-uuid");
const validateUser = require("./hooks/validate-user");
const filterUser = require("./hooks/filter-users");

const { hashPassword, protect } =
  require("@feathersjs/authentication-local").hooks;

module.exports = {
  before: {
    all: [],
    find: [authenticate("jwt"), filterUser()],
    get: [authenticate("jwt"), filterUser()],
    create: [hashPassword("userPassword"), createUUID()],
    // create: [hashPassword("userPassword"), createUUID(), validateUser()],
    update: [hashPassword("userPassword"), authenticate("jwt")],
    patch: [hashPassword("userPassword"), authenticate("jwt")],
    remove: [authenticate("jwt")],
  },

  after: {
    all: [
      // Make sure the userPassword field is never sent to the client
      // Always must be the last hook
      protect("userPassword"),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
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