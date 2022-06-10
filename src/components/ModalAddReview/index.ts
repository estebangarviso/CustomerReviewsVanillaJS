import ReviewForm from '../ReviewForm';
import Modal from '../../core/Modal';
//!TODO: Separate the form from the modal
export default class ModalAddReview extends Modal {
  // Private variables
  public id = 'modal-add-review';
  public state: ModalState & {
    form: ReviewForm | undefined;
  };

  constructor() {
    super();
    const form = new ReviewForm();

    this.setState({
      title: 'Add Review',
      form,
      body: form.renderForm(),
      footer: form.renderSubmit()
    });
  }
}
