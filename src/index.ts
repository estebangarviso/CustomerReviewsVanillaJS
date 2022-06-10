import './core/Extensions';
import ModalAddReview from './components/ModalAddReview';
import Notifications from './components/Notifications';
import CustomerReviews from './components/CustomerReviews';
import './index.scss';

const App = {
  ModalAddReview: new ModalAddReview(),
  Notifications: new Notifications(),
  CustomerReviews: new CustomerReviews()
};

Object.values(App).forEach((component) => {
  component.init();
});

export default App;
