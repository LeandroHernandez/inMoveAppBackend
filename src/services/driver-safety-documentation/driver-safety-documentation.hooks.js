/* eslint-disable quotes */
const { authenticate } = require("@feathersjs/authentication").hooks;
const { populate } = require("feathers-hooks-common");

const schema = {
  include: [
    {
      service: "images",
      nameAs: "driverSafetyDocumentationJobCertificatePhoto",
      parentField: "driverSafetyDocumentationJobCertificatePhoto", // *** campo padre en el este modelo (ejem: users) contiene el id de la ciudad ***
      childField: "id", // *** campo hijo e la tabla cities ***
      asArray: false,
    },
    {
      service: "images",
      nameAs: "driverSafetyDocumentationCertijovenCertificatePhoto",
      parentField: "driverSafetyDocumentationCertijovenCertificatePhoto", // *** campo padre en el este modelo (ejem: users) contiene el id de la ciudad ***
      childField: "id", // *** campo hijo e la tabla cities ***
      asArray: false,
    },
    {
      service: "images",
      nameAs: "driverSafetyDocumentationPoliceRecordsPhoto",
      parentField: "driverSafetyDocumentationPoliceRecordsPhoto", // *** campo padre en el este modelo (ejem: users) contiene el id de la ciudad ***
      childField: "id", // *** campo hijo e la tabla cities ***
      asArray: false,
    },
    {
      service: "images",
      nameAs: "driverSafetyDocumentationJudicialBackgroundPhoto",
      parentField: "driverSafetyDocumentationJudicialBackgroundPhoto", // *** campo padre en el este modelo (ejem: users) contiene el id de la ciudad ***
      childField: "id", // *** campo hijo e la tabla cities ***
      asArray: false,
    },
    {
      service: "images",
      nameAs: "driverSafetyDocumentationBackgroundConfirmationPhoto",
      parentField: "driverSafetyDocumentationBackgroundConfirmationPhoto", // *** campo padre en el este modelo (ejem: users) contiene el id de la ciudad ***
      childField: "id", // *** campo hijo e la tabla cities ***
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
