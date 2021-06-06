const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const Socket = require('./controller/socket.controller');

// load config
dotenv.config({
  path: './config/config.env',
});

// Middlewares...
const mongoose = require('./middlewares/mongoose');
const bodyParser = require('./middlewares/body-parser');
const auth = require('./controller/auth.controller');

// Routes...
const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');
const csrfProtection = require('./middlewares/csrf');
const contactRoute = require('./routes/contact.route');
const conversationRoute = require('./routes/conversation.route');
const channelCtrl = require('./controller/channel.controller');

const PORT = process.env.PORT || 2000;

const app = express();
const http = require('http').createServer(app);
const options = {
  /* ... */
};
const io = require('socket.io')(http, options);

const appRoot = path.join(__dirname, '..', 'client', 'dist');

// app.use(Cors.activate);
app.use(bodyParser);
app.use(csrfProtection);

// Logging
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }

// helmet
app.use(helmet());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(appRoot));

app.use('/api/auth', authRoute);
app.use('/api/user', auth.validator, userRoute);
app.use('/api/contacts', auth.validator, contactRoute);
app.use('/api/conversations', auth.validator, conversationRoute);

app.get('/', (req, res, next) => {
  res.sendFile(path.join(appRoot, 'index.html'));
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

Socket.init(io);

mongoose.connect(() => {
  http.listen(PORT);
  console.log('server started at port:' + PORT);
});
