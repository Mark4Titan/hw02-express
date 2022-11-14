function tryCatchWrapper(endpointFn, errorNotebook = []) {
  return async (req, res, next) => {
    try {
      await endpointFn(req, res, next);
    } catch (err) {
      
      const [result] = errorNotebook.filter(
        (item) => err.message.includes(item.messIn) && item
      );

      if (result)
        return res.status(result.status).json({ message: result.message });
      else next(err);

      return new Error(err);
    }
  };
}

module.exports = {
  tryCatchWrapper,
};
