const CORS_ENV = 'http://localhost:4200';
exports.activate = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', CORS_ENV);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
};
