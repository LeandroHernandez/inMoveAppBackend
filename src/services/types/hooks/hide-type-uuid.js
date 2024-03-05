/* eslint-disable quotes */
const md5 = require("md5");

module.exports = () => {
  return async (context) => {
    const { result, method } = context;

    if (method === "find") {
      const array = [];
      result.data.forEach((typeElement) => {
        array.push({
          ...typeElement,
          uuid: md5(typeElement.uuid),
        });
      });
      context.result.data = array;
    } else {
      context.result.uuid = md5(context.result.uuid);
    }
  };
};
