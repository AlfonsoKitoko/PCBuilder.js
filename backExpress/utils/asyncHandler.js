exports.wrapAsync = (fn) =>
  (req, res, next) =>
    fn(req, res, next).catch(e => next(e))