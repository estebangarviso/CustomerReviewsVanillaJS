export default class Template {
  private _template: string | HTMLElement | undefined;
  private get isAssigned(): boolean {
    return this._template !== undefined;
  }

  public set append(element: HTMLElement) {
    if (!this._template) return;
    if (typeof this._template === 'string') this._template = this.HTMLElement(this._template);
    this._template.appendChild(element);
  }

  public get render() {
    if (!this._template) return undefined;
    else if (typeof this._template === 'string') this._template = this.HTMLElement(this._template);
    return this._template;
  }

  public set assign({ str, refresh }: { str: string; refresh?: boolean }) {
    if (refresh) this.refresh();
    if (this.isAssigned) return;
    this._template = str;
  }

  public refresh() {
    if (!this.isAssigned) return;
    this._template = undefined;
  }

  private HTMLElement(str: string): HTMLElement {
    const element = document.createElement('div');
    element.innerHTML = str;
    return element.firstElementChild as HTMLElement;
  }
}
