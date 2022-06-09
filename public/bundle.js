/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./components/CustomerReviews/index.ts":
/*!*********************************************!*\
  !*** ./components/CustomerReviews/index.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var Review_1 = __importDefault(__webpack_require__(/*! ../Review */ "./components/Review/index.ts"));

var template_2 = __importDefault(__webpack_require__(/*! ./template */ "./components/CustomerReviews/template.ts"));

var CustomerReviews = function () {
  function CustomerReviews() {
    this._customerReviews = [];
    this._customerReviews = [{
      id: 1,
      rating: 5,
      title: 'Great product!',
      name: 'John Doe',
      date: '2019-01-01',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nisl nunc eget lorem. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nisl nunc eget lorem.'
    }, {
      id: 2,
      rating: 4,
      title: 'Good product!',
      name: 'Jane Doe',
      date: '2019-01-02',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nisl nunc eget lorem. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nisl nunc eget lorem.'
    }, {
      id: 3,
      rating: 3,
      title: 'Average product!',
      name: 'Jack Doe',
      date: '2019-01-03',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nisl nunc eget lorem. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nisl nunc eget lorem.'
    }];
    var customerReviews = localStorage.getItem('customerReviews');

    if (customerReviews) {
      this._customerReviews = JSON.parse(customerReviews);
    }
  }

  CustomerReviews.prototype.init = function () {
    this.render();
  };

  Object.defineProperty(CustomerReviews.prototype, "customerReviews", {
    get: function get() {
      return this._customerReviews;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(CustomerReviews.prototype, "averageRating", {
    get: function get() {
      var sum = 0;
      var count = 0;

      this._customerReviews.forEach(function (customerReview) {
        sum += customerReview.rating;
        count++;
      });

      return sum / count;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(CustomerReviews.prototype, "numberOfReviews", {
    get: function get() {
      return this._customerReviews.length;
    },
    enumerable: false,
    configurable: true
  });

  CustomerReviews.prototype.addReview = function (review) {
    this._customerReviews.push(review);

    localStorage.setItem('customerReviews', JSON.stringify(this._customerReviews));
  };

  CustomerReviews.prototype.getCustomerReviewById = function (id) {
    var result = this._customerReviews.find(function (customerReview) {
      return customerReview.id === id;
    });

    if (!result) {
      throw new Error('No customer review found');
    }

    return result;
  };

  CustomerReviews.prototype.updateReviewById = function (id, review) {
    var index = this._customerReviews.findIndex(function (customerReview) {
      return customerReview.id === id;
    });

    this._customerReviews[index] = review;
    localStorage.setItem('customerReviews', JSON.stringify(this._customerReviews));
  };

  CustomerReviews.prototype.deleteReviewById = function (id) {
    var result = this._customerReviews.filter(function (customerReview) {
      return customerReview.id !== id;
    });

    this._customerReviews = result;
    localStorage.setItem('customerReviews', JSON.stringify(this._customerReviews));
  };

  CustomerReviews.prototype.render = function () {
    var _a = this,
        averageRating = _a.averageRating,
        numberOfReviews = _a.numberOfReviews;

    var app = document.getElementById('app');

    if (!app) {
      throw new Error('No app element found');
    }

    var overview = (0, template_2.default)({
      averageRating: averageRating,
      numberOfReviews: numberOfReviews
    });
    app.innerHTML = overview;
    var customerReviewsDiv = document.createElement('div');
    customerReviewsDiv.id = 'customer-reviews';

    this._customerReviews.forEach(function (review, index, array) {
      var customerReview = new Review_1.default(__assign({}, review));
      customerReviewsDiv.innerHTML += customerReview.render() + (index < array.length - 1 ? '<hr>' : '');
    });

    app.appendChild(customerReviewsDiv);
  };

  return CustomerReviews;
}();

exports["default"] = CustomerReviews;

/***/ }),

/***/ "./components/CustomerReviews/template.ts":
/*!************************************************!*\
  !*** ./components/CustomerReviews/template.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var Stars_1 = __importDefault(__webpack_require__(/*! ../Stars */ "./components/Stars/index.ts"));

var Template = function Template(_a) {
  var averageRating = _a.averageRating,
      numberOfReviews = _a.numberOfReviews;
  return "<h1>Customer Reviews</h1>\n  <div id=\"customer-reviews-overview\" class=\"row\">\n    <div class=\"col\">\n      <div class=\"d-flex align-items-ce nter\">\n        ".concat((0, Stars_1.default)(averageRating), "\n        <span class=\"pl-1\">Based on ").concat(numberOfReviews, " reviews</span>\n        <a id=\"add-customer-review\" class=\"link\"> Add a Review </a>\n      </div>\n    </div>\n  </div>\n  <hr />");
};

exports["default"] = Template;

/***/ }),

