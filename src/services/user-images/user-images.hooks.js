const { authenticate } = require("@feathersjs/authentication").hooks;
const deleteUserImages = require("./hooks/delete-user-images");

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [deleteUserImages()],
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
