import Stars from '../Stars/html';

const Template = ({ averageRating, numberOfReviews }: CustomerReviewsProps) => {
  return /* HTML */ `<h1>Customer Reviews</h1>
    <div id="customer-reviews-overview" class="container">
      <div class="row">
        <div class="col">
          <div class="d-flex align-items-center">
            ${Stars(averageRating)}
            <span class="pl-1">Based on ${numberOfReviews} reviews</span>
            <a id="add-customer-review" class="link">Add a Review</a>
          </div>
        </div>
      </div>
    </div>
    ${numberOfReviews ? '<hr /> ' : ''}`;
};

export default Template;
