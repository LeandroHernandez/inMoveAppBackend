const findService = require("../../../functions/findService");
const createService = require("../../../functions/createService");

module.exports = () => {
  return async (context) => {
    const { app, method, result, params, data } = context;
    const { userPhone, userPassword } = data;
    const usersDb = await findService(
      context,
      { userPhone: userPhone },
      "users"
    );
    console.log({ usersDb, userPhone, userPassword });
    const authentication = await createService(context, "authentication", {
      strategy: "local",
      userPhone: userPhone,
      userPassword: userPassword,
    });
    console.log({ authentication });
    // app
    //   .service("users")
    //   .find({
    //     query: {
    //       // $limit: 2,
    //       // $and: [{ userState: true }, { userPhone: "333321" }],
    //       userPhone: context.data.userPhone,
    //     },
    //   })
    //   .then((res) => {
    //     console.log({
    //       data: context.data,
    //       resData: res.data,
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
};
