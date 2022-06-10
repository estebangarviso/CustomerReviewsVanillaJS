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

type ModalState = {
  isOpen: boolean;
  title: string | null;
  body: HTMLElement | undefined;
  footer: HTMLElement | undefined;
  modal: HTMLElement | undefined;
};

type ModalAddReviewProps = {
  isOpen: boolean;
  onClose: () => void;
};

interface CustomerReviewsInterface {
  get customerReviews(): ReviewProps[];
  get averageRating(): number;
  get numberOfReviews(): number;
  addReview(review: ReviewProps): void;
  getCustomerReviewById(id: number): ReviewProps;
  updateReviewById(id: number, review: ReviewProps): void;
}

type FormDefinitionField = {
  label: string;
  name: string;
  value?: FormDataEntryValue;
  required: boolean;
  validate?: string;
  type?: string;
  tagName?: string;
  append?: string;
  prepend?: string;
};

type FormDefinition = FormDefinitionField[];

type FormValidate = { isValid: boolean; errors: string[] | [] };

type FormFieldElements = HTMLInputElement | HTMLTextAreaElement;

type NotificationsProps = {
  type: 'success' | 'danger' | 'warning' | 'info';
  message: string;
  title?: string;
};

// Extensions

interface String {
  toProperCase(): string;
  toSentenceCase(): string;
}
