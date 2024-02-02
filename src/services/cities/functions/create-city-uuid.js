const { v4: uuid } = require("uuid");
module.exports = () => {
  return async (context) => {
    try {
      const { app, method, result, params, data } = context;
      context.data = {
        cityCode: uuid(),
        ...data,
      };
      return context;
    } catch (error) {
      return context;
      console.log(error);
    }
  };
};
