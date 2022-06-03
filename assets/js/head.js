class CustomerReviews {
  constructor() {
    this.customerReviews = [
      {
        id: 1,
        rating: 5,
        title: 'Great product!',
        name: 'John Doe',
        date: '2019-01-01',
        comment:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nisl nunc eget lorem. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nisl nunc eget lorem.',
      },
      {
        id: 2,
        rating: 4,
        title: 'Good product!',
        name: 'Jane Doe',
        date: '2019-01-02',
        comment:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nisl nunc eget lorem. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nisl nunc eget lorem.',
      },
      {
        id: 3,
        rating: 3,
        title: 'Average product!',
        name: 'Jack Doe',
        date: '2019-01-03',
        comment:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nisl nunc eget lorem. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nisl nunc eget lorem.',
      },
    ];
    const customerReviews = localStorage.getItem('customerReviews');
    if (customerReviews) {
      this.customerReviews = JSON.parse(customerReviews);
    }

    this.templates = Templates;
  }

  // Initialize the customer reviews
  init() {
    const body = document.getElementById('body');
    // Append the customer reviews modal to the body
    body.innerHTML += this.templates.customerReviewModal();
    this.render();
    this.addEventListeners();
  }

  // Get customer reviews length
  getCustomerReviewsLength() {
    return this.customerReviews.length;
  }

  // Get the customer reviews
  getCustomerReviews() {
    return this.customerReviews;
  }

  // Get the average rating
  getAverageRating() {
    let sum = 0;
    let count = 0;
    this.customerReviews.forEach((customerReview) => {
      sum += customerReview.rating;
      count++;
    });
    return sum / count;
  }

  // Get the number of reviews
  getNumberOfReviews() {
    return this.customerReviews.length;
  }

  // Add a review
  addReview(review) {
    this.customerReviews.push(review);
    localStorage.setItem('customerReviews', JSON.stringify(this.customerReviews));
  }

  getCustomerReviewById(id) {
    return this.customerReviews.find((customerReview) => customerReview.id === id);
  }

  // Update a review
  updateReviewById(id, review) {
    const index = this.customerReviews.findIndex((customerReview) => customerReview.id === id);
    this.customerReviews[index] = review;
    localStorage.setItem('customerReviews', JSON.stringify(this.customerReviews));
  }

  // Render the customer reviews
  render() {
    const app = document.getElementById('app');
    const overview = this.templates.customerReviewsOverview({
      averageRating: this.getAverageRating(),
      numberOfReviews: this.getNumberOfReviews(),
    });
    app.innerHTML = overview;

    const customerReviewsDiv = document.createElement('div');
    customerReviewsDiv.id = 'customer-reviews';
    this.getCustomerReviews().forEach((review, index, array) => {
      const customerReview = this.templates.customerReview({
        id: review.id,
        rating: review.rating,
        title: review.title,
        name: review.name,
        date: review.date,
        comment: review.comment,
      });
      customerReviewsDiv.innerHTML += customerReview + (index < array.length - 1 ? '<hr>' : '');
    });
    app.appendChild(customerReviewsDiv);
  }

  // Add event listeners
  addEventListeners() {
    const formCustomerReview = document.getElementById('form-customer-review');
    const addCustomerReview = document.getElementById('add-customer-review');
    const modalAddReview = document.getElementById('modal-add-review');
    const modalClose = modalAddReview.querySelectorAll('[data-dismiss="modal"]');

    // Open Modal
    addCustomerReview.addEventListener('click', (event) => {
      const body = document.getElementsById('body');
      modalAddReview.classList.add('show');

      // Append Backdrop to body
      body.innerHTML += this.templates.modalBackdrop();
    });

    // Close Modal and remove Backdrop from body with transition effect
    modalClose.forEach((button) => {
      button.addEventListener('click', (event) => {
        const backdrop = document.getElementById('modal-backdrop');
        modalAddReview.classList.remove('show');
        backdrop.classList.remove('show');
        setTimeout(() => {
          backdrop.remove();
        }, 300);
      });
    });
  }
}

