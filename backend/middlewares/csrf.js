const express = require('express');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const invalidCsrfToken = require('./invalidCsrfToken');

const csrfProtection = csrf({ cookie: true });
const router = express.Router();

router.use(cookieParser());
router.use(csrfProtection);
router.use(invalidCsrfToken);

router.all('*', function (req, res, next) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  next();
});

module.exports = router;
