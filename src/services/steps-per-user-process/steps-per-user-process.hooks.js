/* eslint-disable quotes */
const { populate } = require("feathers-hooks-common");

const { authenticate } = require("@feathersjs/authentication").hooks;

const schema = {
  include: [
    {
      service: "steps-per-process",
      nameAs: "stepsPerProcess",
      parentField: "stepPerUserProcessStepsPerProcessId", // *** campo padre en el este modelo (ejem: users) contiene el id de la ciudad ***
      childField: "id", // *** campo hijo e la tabla cities ***
      asArray: false,
    },
    {
      service: "roles",
      nameAs: "ownerRole",
      parentField: "stepPerUserProcessOwnerRoleId", // *** campo padre en el este modelo (ejem: users) contiene el id de la ciudad ***
      childField: "id", // *** campo hijo e la tabla cities ***
      asArray: false,
    },
    {
      service: "steps",
      nameAs: "readySteps",
      parentField: "stepPerUserProcessReadySteps", // *** campo padre en el este modelo (ejem: users) contiene el id de la ciudad ***
      childField: "id", // *** campo hijo e la tabla cities ***
      asArray: true,
    },
    {
      service: "types",
      nameAs: "processType",
      parentField: "stepPerUserProcessProcessType", // *** campo padre en el este modelo (ejem: users) contiene el id de la ciudad ***
      childField: "id", // *** campo hijo e la tabla cities ***
      asArray: true,
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
