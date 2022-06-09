export default class Template {
  private _template: string | HTMLElement;
  public set append(element: HTMLElement) {
    if (!this._template) return;
    if (typeof this._template === 'string') this._template = this.HTMLElement(this._template);
    this._template.appendChild(element);
  }

  public get render() {
    if (!this._template) return null;
    if (typeof this._template === 'string') this._template = this.HTMLElement(this._template);
    return this._template;
  }

  public set assign(str: string) {
    this._template = str;
  }

  private HTMLElement(str: string): HTMLElement {
    const element = document.createElement('div');
    element.innerHTML = str;
    return element.firstElementChild as HTMLElement;
  }
}
