import App from '../..';
import Component from '../../helper/Component';

export default class FormField extends Component {
  label: string;
  name: string;
  validate: string = 'isGenericName';
  required: boolean = false;
  type: string = 'text';
  tagName: string = 'input';
  prepend: string;
  append: string;
  inputTagElement: FormFieldElements;

  private _value: string;
  private _otherProps: any = {};
  private _error: string = '';

  public get isValid() {
    // check if error is empty string
    return this._error === '';
  }

  public get value() {
    return this._value;
  }
  public set value(value: string) {
    this._value = value;
  }
  public get otherProps(): string | undefined {
    if (this._otherProps) {
      return Object.keys(this._otherProps)
        .map((key) => `${key}="${this._otherProps[key]}"`)
        .join(' ');
    }
    return undefined;
  }

  public set error({ error, hook }: { error?: string; hook?: 'reset' }) {
    if (hook === 'reset') this._error = '';
    else {
      this._error = error;

      if (this.inputTagElement) {
        console.log({ error, isValid: this.isValid });

        if (this.isValid) {
          this.inputTagElement.classList.remove('is-valid');
          this.inputTagElement.classList.add('is-invalid');
        } else {
          this.inputTagElement.classList.remove('is-invalid');
          this.inputTagElement.classList.add('is-valid');
          this.inputTagElement.setCustomValidity(error);
          this.inputTagElement.reportValidity();
        }
      }

      if (this.element) {
        const feedback = this.element.querySelector('.invalid-feedback');

        if (feedback) {
          feedback.innerHTML = this._error;
        }
      }
    }
  }

  public get prependTag() {
    let prepend = null;
    if (this.prepend) {
      prepend = `<span class="input-group-text">${this.prepend}</span>`;
    }
    return prepend;
  }
  public get inputTag() {
    return /* HTML */ `
    <${this.tagName}
        type="${this.type}"
        id="${this.name}"
        name="${this.name}"
        class="form-control"
        ${this.value ? `value="${this.value}"` : ''}
        ${!this._otherProps.placeholder ? `placeholder="${this.label}"` : ''}
        ${this.required ? 'required' : ''}
        ${this.otherProps ? this.otherProps : ''}
    ></${this.tagName}>
  `;
  }
  public get appendTag() {
    let append = '';
    if (this.append) append = this.append;

    if (!this.isValid) append += ` <div class="invalid-feedback">${this.error}</div> `;
    else append += ` <div class="invalid-feedback"></div> `;

    return append;
  }

  constructor({
    label,
    name,
    value,
    validate,
    required,
    type,
    tagName,
    append,
    prepend,
    ...otherProps
  }: FormDefinitionField) {
    super();
    this.label = label;
    this.name = name;
    this.value = value as string;
    if (validate) this.validate = validate;
    if (required) this.required = true;
    if (type) this.type = type;
    if (tagName) this.tagName = tagName;
    if (append) this.append = append;
    if (prepend) this.prepend = prepend;
    if (otherProps) this._otherProps = otherProps;
  }

  render() {
    this.template.assign = /* HTML */ `
      <div class="mb-1">
        <div class="input-group">
          ${this.prependTag ? this.prependTag : ''} ${this.inputTag} ${this.appendTag ? this.appendTag : ''}
        </div>
      </div>
    `;
    const template = this.template.render;
    let inputTag = template.querySelector(`#${this.name}`);
    if (!inputTag) {
      inputTag = template.querySelector(`[name="${this.name}"]`);
      if (!inputTag) {
        App.Notifications.add({ type: 'danger', message: `FormField.inputTag: ${this.name} not found` });
        return;
      }
    }
    this.inputTagElement = inputTag;
    this.element = template;
    return this.element;
  }
}
