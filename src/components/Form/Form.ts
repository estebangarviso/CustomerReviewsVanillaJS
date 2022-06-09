import Component from '../../helper/Component';
import Validate from '../../helper/Validate';
import FormField from './FormField';
import App from '../..';

export default abstract class Form extends Component {
  private _form: HTMLFormElement;
  private _errors: { name: FormDefinitionField['name']; message: string }[] = [];
  public definition: FormDefinition;
  public formFields: FormField[] = [];
  public get form() {
    return this._form;
  }

  public set form(form: HTMLFormElement) {
    this._form = form;
  }

  public reset = () => {
    this.form.reset();
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

  public getValues(): { [key: string]: number | string | boolean } {
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
    const formData = new FormData(this.form as HTMLFormElement);

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
        formField.error = { error: `${field.label} is required` };
      } else if (!Validate[field.validate](field.value)) {
        // Add errors to form
        this._errors.push({ name: field.name, message: `${field.label} is invalid` });
        result.isValid = false;

        // Add errors to field
        formField.error = { error: `${field.label} is invalid` };
      }
    });

    if (!result.isValid) {
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
    console.log({ result });

    const resetErrors = (hook) => {
      // Remove errors from form to avoid duplicate errors
      this._errors = [];
      this.formFields.forEach((field) => {
        if (hook === 'reset') {
          field.error = { hook };
        } else {
          field.error = { error: '' };
        }
      });
    };
    if (result.isValid) {
      this.form.classList.remove('was-validated');
      resetErrors('isvalid');
    } else {
      this.form.classList.add('was-validated');
      resetErrors('reset');
    }

    return result;
  }
}
