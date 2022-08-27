export function reqLogger(req, res, next) {
  console.log({
    body: req.body,
  });
  next();
}

// test only
/** @type RequestHandler */
export function ipLog(req, res, next) {
  return res.status(200).json({ ip: req.ip });
}
