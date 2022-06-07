import Review from '../Review';
import Template from './template';

export default class CustomerReviews implements CustomerReviewsInterface {
  // Private variables
  _customerReviews: ReviewProps[] = [];

  constructor() {
    this._customerReviews = [
      {
        id: 1,
        rating: 5,
        title: 'Great product!',
        name: 'John Doe',
        date: '2019-01-01',
        comment:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nisl nunc eget lorem. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nisl nunc eget lorem.'
      },
      {
        id: 2,
        rating: 4,
        title: 'Good product!',
        name: 'Jane Doe',
        date: '2019-01-02',
        comment:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nisl nunc eget lorem. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nisl nunc eget lorem.'
      },
      {
        id: 3,
        rating: 3,
        title: 'Average product!',
        name: 'Jack Doe',
        date: '2019-01-03',
        comment:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nisl nunc eget lorem. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nisl nunc eget lorem.'
      }
    ];
    const customerReviews = localStorage.getItem('customerReviews');
    if (customerReviews) {
      this._customerReviews = JSON.parse(customerReviews);
    }
  }

  // Initialize the customer reviews
  init() {
    this.render();
  }

  // Getters methods - start

  // Customer reviews
  get customerReviews() {
    return this._customerReviews;
  }

  // Average rating
  get averageRating() {
    let sum = 0;
    let count = 0;
    this._customerReviews.forEach((customerReview) => {
      sum += customerReview.rating;
      count++;
    });
    return sum / count;
  }

  // Number of reviews
  get numberOfReviews() {
    return this._customerReviews.length;
  }
  // Getter methods - end
  // Add a review
  addReview(review: ReviewProps) {
    this._customerReviews.push(review);
    localStorage.setItem('customerReviews', JSON.stringify(this._customerReviews));
  }

  getCustomerReviewById(id: number) {
    const result = this._customerReviews.find((customerReview) => customerReview.id === id);
    if (!result) {
      throw new Error('No customer review found');
    }
    return result;
  }

  // Update a review
  updateReviewById(id: number, review: ReviewProps) {
    const index = this._customerReviews.findIndex((customerReview) => customerReview.id === id);
    this._customerReviews[index] = review;
    localStorage.setItem('customerReviews', JSON.stringify(this._customerReviews));
  }

  // Delete a review
  deleteReviewById(id: number) {
    const result = this._customerReviews.filter((customerReview) => customerReview.id !== id);
    this._customerReviews = result;
    localStorage.setItem('customerReviews', JSON.stringify(this._customerReviews));
  }

  // Render the customer reviews
  render() {
    const { averageRating, numberOfReviews } = this;
    const app = document.getElementById('app');
    if (!app) {
      throw new Error('No app element found');
    }
    const overview = Template({
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
}
