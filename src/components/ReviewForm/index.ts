import App from '../..';
import Form from '../Form/Form';
import FormField from '../Form/FormField';
import Stars from '../Stars/html';

export default class ReviewForm extends Form {
  public id = 'form-customer-review';
  public definition = [
    {
      label: 'Rating',
      name: 'review_rating',
      value: undefined,
      validate: 'isRating',
      required: true,
      type: 'hidden',
      append: Stars()
    },
    { label: 'Name', name: 'review_name', value: undefined, validate: 'isName', required: true },
    { label: 'Title', name: 'review_title', value: undefined, required: true },
    {
      label: 'Comment',
      name: 'review_comment',
      value: undefined,
      required: true,
      tagName: 'textarea',
      rows: 3,
      placeholder: 'Excellent product and fast delivery!'
    }
  ];

  constructor() {
    super();
    this.formFields = this.definition.map((field) => {
      const formField = new FormField(field);
      return formField;
    });
  }

  afterReset() {
    const stars = this.form?.querySelector('.stars') as HTMLElement;
    stars.dataset.rating = '0';
    this.form?.querySelector('#review_rating')?.setAttribute('value', '0');
  }

  public render() {
    this.template.assign = /* HTML */ ` <form id="${this.id}" class="needs-validation" novalidate></form> `;
    this.formFields.forEach((field) => {
      this.template.append = field.render();
    });
    this.form = this.template.render as HTMLFormElement;
    return this.template.render;
  }

  public renderSubmit() {
    return `
    <button type="button" class="btn btn-primary" data-submit="${this.id}">Submit Review</button>
    `;
  }

  public addEventListeners() {
    const saveButton = this.form?.querySelector(`[data-submit="${this.id}"]`);
    const review_stars = this.form?.querySelectorAll('.stars .star');

    saveButton?.addEventListener('click', () => this.form.dispatchEvent(new Event('submit')));

    review_stars?.forEach((star) => {
      star.addEventListener('click', (event) => {
        const star = event.currentTarget as HTMLElement;
        const value = star.dataset.rating;
        const stars = this.form?.querySelector('.stars') as HTMLElement;
        this.form.querySelector('#review_rating')?.setAttribute('value', value);
        stars.dataset.rating = value;
      });
    });

    this.form?.addEventListener('submit', (event) => {
      event.preventDefault();
      const validate = this.validate();
      if (!validate.isValid) return;

      const review = this.getValues() as ReviewProps;
      App.CustomerReviews.addReview(review);
      App.ModalAddReview.close();

      // Reset the form
      this.reset();

      // Send notification thorugh the App
      App.Notifications.add({
        type: 'success',
        title: 'Review added',
        message: 'Review added successfully'
      });
    });
  }
}
