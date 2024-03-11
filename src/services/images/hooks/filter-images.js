module.exports = () => {
  return async (context) => {
    const { app, method, result, params, data } = context;

    if (params.user !== undefined) {
      context.params = {
        ...params,
        query: { ...params.query, state: true },
      };
    }
  };
};