/***/ "./components/ModalAddReview/index.ts":
/*!********************************************!*\
  !*** ./components/ModalAddReview/index.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var template_1 = __importDefault(__webpack_require__(/*! ./template */ "./components/ModalAddReview/template.ts"));

var ModalAddReview = function () {
  function ModalAddReview() {
    this._isOpen = false;
  }

  Object.defineProperty(ModalAddReview.prototype, "isOpen", {
    get: function get() {
      return this._isOpen;
    },
    enumerable: false,
    configurable: true
  });

  ModalAddReview.prototype.open = function () {
    if (this._isOpen) return;
    this._isOpen = true;
    var modal = document.getElementById('modal-add-review');
    document.body.insertAdjacentHTML('beforeend', "<div id=\"modal-backdrop\" class=\"modal-backdrop fade".concat(this.isOpen ? ' show' : '', "\"></div>"));
    modal === null || modal === void 0 ? void 0 : modal.classList.add('show');
  };

  ModalAddReview.prototype.close = function () {
    if (!this.isOpen) return;
    this._isOpen = false;
    var modal = document.getElementById('modal-add-review');
    var backdrop = document.getElementById('modal-backdrop');
    modal === null || modal === void 0 ? void 0 : modal.classList.remove('show');
    backdrop === null || backdrop === void 0 ? void 0 : backdrop.classList.remove('show');
    setTimeout(function () {
      backdrop === null || backdrop === void 0 ? void 0 : backdrop.remove();
    }, 300);
  };

  ModalAddReview.prototype.init = function () {
    document.body.innerHTML += this.render();
    this.addEventListeners();
  };

  ModalAddReview.prototype.render = function () {
    return (0, template_1.default)();
  };

  ModalAddReview.prototype.addEventListeners = function () {
    var _this = this;

    var modal = document.getElementById('modal-add-review');
    var form = document.getElementById('form-customer-review');
    var closeButton = modal === null || modal === void 0 ? void 0 : modal.querySelector('[data-dismiss="modal"]');
    var saveButton = modal === null || modal === void 0 ? void 0 : modal.querySelector('[data-submit="form-customer-review"]');
    document.body.addEventListener('click', function (event) {
      if (event.target.id === 'add-customer-review') {
        _this.open();
      }
    });
    closeButton === null || closeButton === void 0 ? void 0 : closeButton.addEventListener('click', function () {
      _this === null || _this === void 0 ? void 0 : _this.close();
    });
    saveButton === null || saveButton === void 0 ? void 0 : saveButton.addEventListener('click', function () {
      form === null || form === void 0 ? void 0 : form.dispatchEvent(new Event('submit'));
    });
    form === null || form === void 0 ? void 0 : form.addEventListener('submit', function (event) {
      event.preventDefault();
      var formData = new FormData(form);
      console.log(formData);
    });
  };

  return ModalAddReview;
}();

exports["default"] = ModalAddReview;

/***/ }),

