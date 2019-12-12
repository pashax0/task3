export function auth(req, res, next) {
  req.myId = '5df20e622cd13a57dd0e6e65';//TODO add authentification
  next();
}

export function errorHandler(err, req, res, next) {
  res.status(500).send(`Error: ${err}`);
}
