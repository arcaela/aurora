/**************    Number   **************/
const Number = window.Number;

Number.is = N => /^(\d+)(\.\d+)?$/gi.test(N) ? parseFloat(N) : null;

export default Number;