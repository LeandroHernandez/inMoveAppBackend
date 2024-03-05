/* eslint-disable quotes */
const { populate } = require("feathers-hooks-common");

const { authenticate } = require("@feathersjs/authentication").hooks;

const schema = {
  include: [
    {
      service: "types",
      nameAs: "bodyWorkType",
      parentField: "vehicleClassificationBodyWorkType",
      childField: "id",
      asArray: false,
    },
    {
      service: "states",
      nameAs: "vehicleCondition",
      parentField: "vehicleClassificationVehicleCondition",
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
