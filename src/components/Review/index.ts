import Template from './template';
export default class Review implements ReviewInterface {
  // Private variables
  _props: ReviewProps;

  // Constructor
  constructor(props: ReviewProps) {
    this._props = props;
  }

  // Getters methods - start

  // Id
  get id() {
    return this._props.id;
  }

  // Rating
  get rating() {
    return this._props.rating;
  }

  // Title
  get title() {
    return this._props.title;
  }

  // Name
  get name() {
    return this._props.name;
  }

  // Date
  get date() {
    const date = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    }).format(new Date(this._props.date));
    return date;
  }

  // Comment
  get comment() {
    return this._props.comment;
  }

  // Getter methods - end

  render() {
    return Template(this as ReviewProps);
  }
}
