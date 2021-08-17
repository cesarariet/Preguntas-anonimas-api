const express = require('express');

const AsksService = require('../services/asks');

// const {
//   movieIdSchema,
//   createMovieSchema,
// } = require('../utils/schemas/movies.js');

const cacheResponse = require('../utils/cacheResponse');

// const validationHandler = require('../utils/middleware/validationHandler');
function moviesApi(app) {
  const router = express.Router();
  app.use('/api/asks', router);

  const asksService = new AsksService();

  router.get('/', async function (req, res, next) {
    cacheResponse(res, 300);
    const { tags } = req.query;
    try {
      const asks = await asksService.getAsks({ tags });
      res.status(200).json({
        data: asks,
        message: 'Asks listed',
      });
    } catch (error) {
      next(error);
    }
  });


  router.post(
    '/',
    async function (req, res, next) {
      const { body: ask } = req;

      console.log({ ask });

      try {
        const createdAskId = await asksService.createAsk({ ask });
        res.status(201).json({
          data: createdAskId,
          message: 'Ask created',
        });
      } catch (error) {
        next(error);
      }
    }
  );

}

module.exports = moviesApi;
