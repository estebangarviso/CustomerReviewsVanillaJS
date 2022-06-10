import Component from '../../helpers/Component';
import html from './html';
export default class Review extends Component {
  public state: ReviewProps;

  constructor(state: ReviewProps) {
    super();
    this.setState({ ...state });
  }

  // Getters methods - start

  // Id
  get id() {
    return this.state.id;
  }

  // Rating
  get rating() {
    return this.state.rating;
  }

  // Title
  get title() {
    return this.state.title;
  }

  // Name
  get name() {
    return this.state.name;
  }

  // Date
  get date() {
    const date = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    }).format(new Date(this.state.date));
    return date;
  }

  // Comment
  get comment() {
    return this.state.comment;
  }

  // Getter methods - end

  renderForm() {
    return html(this as ReviewProps);
  }
}
