/**************    Function   **************/
const Function = window.Function;

Function.is = function (c) {
  return typeof c == 'function' ? c : null;
};

Function.orNoop = function (callable) {
  return typeof callable == 'function' ? callable : () => {};
};

export default Function;