/* eslint-disable linebreak-style */
/* eslint-disable quotes */
const { populate } = require("feathers-hooks-common");

const { authenticate } = require("@feathersjs/authentication").hooks;

const schema = {
  include: [
    {
      service: "images",
      nameAs: "DNIConfirmationSelfie",
      parentField: "driverDNIConfirmationSelfie", // *** campo padre en el este modelo (ejem: users) contiene el id de la ciudad ***
      childField: "id", // *** campo hijo e la tabla cities ***
      asArray: false,
    },
    // {
    //   service: "settings",
    //   nameAs: "setting",
    //   parentField: "driverSettingId", // *** campo padre en el este modelo (ejem: users) contiene el id de la ciudad ***
    //   childField: "id", // *** campo hijo e la tabla cities ***
    //   asArray: false,
    // },
  ],
};

module.exports = {
  before: {
    all: [/**authenticate("jwt") */],
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