const Templates = {
  starsRating: function (rating = 0) {
    return /* HTML */ `
      <div class="stars" data-rating=${rating}>
        <svg class="star" data-rating="1" x="0px" y="0px" viewBox="0 0 200 200" enable-background="new 0 0 200 200">
          <path
            d="M195.253,69.06h-69.241L104.224,3.309c-0.68-2.051-2.526-3.077-4.373-3.077V69.06v83.591l60.468,46.592
c3.548,2.734,8.621-0.627,7.24-4.796l-24.804-74.854l55.364-42.659C201.508,74.322,199.591,69.06,195.253,69.06z"
          />
          <path
            d="M95.479,3.309L73.692,69.06H4.45c-4.339,0-6.255,5.262-2.867,7.873l55.364,42.659l-24.804,74.854
c-1.381,4.169,3.692,7.53,7.24,4.796l60.468-46.592V69.06V0.232C98.005,0.232,96.159,1.258,95.479,3.309z"
          />
        </svg>
        <svg class="star" data-rating="2" x="0px" y="0px" viewBox="0 0 200 200" enable-background="new 0 0 200 200">
          <path
            d="M195.253,69.06h-69.241L104.224,3.309c-0.68-2.051-2.526-3.077-4.373-3.077V69.06v83.591l60.468,46.592
c3.548,2.734,8.621-0.627,7.24-4.796l-24.804-74.854l55.364-42.659C201.508,74.322,199.591,69.06,195.253,69.06z"
          />
          <path
            d="M95.479,3.309L73.692,69.06H4.45c-4.339,0-6.255,5.262-2.867,7.873l55.364,42.659l-24.804,74.854
c-1.381,4.169,3.692,7.53,7.24,4.796l60.468-46.592V69.06V0.232C98.005,0.232,96.159,1.258,95.479,3.309z"
          />
        </svg>
        <svg class="star" data-rating="3" x="0px" y="0px" viewBox="0 0 200 200" enable-background="new 0 0 200 200">
          <path
            d="M195.253,69.06h-69.241L104.224,3.309c-0.68-2.051-2.526-3.077-4.373-3.077V69.06v83.591l60.468,46.592
c3.548,2.734,8.621-0.627,7.24-4.796l-24.804-74.854l55.364-42.659C201.508,74.322,199.591,69.06,195.253,69.06z"
          />
          <path
            d="M95.479,3.309L73.692,69.06H4.45c-4.339,0-6.255,5.262-2.867,7.873l55.364,42.659l-24.804,74.854
c-1.381,4.169,3.692,7.53,7.24,4.796l60.468-46.592V69.06V0.232C98.005,0.232,96.159,1.258,95.479,3.309z"
          />
        </svg>
        <svg class="star" data-rating="4" x="0px" y="0px" viewBox="0 0 200 200" enable-background="new 0 0 200 200">
          <path
            d="M195.253,69.06h-69.241L104.224,3.309c-0.68-2.051-2.526-3.077-4.373-3.077V69.06v83.591l60.468,46.592
c3.548,2.734,8.621-0.627,7.24-4.796l-24.804-74.854l55.364-42.659C201.508,74.322,199.591,69.06,195.253,69.06z"
          />
          <path
            d="M95.479,3.309L73.692,69.06H4.45c-4.339,0-6.255,5.262-2.867,7.873l55.364,42.659l-24.804,74.854
c-1.381,4.169,3.692,7.53,7.24,4.796l60.468-46.592V69.06V0.232C98.005,0.232,96.159,1.258,95.479,3.309z"
          />
        </svg>
        <svg class="star" data-rating="5" x="0px" y="0px" viewBox="0 0 200 200" enable-background="new 0 0 200 200">
          <path
            d="M195.253,69.06h-69.241L104.224,3.309c-0.68-2.051-2.526-3.077-4.373-3.077V69.06v83.591l60.468,46.592
c3.548,2.734,8.621-0.627,7.24-4.796l-24.804-74.854l55.364-42.659C201.508,74.322,199.591,69.06,195.253,69.06z"
          />
          <path
            d="M95.479,3.309L73.692,69.06H4.45c-4.339,0-6.255,5.262-2.867,7.873l55.364,42.659l-24.804,74.854
c-1.381,4.169,3.692,7.53,7.24,4.796l60.468-46.592V69.06V0.232C98.005,0.232,96.159,1.258,95.479,3.309z"
          />
        </svg>
      </div>
    `;
  },
  customerReviewsOverview: function ({ averageRating, numberOfReviews }) {
    return /* HTML */ ` <h1>Customer Reviews</h1>
      <div id="customer-reviews-overview" class="row">
        <div class="col">
          <div class="d-flex align-items-center">
            ${this.starsRating(averageRating)}
            <span class="pl-1">Based on ${numberOfReviews} reviews</span>
            <a id="add-customer-review" class="link"> Add a Review </a>
          </div>
        </div>
      </div>
      <hr />`;
  },
  customerReview: function ({ rating, title, date, comment }) {
    date = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    }).format(new Date(date));
    return /* HTML */ `
      <div class="review">
        <div class="row">
          <div class="col">
            <div class="container">
              ${this.starsRating(rating)}
              <h2 class="review-title">${title}</h2>
              <p class="review-date">${date}</p>
              <p class="review-comment">${comment}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  customerReviewModal: function () {
    return /* HTML */ `
      <div class="modal fade" id="modal-add-review" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add a Review</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span>&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form id="form-customer-review" novalidate>
                <div class="form-group">
                  <div class="input-group">
                    <input type="hidden" id="review_rating" name="review_rating" />
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      id="review_title"
                      name="review_title"
                      placeholder="Title"
                      required
                    />
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      id="review_name"
                      name="review_name"
                      placeholder="Name"
                      required
                    />
                  </div>
                </div>
                <div class="form-group">
                  <textarea
                    class="form-control"
                    id="review_comment"
                    name="review_comment"
                    rows="3"
                    placeholder="Excelent product and fast delivery!"
                  ></textarea>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  modalBackdrop: () => /* HTML */ ` <div class="modal-backdrop fade show"></div> `,
};
