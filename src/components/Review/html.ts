import Stars from '../Stars/html';

const Template = (review: ReviewProps) => {
  const { rating, title, name, date, comment } = review;
  return /* HTML */ `
    <div class="review">
      <div class="row">
        <div class="col">
          <div class="container">
            ${Stars(rating)}
            <h2 class="review-title">${title}</h2>
            <p class="review-date"><span class="review-name">${name}</span> ${date}</p>
            <p class="review-comment">${comment}</p>
          </div>
        </div>
      </div>
    </div>
  `;
};

export default Template;
