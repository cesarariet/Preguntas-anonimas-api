const MongoLib = require('../lib/mongo');

class AsksService {
  constructor() {
    this.collection = 'asks';
    this.mongoDB = new MongoLib();
  }
  async getAsks({ tags }) {
    const query = tags && { tags: { $in: tags } };

    const asks = await this.mongoDB.getAll(this.collection, query);
    return asks || [];
  }


  async createAsk(ask) {
    
    const createdAskId = await this.mongoDB.create(this.collection, ask);
    return createdAskId;
  }
}

module.exports = AsksService;
