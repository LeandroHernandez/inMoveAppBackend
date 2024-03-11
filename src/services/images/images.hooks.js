/* eslint-disable quotes */
const createUuid = require("../../functions/create-uuid");
const hideUuid = require("../../functions/hide-uuid");
const filterImages = require("./hooks/filter-images");

const { authenticate } = require("@feathersjs/authentication").hooks;

module.exports = {
  before: {
    all: [ /**authenticate('jwt') */ ],
    find: [filterImages()],
    get: [ filterImages() ],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
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
