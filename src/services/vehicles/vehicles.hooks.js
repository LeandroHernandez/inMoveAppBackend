/* eslint-disable quotes */
const { populate } = require("feathers-hooks-common");

const { authenticate } = require("@feathersjs/authentication").hooks;

const schema = {
  include: [
    {
      service: "types",
      nameAs: "Type",
      parentField: "vehicleType",
      childField: "id",
      asArray: false,
    },
    {
      service: "brands",
      nameAs: "Brand",
      parentField: "vehicleTypeBrand",
      childField: "id",
      asArray: false,
    },
    {
      service: "models",
      nameAs: "Model",
      parentField: "vehicleTypeModels",
      childField: "id",
      asArray: false,
    },
    {
      service: "categories",
      nameAs: "Category",
      parentField: "vehicleCategory",
      childField: "id",
      asArray: false,
    },
  ],
};

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [],
    get: [],
    create: [],
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
