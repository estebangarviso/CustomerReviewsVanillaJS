import html from './html';
import Component from '../../helper/Component';
import ReviewForm from '../ReviewForm';
//!TODO: Separate the form from the modal
export default class ModalAddReview extends Component {
  // Private variables
  private _children: ReviewForm | undefined;
  _isOpen: boolean = false;
  get isOpen() {
    return this._isOpen;
  }

  open() {
    if (this._isOpen) return;

    this._isOpen = true;
    const modal = document.getElementById('modal-add-review');
    // Add Backdrop to the body
    document.body.insertAdjacentHTML(
      'beforeend',
      /* HTML */ `<div id="modal-backdrop" class="modal-backdrop fade${this.isOpen ? ' show' : ''}"></div>`
    );
    // Show the modal
    modal?.classList.add('show');
    modal.style.display = 'block';
  }

  close() {
    if (!this.isOpen) return;

    this._isOpen = false;
    const modal = document.getElementById('modal-add-review');
    const backdrop = document.getElementById('modal-backdrop');
    // Hide the modal
    modal?.classList.remove('show');
    // Remove Backdrop from the body
    backdrop?.classList.remove('show');
    setTimeout(() => {
      backdrop?.remove();
      modal.style.display = 'none';
    }, 300);
  }

  render() {
    if (!this._children) {
      this._children = new ReviewForm();
    }
    document.body.insertAdjacentHTML(
      'beforeend',
      html({
        title: 'Add Review',
        footer: this._children.renderSubmit()
      })
    );
    const modal = document.getElementById('modal-add-review');
    modal.querySelector('.modal-body')?.appendChild(this._children.render());
    this._children.addEventListeners();
  }

  addEventListeners() {
    const modal = document.getElementById('modal-add-review');
    const closeButton = modal?.querySelector('[data-dismiss="modal"]');
    const form = document.getElementById('form-customer-review') as HTMLFormElement;
    const saveButton = modal?.querySelector('[data-submit="form-customer-review"]');
    const review_stars = form?.querySelectorAll('.stars .star');

    closeButton?.addEventListener('click', () => {
      this?.close();
    });

    saveButton?.addEventListener('click', () => {
      // Trigger the form submit event
      form?.dispatchEvent(new Event('submit'));
    });
  }
}
