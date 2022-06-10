export default class Validate {
  static isRating(value: any): boolean {
    return this.isUnsignedInt(value) && Number(value) <= 5 && Number(value) > 0;
  }
  static isName(name: string): boolean {
    return /^[^0-9!<>,;?=+()@#"°{}_$%:¤|]*$/u.test(name);
  }
  static isGenericName(name: string): boolean {
    return /^[^<>={}]*$/.test(name);
  }
  static isUnsignedInt(value: any): boolean {
    return (
      (this.isNumeric(value) || this.isString(value)) &&
      Number(value).toString() === value.toString() &&
      Number(value) >= 0
    );
  }
  static isNumeric(value: any): boolean {
    return !isNaN(parseFloat(value)) && isFinite(value) && typeof value === 'number';
  }
  static isString(value: any): boolean {
    return typeof value === 'string';
  }
}
