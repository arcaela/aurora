/**************    Promise   **************/
const Promise = window.Promise;
Promise.is = object=>(object instanceof Promise||(object.resolve && object.then && object.catch && typeof object == 'function'));
export default Promise;