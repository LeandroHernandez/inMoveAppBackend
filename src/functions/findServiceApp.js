module.exports = function (app, query, service) {
  return new Promise(function (resolve, reject) {
    app
      .service(service)
      .find({ query })
      .then((dataResult) => {
        resolve(dataResult);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
