import html from './html';
import Component from '../../helper/Component';
export default class Notifications extends Component {
  public add({ type, title, message }: NotificationsProps) {
    const container = document.getElementById('notifications');
    this.template.assign = html({ type, title, message });
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
    container.appendChild(notification);

    // If click on close button, remove notification
    notification.querySelector('.btn-close').addEventListener('click', handleRemove);

    handleShow();
  }
  render() {
    document.body.insertAdjacentHTML('beforeend', /* HTML */ ` <div id="notifications"></div> `);
  }
}
