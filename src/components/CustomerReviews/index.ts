import Review from '../Review';
import html from './html';
import App from '../../../src/index';
import Component from '../../helper/Component';

export default class CustomerReviews extends Component implements CustomerReviewsInterface {
  private _customerReviews: ReviewProps[] = [];

  constructor() {
    super();
    const customerReviews = localStorage.getItem('customerReviews');
    if (customerReviews) {
      this._customerReviews = JSON.parse(customerReviews);
    }
  }

  // Initialize the customer reviews
  init() {
    this.render();
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
    this.render();
    console.log({ action: 'add', review, customerReviews: this._customerReviews });
  }

  // Update a review
  updateReviewById(id: number, review: ReviewProps) {
    const index = this._customerReviews.findIndex((customerReview) => customerReview.id === id);
    this._customerReviews[index] = review;
    localStorage.setItem('customerReviews', JSON.stringify(this._customerReviews));
    this.render();
  }

  // Delete a review
  deleteReviewById(id: number) {
    const result = this._customerReviews.filter((customerReview) => customerReview.id !== id);
    this._customerReviews = result;
    localStorage.setItem('customerReviews', JSON.stringify(this._customerReviews));
    this.render();
  }

  // Render the customer reviews
  render() {
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
      customerReviewsDiv.innerHTML += customerReview.render() + (index < array.length - 1 ? '<hr>' : '');
    });
    app.appendChild(customerReviewsDiv);
  }

  // Add event listeners
  addEventListeners() {
    document.body.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.id === 'add-customer-review') {
        App.ModalAddReview.open();
      }
    });
  }
}
