'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactLoadable = require('react-loadable');

var _reactLoadable2 = _interopRequireDefault(_reactLoadable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MyLoadable = function MyLoadable(loader) {
  return (0, _reactLoadable2.default)({
    loader: loader,
    loading: function loading() {
      return _react2.default.createElement("div", {});
    }
  });
};
exports.default = MyLoadable;
