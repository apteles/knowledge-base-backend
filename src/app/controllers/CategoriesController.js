import ResourceController from './Controller';
import Category from '../models/Category';
import validator from '../validation/validator';
import CategoryValidation from '../validation/categories';
import { generatePath, toTree } from '../utils/index';

class CategoriesController extends ResourceController {
  constructor() {
    super(Category);
  }

  runValidator() {
    return {
      validator,
      EntityValidation: CategoryValidation,
    };
  }

  transformAll(response, { query }) {
    if (query.tree) return toTree(generatePath(response));
    return generatePath(response);
  }
}

export default new CategoriesController();
