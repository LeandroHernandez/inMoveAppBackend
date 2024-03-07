/* eslint-disable quotes */
const { populate } = require("feathers-hooks-common");
const createUuid = require("../../functions/create-uuid");
// const hideTypeUuid = require("./hooks/hide-type-uuid");
const validateUuid = require("./hooks/validate-uuid");

const { authenticate } = require("@feathersjs/authentication").hooks;

const schema = {
  include: [
    {
      service: "type-classes",
      nameAs: "class",
      parentField: "typeClass", // *** campo padre en el este modelo (ejem: users) contiene el id de la ciudad ***
      childField: "id", // *** campo hijo e la tabla cities ***
      asArray: false,
    },
  ],
};

module.exports = {
  before: {
    all: [authenticate("jwt"), validateUuid()],
    find: [],
    get: [],
    create: [createUuid()],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [populate({ schema })],
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