/***/ "./components/ModalAddReview/template.ts":
/*!***********************************************!*\
  !*** ./components/ModalAddReview/template.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var Template = function Template() {
  return "\n    <div class=\"modal fade\" id=\"modal-add-review\" role=\"dialog\">\n      <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n            <h5 class=\"modal-title\">Add a Review</h5>\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n              <span>&times;</span>\n            </button>\n          </div>\n          <div class=\"modal-body\">\n            <form id=\"form-customer-review\" novalidate>\n              <div class=\"form-group\">\n                <div class=\"input-group\">\n                  <input type=\"hidden\" id=\"review_rating\" name=\"review_rating\" />\n                </div>\n              </div>\n              <div class=\"form-group\">\n                <div class=\"input-group\">\n                  <input\n                    type=\"text\"\n                    class=\"form-control\"\n                    id=\"review_title\"\n                    name=\"review_title\"\n                    placeholder=\"Title\"\n                    required\n                  />\n                </div>\n              </div>\n              <div class=\"form-group\">\n                <div class=\"input-group\">\n                  <input\n                    type=\"text\"\n                    class=\"form-control\"\n                    id=\"review_name\"\n                    name=\"review_name\"\n                    placeholder=\"Name\"\n                    required\n                  />\n                </div>\n              </div>\n              <div class=\"form-group\">\n                <textarea\n                  class=\"form-control\"\n                  id=\"review_comment\"\n                  name=\"review_comment\"\n                  rows=\"3\"\n                  placeholder=\"Excellent product and fast delivery!\"\n                ></textarea>\n              </div>\n            </form>\n          </div>\n          <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n            <button type=\"button\" class=\"btn btn-primary\" data-submit=\"form-customer-review\">Submit Review</button>\n          </div>\n        </div>\n      </div>\n    </div>\n  ";
};

exports["default"] = Template;

/***/ }),

/***/ "./components/Review/index.ts":
/*!************************************!*\
  !*** ./components/Review/index.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var template_3 = __importDefault(__webpack_require__(/*! ./template */ "./components/Review/template.ts"));

