/**************    JSON   **************/
const JSON = window.JSON;

JSON.toURL = function (_ob_) {
  _ob_ = Object.filter(_ob_, v => Number.is(v) || String.is(v));
  return Object.keys(_ob_).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(_ob_[k])).join('&');
};

export default JSON;