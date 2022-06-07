import Template from './template';
export default class ModalAddReview {
  // Private variables
  _isOpen = false;

  // Getters methods - start
  get isOpen() {
    return this._isOpen;
  }
  // Getters methods - end

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
    }, 300);
  }

  init() {
    document.body.innerHTML += this.render();
    this.addEventListeners();
  }

  render() {
    return Template();
  }

  addEventListeners() {
    const modal = document.getElementById('modal-add-review');
    const form = document.getElementById('form-customer-review') as HTMLFormElement;
    const closeButton = modal?.querySelector('[data-dismiss="modal"]');
    const saveButton = modal?.querySelector('[data-submit="form-customer-review"]');

    // Because Modal is going to render first we need to attach on click event to body document. So open the modal if the user clicks on the Add Review button ID add-customer-review
    document.body.addEventListener('click', (event) => {
      if ((event.target as HTMLElement).id === 'add-customer-review') {
        this.open();
      }
    });

    closeButton?.addEventListener('click', () => {
      this?.close();
    });

    saveButton?.addEventListener('click', () => {
      // Trigger the form submit event
      form?.dispatchEvent(new Event('submit'));
    });

    form?.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(form as HTMLFormElement);

      console.log(formData);
    });
  }
}
