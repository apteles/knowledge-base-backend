import Statistics from '../models/schemas/Statistics';

class StatisticsController {
  async index(req, res) {
    const stats = await Statistics.findOne({}, {}, { sort: { createdAt: -1 } });
    const defaultResponse = {
      users: 0,
      categories: 0,
      articles: 0,
    };
    res.json(stats || defaultResponse);
  }
}

export default new StatisticsController();
