import ActorModel from '../../models/actors';
import Controller from '..';

class ActorController extends Controller {
  constructor() {
		super(ActorModel);
	}
}

export default new ActorController();