module.exports = function (context, query, service) {
    const { app } = context;
    return new Promise(function(resolve, reject) {
        app.service(service).find({query}).then( (dataResult) => {
            resolve(dataResult)
        }).catch(error => {
            reject(error);
        })
    })
}
