const createService = require("../../../functions/createService");
const findService = require("../../../functions/findService");

module.exports = () => {
  return async (context) => {
    const { data } = context;
    const { userPhone } = data;
    console.log("SETUSERROLE-------");
    console.log({ context });
    let response = {};

    const userDbResponse = await findService(context, { userPhone }, "users");

    if (!userDbResponse.data.length > 0) {
      response = {};
    }

    // const userRoleRegisterCreated = await createService(context, 'user-roles', {
    //   userRoleIdUser:
    // })

    // console.log('*** generateOtpCode ***');
    // console.log(data);

    // context.result = response;
  };
};
