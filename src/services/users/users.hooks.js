/* eslint-disable linebreak-style */
/* eslint-disable quotes */
const { authenticate } = require("@feathersjs/authentication").hooks;
const createUUID = require("./../../functions/create-uuid");
const { populate } = require("feathers-hooks-common");

const registerDevice = require("./hooks/register-device");
const phoneEmail = require("./hooks/phone-email");
const filterUser = require("./hooks/filter-users");
const deleteAllUserImages = require("./hooks/delete-all-user-images");
const setUserRole = require("./hooks/set-user-role");
const otpCode = require("../otp-code/hooks/otp-code");

const { hashPassword, protect } =
  require("@feathersjs/authentication-local").hooks;

const schema = {
  include: [
    {
      service: "cities",
      nameAs: "city",
      parentField: "userCity", // *** campo padre en el este modelo (ejem: users) contiene el id de la ciudad ***
      childField: "id", // *** campo hijo e la tabla cities ***
      asArray: false,
    },
    {
      service: "images",
      nameAs: "profileImage",
      parentField: "userImageProfile", // *** campo padre en el este modelo (ejem: users)  ***
      childField: "id", // *** campo hijo e la tabla images ***
      asArray: false,
      state: true,
    },
    {
      service: "roles",
      nameAs: "currentRole",
      parentField: "userCurrentRole", // *** campo padre en el este modelo (ejem: users) contiene el id de la ciudad ***
      childField: "id", // *** campo hijo e la tabla cities ***
      asArray: false,
    },
    {
      service: "drivers",
      nameAs: "dataDriver",
      parentField: "id", // *** campo padre en el este modelo (ejem: users) contiene el id de la ciudad ***
      childField: "driverUserId", // *** campo hijo e la tabla cities ***
      asArray: false,
      include: [
        {
          service: "images",
          nameAs: "DNIConfirmationSelfie",
          parentField: "driverDNIConfirmationSelfie", // *** id de la image en la tabla drivers ***
          childField: "id", // *** id de de la image en la tabla image ***
          asArray: false,
        },
      ],
    },
  ],
};

module.exports = {
  before: {
    all: [],
    find: [authenticate("jwt"), filterUser()],
    get: [authenticate("jwt"), filterUser()],
    create: [hashPassword("userPassword"), createUUID(), phoneEmail()],
    // create: [hashPassword("userPassword"), createUUID(), validateUser()],
    update: [hashPassword("userPassword"), authenticate("jwt"), phoneEmail()],
    patch: [hashPassword("userPassword"), authenticate("jwt"), phoneEmail()],
    remove: [authenticate("jwt"), deleteAllUserImages()],
  },

  after: {
    all: [
      // Make sure the userPassword field is never sent to the client
      // Always must be the last hook
      // populate({ schema }),
      protect("userPassword"),
    ],
    find: [populate({ schema })],
    get: [populate({ schema })],
    // create: [registerDevice(), phoneEmail(), setUserRole()],
    create: [registerDevice(), setUserRole()],
    // update: [phoneEmail(), populate({ schema })],
    update: [populate({ schema })],
    // patch: [setUserRole(), phoneEmail(), populate({ schema })],
    patch: [setUserRole(), populate({ schema })],
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
