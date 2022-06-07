const Template = () => {
  return /* HTML */ `
    <div class="modal fade" id="modal-add-review" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add a Review</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="form-customer-review" novalidate>
              <div class="form-group">
                <div class="input-group">
                  <input type="hidden" id="review_rating" name="review_rating" />
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    id="review_title"
                    name="review_title"
                    placeholder="Title"
                    required
                  />
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    id="review_name"
                    name="review_name"
                    placeholder="Name"
                    required
                  />
                </div>
              </div>
              <div class="form-group">
                <textarea
                  class="form-control"
                  id="review_comment"
                  name="review_comment"
                  rows="3"
                  placeholder="Excellent product and fast delivery!"
                ></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-submit="form-customer-review">Submit Review</button>
          </div>
        </div>
      </div>
    </div>
  `;
};

export default Template;
