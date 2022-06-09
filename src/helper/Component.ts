import Template from './Template';
export default class Component {
  private _element: HTMLElement;
  public _initialized = false;
  public template = new Template();
  public get element(): HTMLElement {
    return this._element as HTMLElement;
  }
  public set element(element: HTMLElement) {
    this._element = element;
  }
  public get initialized() {
    return this._initialized;
  }

  init() {
    if (this.initialized) return;
    this.render();
    this.addEventListeners();
    this._initialized = true;
  }

  render() {
    return null;
  }

  addEventListeners() {
    return null;
  }
}
