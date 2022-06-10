import App from '../..';
import Component from '../../helpers/Component';

export default class FormField extends Component {
  label: string;
  name: string;
  validate: string = 'isGenericName';
  required: boolean = false;
  type: string = 'text';
  tagName: string = 'input';
  prepend: string;
  append: string;
  state: {
    inputTagElement: FormFieldElements;
    element: HTMLElement;
  };

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

  public set error(errorMessage: string) {
    this._error = errorMessage;

    if (this.state.inputTagElement) {
      if (!this.isValid) {
        this.state.inputTagElement.classList.add('is-invalid');
        this.state.inputTagElement.classList.remove('is-valid');
        this.state.inputTagElement.setCustomValidity(errorMessage); // this is for HTML5 validation add :invalid CSS to the input
      } else {
        this.state.inputTagElement.classList.remove('is-invalid');
        this.state.inputTagElement.classList.add('is-valid');
        this.state.inputTagElement.setCustomValidity(''); // empty string for HTML5 validation add :valid CSS to the input
      }
    }

    if (this.state.element) {
      const feedback = this.state.element.querySelector('.invalid-feedback');

      if (feedback) {
        feedback.innerHTML = this._error;
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

  renderForm() {
    this.template.assign = {
      str: /* HTML */ `
        <div class="mb-1">
          <div class="input-group">
            ${this.prependTag ? this.prependTag : ''} ${this.inputTag} ${this.appendTag ? this.appendTag : ''}
          </div>
        </div>
      `
    };
    const template = this.template.render;
    let inputTag = template.querySelector(`#${this.name}`);
    if (!inputTag) {
      inputTag = template.querySelector(`[name="${this.name}"]`);
      if (!inputTag) {
        App.Notifications.add({ type: 'danger', message: `FormField.inputTag: ${this.name} not found` });
        return;
      }
    }
    // this.state.inputTagElement = inputTag;
    // this.state.element = template;
    this.setState({ inputTagElement: inputTag, element: template });
    return template;
  }
}
