import Component from '../../helpers/Component';
import Validate from '../../helpers/Validate';
import FormField from './FormField';
import App from '../..';

export default abstract class Form extends Component {
  static DEFAULT_VALIDATION_METHOD = 'isGenericName';

  private _errors: { name: FormDefinitionField['name']; message: string }[] = [];
  public definition: FormDefinition;
  public formFields: FormField[] = [];

  public state: {
    form: HTMLFormElement;
    button: HTMLButtonElement;
  };

  public reset = () => {
    this.state.form.reset();
    this.afterReset();
  };

  abstract afterReset(): void;

  public getFieldByName(name: string) {
    return this.formFields.find((field) => field.name === name);
  }

  /**
   * It adds values to the definition
   * @param formData FormData
   * @returns Form.definition FormDefinition
   */
  private addValues(formData: FormData) {
    this.definition.forEach((field) => {
      field.value = formData.get(field.name);
    });
    return this.definition;
  }

  public getValues(): { [key: string]: string } {
    const values = {};
    this.definition.forEach((field) => {
      values[field.name] = field.value;
    });
    return values;
  }

  private get errorList() {
    if (this._errors.length) {
      let errorList = '<ul>';
      this._errors.map((error) => {
        errorList += `<li>${error.message}</li>`;
      });
      errorList += '</ul>';
      return errorList;
    }
    return '';
  }

  public beforeValidate(formData: FormData) {
    // Add values to definition
    this.addValues(formData);
    return formData;
  }

  public validate(): FormValidate {
    const formData = new FormData(this.state.form as HTMLFormElement);

    this.beforeValidate(formData);

    const result = {
      isValid: true,
      errors: []
    };

    this.definition.forEach((field) => {
      const formField = this.getFieldByName(field.name);
      if (!field.value) {
        // Add errors to form
        this._errors.push({ name: field.name, message: `${field.label} is required` });
        result.isValid = false;

        // Add errors to field
        formField.error = `${field.label} is required`;
      } else if (!Validate[field.validate ?? Form.DEFAULT_VALIDATION_METHOD](field.value)) {
        // Add errors to form
        this._errors.push({ name: field.name, message: `${field.label} is invalid` });
        result.isValid = false;

        // Add errors to field
        formField.error = `${field.label} is invalid`;
      }
    });

    if (!result.isValid) {
      const firstInputTagElementWithError = this.formFields.find((field) => field.name === this._errors[0].name).state
        .inputTagElement;
      firstInputTagElementWithError.reportValidity(); // it shows the error message in the input depending on the browser
      firstInputTagElementWithError.focus(); // it focuses the input
      App.Notifications.add({
        type: 'danger',
        title: 'Error',
        message: this.errorList
      });
    }

    this.afterValidate(result);

    return result;
  }

  afterValidate(result: FormValidate) {
    this._errors = [];
    this.formFields.forEach((field) => {
      field.error = '';
    });
    if (result.isValid) {
      this.state.form.classList.remove('was-validated');
    } else {
      this.state.form.classList.add('was-validated');
    }

    return result;
  }
}
