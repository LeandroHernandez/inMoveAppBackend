/* eslint-disable quotes */
const createUuid = require("../../functions/create-uuid");
const hideUuid = require("../../functions/hide-uuid");

const { authenticate } = require("@feathersjs/authentication").hooks;

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [createUuid()],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [/**hideUuid() */],
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
