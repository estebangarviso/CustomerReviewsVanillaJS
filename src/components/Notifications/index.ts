import html from './html';
import Component from '../../helpers/Component';
export default class Notifications extends Component {
  public get container() {
    return document.getElementById('notifications');
  }
  public add({ type, title, message }: NotificationsProps) {
    this.template.assign = { str: html({ type, title, message }), refresh: true };
    const notification = this.template.render;
    const handleRemove = () => {
      // Remove show class
      notification.classList.remove('show');
      // Remove notification from DOM
      setTimeout(() => {
        notification.remove();
      }, 300);
    };
    const handleShow = () => {
      // Add show class
      notification.classList.add('show');
      // Remove notification from DOM
      setTimeout(() => {
        handleRemove();
      }, 10000);
    };
    this.container.appendChild(notification);

    // If click on close button, remove notification
    notification.querySelector('.btn-close').addEventListener('click', handleRemove);

    handleShow();
  }
  renderForm() {
    document.body.insertAdjacentHTML('beforeend', /* HTML */ ` <div id="notifications"></div> `);
  }
}
