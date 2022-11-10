function tryCatchWrapper(endpointFn) {
  return async (req, res, next) => {
    try {
      await endpointFn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

function createError(sta = 404, er = "Not Found") {
  const err = new Error(er);
  err.status = sta;
  return err;
}

module.exports = {
  tryCatchWrapper,
  createError,
};
