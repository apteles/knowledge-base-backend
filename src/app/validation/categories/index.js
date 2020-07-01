import { object, string } from 'yup';

class CategoryValidation {
  static rules() {
    return object().shape({
      name: string().required().min(4),
    });
  }
}

export default CategoryValidation;
