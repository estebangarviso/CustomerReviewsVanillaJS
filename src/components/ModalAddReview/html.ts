import Stars from '../Stars/html';
const Template = ({ title, body, footer }: { title?: string; body?: string; footer?: string }) => {
  return /* HTML */ `
    <div class="modal fade" id="modal-add-review" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${title ? title : '&nbsp;'}</h5>
            <button type="button" class="btn-close" data-dismiss="modal"></button>
          </div>
          <div class="modal-body">${body ? body : ''}</div>
          <div class="modal-footer">${footer ? footer : '&nbsp;'}</div>
        </div>
      </div>
    </div>
  `;
};

export default Template;
