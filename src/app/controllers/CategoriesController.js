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

  transformAll(response, options) {
    const resource = super.transformAll(response, options);

    if (options.query.tree) {
      return {
        data: [...toTree(generatePath(resource.data))],
        // eslint-disable-next-line no-underscore-dangle
        _links: { ...resource._links },
      };
    }
    return {
      data: [...generatePath(resource.data)],
      // eslint-disable-next-line no-underscore-dangle
      _links: { ...resource._links },
    };
  }
}

export default new CategoriesController();
