
module.exports = () => {
  return async context => {
    const { app, method, result, params, data } = context;

    if (params.user !== undefined) {
      console.log('*** params.query ***');
      console.log(params.query);
      console.log('*** user ***');
      console.log(params.user);
      console.log('FILTERUSERS', { ...params.query, id: params.user.id })
      context.params = { ...params, query: { ...params.query, id: params.user.id } }
    }
  }
}
