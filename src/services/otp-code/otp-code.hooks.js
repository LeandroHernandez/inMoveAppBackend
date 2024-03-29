/* eslint-disable quotes */
const otpCode = require("./hooks/otp-code");

const { authenticate } = require("@feathersjs/authentication").hooks;

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [otpCode()],
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
