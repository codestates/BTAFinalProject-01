'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function useForceUpdate() {
  var _useState = React.useState(Object.create(null)),
      dispatch = _useState[1];

  return React.useCallback(function () {
    dispatch(Object.create(null));
  }, [dispatch]);
}

var stack = [];
var forceUpdateStack = [];

function useForceUpdateStack() {
  var update = useForceUpdate();
  React.useEffect(function () {
    forceUpdateStack.push(update);
    return function () {
      var index = forceUpdateStack.indexOf(update);

      if (index > -1) {
        forceUpdateStack.splice(index, 1);
      }
    };
  }, [update]);
}

function forceUpdate() {
  forceUpdateStack.forEach(function (fn) {
    return fn();
  });
}

function goTo(comp, props) {
  if (props === void 0) {
    props = {};
  }

  stack.push({
    component: comp,
    props: props
  });
  forceUpdate();
}

function goBack() {
  if (stack.length) {
    stack.pop();
  }

  forceUpdate();
}

function popToTop() {
  stack = [];
  forceUpdate();
}

function getCurrent() {
  return stack[stack.length - 1] || {
    component: false,
    props: null
  };
}

function getComponentStack() {
  return stack;
}

function Link(_ref) {
  var _ref$id = _ref.id,
      id = _ref$id === void 0 ? '' : _ref$id,
      component = _ref.component,
      children = _ref.children,
      _ref$props = _ref.props,
      props = _ref$props === void 0 ? {} : _ref$props,
      _ref$href = _ref.href,
      href = _ref$href === void 0 ? '' : _ref$href,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      _ref$tag = _ref.tag,
      tag = _ref$tag === void 0 ? 'a' : _ref$tag,
      onClick = _ref.onClick,
      restProps = _objectWithoutPropertiesLoose(_ref, ["id", "component", "children", "props", "href", "className", "tag", "onClick"]);

  var onClickHandler = React.useCallback(function (evt) {
    evt.preventDefault();

    if (component) {
      goTo(component, props);
    }

    if (!component && href) {
      window.open(href);
    }

    onClick && onClick(evt);
  }, [component, props, href, onClick]);
  return React.createElement(tag, _extends({
    href: href,
    className: className,
    id: id,
    onClick: onClickHandler
  }, restProps), children);
}

function NavLink(_ref2) {
  var _ref2$id = _ref2.id,
      id = _ref2$id === void 0 ? '' : _ref2$id,
      component = _ref2.component,
      children = _ref2.children,
      _ref2$props = _ref2.props,
      props = _ref2$props === void 0 ? {} : _ref2$props,
      _ref2$href = _ref2.href,
      href = _ref2$href === void 0 ? '' : _ref2$href,
      _ref2$className = _ref2.className,
      className = _ref2$className === void 0 ? '' : _ref2$className,
      _ref2$activeClassName = _ref2.activeClassName,
      activeClassName = _ref2$activeClassName === void 0 ? '' : _ref2$activeClassName,
      _ref2$tag = _ref2.tag,
      tag = _ref2$tag === void 0 ? 'a' : _ref2$tag,
      onClick = _ref2.onClick,
      restProps = _objectWithoutPropertiesLoose(_ref2, ["id", "component", "children", "props", "href", "className", "activeClassName", "tag", "onClick"]);

  var onClickHandler = React.useCallback(function (evt) {
    evt.preventDefault();

    if (component) {
      goTo(component, props);
    }

    if (!component && href) {
      window.open(href);
    }

    onClick && onClick(evt);
  }, [component, props, href, onClick]);
  useForceUpdateStack();

  if (stack.length > 0 && stack[stack.length - 1].component === component) {
    className = activeClassName + ' ' + className;
  }

  return React.createElement(tag, _extends({
    href: href,
    className: className,
    id: id,
    onClick: onClickHandler
  }, restProps), children);
}

var emptyStackComponent = {
  component: function component(_ref3) {
    var children = _ref3.children;
    return children;
  },
  props: {}
};

function Router(_ref4) {
  var children = _ref4.children;
  useForceUpdateStack();

  var _ref5 = stack[stack.length - 1] || emptyStackComponent,
      Component = _ref5.component,
      props = _ref5.props;

  return React.createElement(Component, props, children);
}

exports.Link = Link;
exports.NavLink = NavLink;
exports.Router = Router;
exports.getComponentStack = getComponentStack;
exports.getCurrent = getCurrent;
exports.goBack = goBack;
exports.goTo = goTo;
exports.popToTop = popToTop;
//# sourceMappingURL=react-chrome-extension-router.cjs.development.js.map
