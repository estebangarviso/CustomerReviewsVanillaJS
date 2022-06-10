import App from '../..';
import Form from '../../core/Form/Form';
import FormField from '../../core/Form/FormField';
import Stars from '../Stars/html';

export default class ReviewForm extends Form {
  public id = 'form-customer-review';
  public definition = [
    {
      label: 'Rating',
      name: 'review_rating',
      validate: 'isRating',
      required: true,
      type: 'hidden',
      append: Stars()
    },
    { label: 'Name', name: 'review_name', validate: 'isName', required: true },
    { label: 'Title', name: 'review_title', required: true },
    {
      label: 'Comment',
      name: 'review_comment',
      required: true,
      tagName: 'textarea',
      rows: 3,
      placeholder: 'Excellent product and fast delivery!'
    }
  ];

  public state: {
    form: HTMLFormElement;
    button: HTMLButtonElement;
  };

  constructor() {
    super();
    this.formFields = this.definition.map((field) => {
      const formField = new FormField(field);
      return formField;
    });
  }

  afterReset() {
    const stars = this.state.form?.querySelector('.stars') as HTMLElement;
    stars.dataset.rating = '0';
    this.state.form?.querySelector('#review_rating')?.setAttribute('value', '0');
  }

  public renderForm(): HTMLFormElement {
    this.template.assign = { str: /* HTML */ ` <form id="${this.id}" class="needs-validation" novalidate></form> ` };
    this.formFields.forEach((field) => {
      this.template.append = field.renderForm();
    });
    this.setState({ form: this.template.render as HTMLFormElement });

    this.afterFormSetState(this.state.form);

    return this.state.form;
  }

  public renderSubmit(): HTMLButtonElement {
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-primary');
    button.setAttribute('type', 'button');
    button.innerText = 'Submit Review';
    this.setState({ button });

    // Add event listener to the button, render form before adding event listener
    this.state.button.addEventListener('click', () => this.state.form.dispatchEvent(new Event('submit')));
    return this.state.button;
  }

  private get formattedValues(): ReviewProps {
    const date = new Date();
    const values = this.getValues() as {
      review_comment: string;
      review_name: string;
      review_title: string;
      review_rating: string;
    };
    // Remove prefix 'review_' from the keys
    const formattedValues = Object.keys(values).reduce((acc, key) => {
      acc[key.replace('review_', '')] = values[key];
      return acc;
    }, {} as ReviewProps);
    // Casing
    formattedValues.name = formattedValues.name.toProperCase();
    formattedValues.title = formattedValues.title.toProperCase();
    formattedValues.comment = formattedValues.comment.toSentenceCase();
    // Add next id and datestamp
    const result = {
      ...formattedValues,
      id: App.CustomerReviews.numberOfReviews + 1,
      date: `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}-${
        date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      }`
    };
    return result;
  }

  public afterFormSetState(form: HTMLFormElement) {
    const review_stars = form.querySelectorAll('.stars .star');

    review_stars?.forEach((star) => {
      star.addEventListener('click', (event: Event) => {
        const star = event.currentTarget as HTMLElement;
        const value = star.dataset.rating;
        const stars = form?.querySelector('.stars') as HTMLElement;
        form.querySelector('#review_rating')?.setAttribute('value', value);
        stars.dataset.rating = value;
      });
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const validate = this.validate();
      if (!validate.isValid) return;

      App.CustomerReviews.addReview(this.formattedValues);
      App.ModalAddReview.closeModal();

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
