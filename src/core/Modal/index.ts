import Component from '../../helpers/Component';

export default class Modal extends Component {
  public id: string;
  public state: ModalState = {
    isOpen: false,
    title: null,
    body: null,
    footer: null,
    modal: undefined
  };

  get isBackdropExist(): false | Element {
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      return backdrop;
    }
    return false;
  }

  openModal = () => {
    if (this.state.isOpen) return;
    this.setState({
      isOpen: true
    });

    // Check if modal exist in state then and show to classlist
    this.state.modal.classList.add('show');
    this.state.modal.style.display = 'block';

    // Check if backdrop exist in the body then added to body if not added
    if (this.isBackdropExist) return;
    else
      document.body.insertAdjacentHTML(
        'beforeend',
        /* HTML */ `<div class="modal-backdrop fade${this.state.isOpen ? ' show' : ''}"></div>`
      );
  };

  closeModal = () => {
    if (!this.state.isOpen) return;
    this.setState({
      isOpen: false
    });
    // Hide the modal
    this.state.modal.classList.remove('show');
    setTimeout(() => {
      this.state.modal.style.display = 'none';
    }, 300);

    // Check if backdrop exist in the body then removed from body if not removed
    const backdrop = this.isBackdropExist;
    if (!backdrop) return;
    else {
      // Remove Backdrop from the body
      backdrop.classList.remove('show');
      setTimeout(() => {
        backdrop?.remove();
      }, 300);
    }
  };

  renderForm() {
    const { isOpen, title, body, footer } = this.state;
    this.template.assign = {
      str: /* HTML */ `
        <div class="modal fade${isOpen ? ' show' : ''}" ${this.id ? ` id="${this.id}"` : ''} role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">${title ?? '&nbsp;'}</h5>
                <button type="button" class="btn-close" data-dismiss="modal"></button>
              </div>
              <div class="modal-body"></div>
              <div class="modal-footer"></div>
            </div>
          </div>
        </div>
      `
    };
    const modal = this.template.render;
    // Append body and footer to modal
    modal.querySelector('.modal-body').appendChild(body);
    modal.querySelector('.modal-footer').appendChild(footer);
    // Check if modal is append to the body then append to body if not append
    if (document.querySelector(`#${this.id}`)) return;
    document.body.appendChild(modal);
    this.setState({
      modal: modal
    });
  }

  addEventListeners() {
    this.state.modal.querySelector('[data-dismiss="modal"]').addEventListener('click', () => {
      this?.closeModal();
    });
  }
}
