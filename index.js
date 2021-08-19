const express = require('express');
const cors = require('cors');
const app = express();

const { config } = require('./config/index');
const {
  logError,
  wrapError,
  errorHandler,
} = require('./utils/middleware/errorHandlers.js');

const notFoundHandler = require('./utils/middleware/notFoundHandler.js');

const moviesApi = require('./routes/asks.js');
app.use(cors());
app.use(express.json());
moviesApi(app);

app.use(logError);
app.use(wrapError);
app.use(errorHandler);
app.use(notFoundHandler);

app.listen(config.port, function () {
  console.log(`Escuchando el puerto ${config.port}`);
});
