module.exports = function (context, id, data, service) {
  const { app, params, result } = context;
  return new Promise(function (resolve, reject) {
    app
      .service(service)
      .patch(id, data)
      .then((dataResult) => {
        resolve(dataResult);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
