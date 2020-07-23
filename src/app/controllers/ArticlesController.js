import { QueryTypes } from 'sequelize';

import ResourceController from './Controller';
import Article from '../models/Article';
import validator from '../validation/validator';
import ArticleValidation from '../validation/articles';
import Database from '../../database';

class ArticlesController extends ResourceController {
  constructor() {
    super(Article);
  }

  runValidator() {
    return {
      validator,
      EntityValidation: ArticleValidation,
    };
  }

  transformAll(response, options) {
    return super.transformAll(response, options);
  }

  /**
   * TODO: Refactor
   */
  async relations(req, res) {
    if (!req.query.category) {
      return res.status(400).json({
        message: 'Route require query string categoy',
      });
    }

    const categoryWithChildren = `
      WITH RECURSIVE subcategories (id) AS (
        SELECT id FROM categories WHERE id = ?
        UNION ALL
        SELECT c.id FROM subcategories, categories c
        WHERE parent_id = subcategories.id
      )
      SELECT id FROM subcategories
      `;

    const categories = await Database.conn.query(categoryWithChildren, {
      replacements: [req.query.category],
      raw: true,
      type: QueryTypes.SELECT,
    });

    const result = await Article.scope('includeCategory', 'includeUser', {
      method: ['in', categories.map((v) => v.id)],
    }).paginate({
      page: req.query.page || 1,
      paginate: 6,
    });

    return res.json(
      this.transformAll(result, {
        query: req.query,
        path: req.url,
        baseUrl: `${req.protocol}://${req.headers.host}`,
        current: parseInt(req.query.page, 10) || 1,
      })
    );
  }
}

export default new ArticlesController();
