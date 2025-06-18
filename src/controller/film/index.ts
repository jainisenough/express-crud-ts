import FilmModel from '../../models/film';
import Controller from '..';

class FilmController extends Controller {
  constructor() {
		super(FilmModel);
	}
}

export default new FilmController();