var Review = function () {
  function Review(props) {
    this._props = props;
  }

  Object.defineProperty(Review.prototype, "id", {
    get: function get() {
      return this._props.id;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Review.prototype, "rating", {
    get: function get() {
      return this._props.rating;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Review.prototype, "title", {
    get: function get() {
      return this._props.title;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Review.prototype, "name", {
    get: function get() {
      return this._props.name;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Review.prototype, "date", {
    get: function get() {
      var date = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
      }).format(new Date(this._props.date));
      return date;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Review.prototype, "comment", {
    get: function get() {
      return this._props.comment;
    },
    enumerable: false,
    configurable: true
  });

  Review.prototype.render = function () {
    return (0, template_3.default)(this);
  };

  return Review;
}();

exports["default"] = Review;

/***/ }),

/***/ "./components/Review/template.ts":
/*!***************************************!*\
  !*** ./components/Review/template.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var Stars_2 = __importDefault(__webpack_require__(/*! ../Stars */ "./components/Stars/index.ts"));

var Template = function Template(review) {
  var rating = review.rating,
      title = review.title,
      name = review.name,
      date = review.date,
      comment = review.comment;
  return "\n    <div class=\"review\">\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"container\">\n            ".concat((0, Stars_2.default)(rating), "\n            <h2 class=\"review-title\">").concat(title, "</h2>\n            <p class=\"review-date\"><span class=\"review-name\">").concat(name, "</span> ").concat(date, "</p>\n            <p class=\"review-comment\">").concat(comment, "</p>\n          </div>\n        </div>\n      </div>\n    </div>\n  ");
};

exports["default"] = Template;

/***/ }),

/***/ "./components/Stars/index.ts":
/*!***********************************!*\
  !*** ./components/Stars/index.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var Template = function Template(rating) {
  if (rating === void 0) {
    rating = 0;
  }

  return "<div class=\"stars\" data-rating=\"".concat(rating, "\">\n  <svg class=\"star\" data-rating=\"1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 200 200\" enable-background=\"new 0 0 200 200\">\n    <path\n      d=\"M195.253,69.06h-69.241L104.224,3.309c-0.68-2.051-2.526-3.077-4.373-3.077V69.06v83.591l60.468,46.592\nc3.548,2.734,8.621-0.627,7.24-4.796l-24.804-74.854l55.364-42.659C201.508,74.322,199.591,69.06,195.253,69.06z\"\n    />\n    <path\n      d=\"M95.479,3.309L73.692,69.06H4.45c-4.339,0-6.255,5.262-2.867,7.873l55.364,42.659l-24.804,74.854\nc-1.381,4.169,3.692,7.53,7.24,4.796l60.468-46.592V69.06V0.232C98.005,0.232,96.159,1.258,95.479,3.309z\"\n    />\n  </svg>\n  <svg class=\"star\" data-rating=\"2\" x=\"0px\" y=\"0px\" viewBox=\"0 0 200 200\" enable-background=\"new 0 0 200 200\">\n    <path\n      d=\"M195.253,69.06h-69.241L104.224,3.309c-0.68-2.051-2.526-3.077-4.373-3.077V69.06v83.591l60.468,46.592\nc3.548,2.734,8.621-0.627,7.24-4.796l-24.804-74.854l55.364-42.659C201.508,74.322,199.591,69.06,195.253,69.06z\"\n    />\n    <path\n      d=\"M95.479,3.309L73.692,69.06H4.45c-4.339,0-6.255,5.262-2.867,7.873l55.364,42.659l-24.804,74.854\nc-1.381,4.169,3.692,7.53,7.24,4.796l60.468-46.592V69.06V0.232C98.005,0.232,96.159,1.258,95.479,3.309z\"\n    />\n  </svg>\n  <svg class=\"star\" data-rating=\"3\" x=\"0px\" y=\"0px\" viewBox=\"0 0 200 200\" enable-background=\"new 0 0 200 200\">\n    <path\n      d=\"M195.253,69.06h-69.241L104.224,3.309c-0.68-2.051-2.526-3.077-4.373-3.077V69.06v83.591l60.468,46.592\nc3.548,2.734,8.621-0.627,7.24-4.796l-24.804-74.854l55.364-42.659C201.508,74.322,199.591,69.06,195.253,69.06z\"\n    />\n    <path\n      d=\"M95.479,3.309L73.692,69.06H4.45c-4.339,0-6.255,5.262-2.867,7.873l55.364,42.659l-24.804,74.854\nc-1.381,4.169,3.692,7.53,7.24,4.796l60.468-46.592V69.06V0.232C98.005,0.232,96.159,1.258,95.479,3.309z\"\n    />\n  </svg>\n  <svg class=\"star\" data-rating=\"4\" x=\"0px\" y=\"0px\" viewBox=\"0 0 200 200\" enable-background=\"new 0 0 200 200\">\n    <path\n      d=\"M195.253,69.06h-69.241L104.224,3.309c-0.68-2.051-2.526-3.077-4.373-3.077V69.06v83.591l60.468,46.592\nc3.548,2.734,8.621-0.627,7.24-4.796l-24.804-74.854l55.364-42.659C201.508,74.322,199.591,69.06,195.253,69.06z\"\n    />\n    <path\n      d=\"M95.479,3.309L73.692,69.06H4.45c-4.339,0-6.255,5.262-2.867,7.873l55.364,42.659l-24.804,74.854\nc-1.381,4.169,3.692,7.53,7.24,4.796l60.468-46.592V69.06V0.232C98.005,0.232,96.159,1.258,95.479,3.309z\"\n    />\n  </svg>\n  <svg class=\"star\" data-rating=\"5\" x=\"0px\" y=\"0px\" viewBox=\"0 0 200 200\" enable-background=\"new 0 0 200 200\">\n    <path\n      d=\"M195.253,69.06h-69.241L104.224,3.309c-0.68-2.051-2.526-3.077-4.373-3.077V69.06v83.591l60.468,46.592\nc3.548,2.734,8.621-0.627,7.24-4.796l-24.804-74.854l55.364-42.659C201.508,74.322,199.591,69.06,195.253,69.06z\"\n    />\n    <path\n      d=\"M95.479,3.309L73.692,69.06H4.45c-4.339,0-6.255,5.262-2.867,7.873l55.364,42.659l-24.804,74.854\nc-1.381,4.169,3.692,7.53,7.24,4.796l60.468-46.592V69.06V0.232C98.005,0.232,96.159,1.258,95.479,3.309z\"\n    />\n  </svg>\n</div>");
};

exports["default"] = Template;

/***/ }),

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var ModalAddReview_1 = __importDefault(__webpack_require__(/*! ./components/ModalAddReview */ "./components/ModalAddReview/index.ts"));

