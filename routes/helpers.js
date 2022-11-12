function tryCatchWrapper(endpointFn, errorNot = []) {
  return async (req, res, next) => {
    try {
      await endpointFn(req, res, next);
    } catch (err) {
      const [result] = errorNot.filter(
        (item) => err.message.includes(item.messIn) && item
      );

      if (result)
        return res.status(result.status).json({ message: result.message });
      else next(err);
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
