export function auth(req, res, next) {
  req.myId = '5df29d11d64dcb7ccc0c7fe9';//TODO add authentification
  next();
}

export function errorHandler(err, req, res, next) {
  let statusCode = 500;
  if(err && err.name === 'CastError') {
    statusCode = 400;
  }
  res.status(statusCode).send(err);
}
