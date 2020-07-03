import { object, string } from 'yup';

class ArticleValidation {
  static rules() {
    return object().shape({
      name: string().required(),
      description: string().required(),
      image_url: string().required(),
      content: string().required(),
      category_id: string().required(),
      user_id: string().required(),
    });
  }
}

export default ArticleValidation;
