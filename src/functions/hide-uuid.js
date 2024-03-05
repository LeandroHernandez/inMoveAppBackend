/* eslint-disable quotes */
const md5 = require("md5");

function change(body) {
  body = {
    ...body,
    uuid: md5(body.uuid),
  };
  // if ("id" in body) {
  //   delete body.id;
  // }
  return body;
}

module.exports = () => {
  return async (context) => {
    const { result, method } = context;

    if (method === "find") {
      const array = [];
      result.data.forEach((item) => {
        array.push(change(item));
      });
      context.result.data = array;
    } else {
      context.result = change(result);
    }
  };
};
