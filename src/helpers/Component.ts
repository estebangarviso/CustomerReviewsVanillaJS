import Template from './Template';
export default class Component {
  public state: any;
  private _initialized = false;
  public template = new Template();

  public setState(state: any) {
    this.state = { ...this.state, ...state };

    if (this._initialized) {
      this.renderForm();
    }

    return this;
  }

  init() {
    if (this._initialized) return;
    this.renderForm();
    this.addEventListeners();
    this._initialized = true;
  }

  renderForm() {
    return null;
  }

  addEventListeners() {
    return null;
  }
}
