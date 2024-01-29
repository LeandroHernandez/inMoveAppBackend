module.exports = function (context, service, data) {
  // console.log('*** context *** ', context);
  // console.log('*** service *** ', service);
  // console.log('*** data *** ', data);
  const { app, params, result } = context;
  return new Promise(function (resolve, reject) {
    app.service(service).create(data, { query: {} }).then((dataResult) => {
      resolve(dataResult)
    }).catch(error => {
      reject(error);
    })
  })
}
