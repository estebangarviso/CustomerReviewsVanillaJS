const Template = ({ type, title, message }: NotificationsProps) => /* HTML */ `
  <div class="notification notification-${type} text-bg-${type}">
    <div class="notification-header">
      <div class="notification-title me-auto">${title ? title : '&nbsp;'}</div>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="notification-body">${message}</div>
  </div>
`;

export default Template;
