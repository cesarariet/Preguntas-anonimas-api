const { parse } = require('dotenv');
const MongoLib = require('../lib/mongo');

class AsksService {
  constructor() {
    this.collection = 'asks';
    this.mongoDB = new MongoLib();
  }
  async getAsks(tags) {
    let query;
    if (tags.course) query = { course: parseInt(tags.course) };
    if (tags.pending) query = { ...query, pending: tags.pending === 'true' };
    if (tags.courseId) query = { ...query, courseId: parseInt(tags.courseId) };

    const asks = await this.mongoDB.getAll(this.collection, query);
    return asks || [];
  }

  async createAsk({ ask }) {
    const createdAskId = await this.mongoDB.create(this.collection, {
      ...ask,
      date: new Date(),
    });
    return createdAskId;
  }
}

module.exports = AsksService;
