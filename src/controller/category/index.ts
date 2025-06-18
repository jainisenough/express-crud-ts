import CategoryModel from '../../models/category';
import Controller from '..';

class CategoryController extends Controller {
  constructor() {
		super(CategoryModel);
	}
}

export default new CategoryController();