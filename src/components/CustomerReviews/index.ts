import Review from '../Review';
import html from './html';
import App from '../../../src/index';
import Component from '../../helpers/Component';

export default class CustomerReviews extends Component implements CustomerReviewsInterface {
  private _customerReviews: ReviewProps[] = [];

  constructor() {
    super();
    const customerReviews = localStorage.getItem('customerReviews');
    if (customerReviews) {
      this._customerReviews = JSON.parse(customerReviews);
    }
    // this._customerReviews = [
    //   {
    //     id: 1,
    //     rating: 5,
    //     title: 'Great product',
    //     comment: 'This product is awesome!',
    //     name: 'John Doe',
    //     date: '2019-01-01'
    //   },
    //   {
    //     id: 2,
    //     rating: 4,
    //     title: 'Good product',
    //     comment: 'This product is good!',
    //     name: 'Jane Doe',
    //     date: '2019-01-02'
    //   },
    //   {
    //     id: 3,
    //     rating: 3,
    //     title: 'Average product',
    //     comment: 'This product is average!',
    //     name: 'Jack Doe',
    //     date: '2019-01-03'
    //   },
    //   {
    //     id: 4,
    //     rating: 2,
    //     title: 'Bad product',
    //     comment: 'This product is bad!',
    //     name: 'Joe Doe',
    //     date: '2019-01-04'
    //   },
    //   {
    //     id: 5,
    //     rating: 1,
    //     title: 'Terrible product',
    //     comment: 'This product is terrible!',
    //     name: 'Jill Doe',
    //     date: '2019-01-05'
    //   }
    // ];
  }

  // Initialize the customer reviews
  init() {
    this.renderForm();
    this.addEventListeners();
  }

  // Customer reviews
  get customerReviews() {
    return this._customerReviews;
  }

  // Average rating rounded to the nearest half
  get averageRating() {
    const ratings = this._customerReviews.map((review) => review.rating);
    const averageRating = ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length;
    return Math.round(averageRating * 2) / 2;
  }

  // Number of reviews
  get numberOfReviews() {
    return this._customerReviews.length;
  }

  // Get the customer review by id
  getCustomerReviewById(id: number) {
    const result = this._customerReviews.find((customerReview) => customerReview.id === id);
    if (!result) {
      App.Notifications.add({
        type: 'danger',
        message: 'Customer review not found',
        title: 'Error'
      });
    }
    return result;
  }

  // Add a review
  addReview(review: ReviewProps) {
    this._customerReviews.push(review);
    localStorage.setItem('customerReviews', JSON.stringify(this._customerReviews));
    this.renderForm();
  }

  // Update a review
  updateReviewById(id: number, review: ReviewProps) {
    const index = this._customerReviews.findIndex((customerReview) => customerReview.id === id);
    this._customerReviews[index] = review;
    localStorage.setItem('customerReviews', JSON.stringify(this._customerReviews));
    this.renderForm();
  }

  // Delete a review
  deleteReviewById(id: number) {
    const result = this._customerReviews.filter((customerReview) => customerReview.id !== id);
    this._customerReviews = result;
    localStorage.setItem('customerReviews', JSON.stringify(this._customerReviews));
    this.renderForm();
  }

  // Render the customer reviews
  renderForm() {
    const { averageRating, numberOfReviews } = this;
    const app = document.getElementById('app');
    const overview = html({
      averageRating,
      numberOfReviews
    });
    app.innerHTML = overview;

    const customerReviewsDiv = document.createElement('div');
    customerReviewsDiv.id = 'customer-reviews';
    this._customerReviews.forEach((review, index, array) => {
      const customerReview = new Review({ ...review });
      customerReviewsDiv.innerHTML += customerReview.renderForm() + (index < array.length - 1 ? '<hr>' : '');
    });
    app.appendChild(customerReviewsDiv);
  }

  // Add event listeners
  addEventListeners() {
    document.body.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.id === 'add-customer-review') {
        App.ModalAddReview.openModal();
      }
    });
  }
}
