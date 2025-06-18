import CustomerModel from '../../models/customer';
import Controller from '..';

class CustomerController extends Controller {
  constructor() {
		super(CustomerModel);
	}
}

export default new CustomerController();