type ReviewProps = {
  id: number;
  rating: number;
  comment: string;
  title: string;
  name: string;
  date: string;
};

type CustomerReviewsProps = {
  averageRating: number;
  numberOfReviews: number;
};

type ModalAddReviewProps = {
  isOpen: boolean;
  onClose: () => void;
};

interface CustomerReviewsInterface {
  _customerReviews: ReviewProps[];
  init(): void;
  get customerReviews(): ReviewProps[];
  get averageRating(): number;
  get numberOfReviews(): number;
  addReview(review: ReviewProps): void;
  getCustomerReviewById(id: number): ReviewProps;
  updateReviewById(id: number, review: ReviewProps): void;
  render(): void;
}

interface ReviewInterface {
  _props: ReviewProps;
  render(): string;
}
