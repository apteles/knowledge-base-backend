import schedule from 'node-schedule';
import User from '../models/User';
import Category from '../models/Category';
import Article from '../models/Article';
import Statistics from '../models/schemas/Statistics';

export default async () => {
  schedule.scheduleJob('*/1 * * * *', async () => {
    const users = await User.count();
    const categories = await Category.count();
    const articles = await Article.count();

    const lastStat = await Statistics.findOne(
      {},
      {},
      { sort: { createdAt: -1 } }
    );
    const stats = new Statistics({
      users,
      categories,
      articles,
      createdAt: new Date(),
    });

    const hasChangedUser = !lastStat || stats.users !== lastStat.users;
    const hasChangedCategory =
      !lastStat || stats.category !== lastStat.category;
    const hasChangedArticle = !lastStat || stats.articles !== lastStat.articles;

    if (hasChangedUser || hasChangedCategory || hasChangedArticle)
      await stats.save();
    // eslint-disable-next-line no-console
    console.log('Statistics has been updated');
  });
};
