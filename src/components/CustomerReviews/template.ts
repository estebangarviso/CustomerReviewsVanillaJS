import Stars from '../Stars';

const Template = ({ averageRating, numberOfReviews }: CustomerReviewsProps) => /* HTML */ `<h1>Customer Reviews</h1>
  <div id="customer-reviews-overview" class="row">
    <div class="col">
      <div class="d-flex align-items-ce nter">
        ${Stars(averageRating)}
        <span class="pl-1">Based on ${numberOfReviews} reviews</span>
        <a id="add-customer-review" class="link"> Add a Review </a>
      </div>
    </div>
  </div>
  <hr />`;

export default Template;