var CustomerReviews_1 = __importDefault(__webpack_require__(/*! ./components/CustomerReviews */ "./components/CustomerReviews/index.ts"));

__webpack_require__(/*! ./index.scss */ "./index.scss");

var modalAddReview = new ModalAddReview_1.default();
modalAddReview.init();
var customerReviews = new CustomerReviews_1.default();
customerReviews.init();

/***/ }),

/***/ "../node_modules/mini-css-extract-plugin/dist/loader.js??ruleSet[1].rules[3].use[1]!../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[3].use[4]!./index.scss":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../node_modules/mini-css-extract-plugin/dist/loader.js??ruleSet[1].rules[3].use[1]!../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[3].use[4]!./index.scss ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function() {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./index.scss":
/*!********************!*\
  !*** ./index.scss ***!
  \********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "../node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ruleSet_1_rules_3_use_1_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_2_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_use_3_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_3_use_4_index_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/mini-css-extract-plugin/dist/loader.js??ruleSet[1].rules[3].use[1]!../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[3].use[4]!./index.scss */ "../node_modules/mini-css-extract-plugin/dist/loader.js??ruleSet[1].rules[3].use[1]!../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[3].use[4]!./index.scss");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ruleSet_1_rules_3_use_1_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_2_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_use_3_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_3_use_4_index_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ruleSet_1_rules_3_use_1_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_2_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_use_3_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_3_use_4_index_scss__WEBPACK_IMPORTED_MODULE_6__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_mini_css_extract_plugin_dist_loader_js_ruleSet_1_rules_3_use_1_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_2_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_use_3_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_3_use_4_index_scss__WEBPACK_IMPORTED_MODULE_6__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _node_modules_mini_css_extract_plugin_dist_loader_js_ruleSet_1_rules_3_use_1_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_2_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_use_3_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_3_use_4_index_scss__WEBPACK_IMPORTED_MODULE_6__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()((_node_modules_mini_css_extract_plugin_dist_loader_js_ruleSet_1_rules_3_use_1_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_2_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_use_3_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_3_use_4_index_scss__WEBPACK_IMPORTED_MODULE_6___default()), options);




       /* harmony default export */ __webpack_exports__["default"] = ((_node_modules_mini_css_extract_plugin_dist_loader_js_ruleSet_1_rules_3_use_1_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_2_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_use_3_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_3_use_4_index_scss__WEBPACK_IMPORTED_MODULE_6___default()) && (_node_modules_mini_css_extract_plugin_dist_loader_js_ruleSet_1_rules_3_use_1_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_2_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_use_3_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_3_use_4_index_scss__WEBPACK_IMPORTED_MODULE_6___default().locals) ? (_node_modules_mini_css_extract_plugin_dist_loader_js_ruleSet_1_rules_3_use_1_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_2_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_use_3_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_3_use_4_index_scss__WEBPACK_IMPORTED_MODULE_6___default().locals) : undefined);


/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \*****************************************************************************/
/***/ (function(module) {

"use strict";


var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!*********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \*********************************************************************/
/***/ (function(module) {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!***********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \***********************************************************************/
/***/ (function(module) {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!***********************************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \***********************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!****************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \****************************************************************/
/***/ (function(module) {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!**********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \**********************************************************************/
/***/ (function(module) {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	!function() {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map