export default class AsyncWorker {
  constructor(...path) {
    this.message = [];
    return this.install(...path);
  }

  get status() {
    let wk = this.worker;
    return (wk.active || wk.installing || wk.waiting).state;
  }

  get sW() {
    return (navigator || {
      serviceWorker: undefined
    }).serviceWorker;
  }

  get installable() {
    return this.sW ? this : (this.message.push("ServiceWorker dosn't in navigator"), null);
  }

  install(path, success) {
    if (!this.installable) return;
    return this.sW.register(path).then(sw => (this.worker = sw, success.call(this, sw))).catch(this.message.push), this.worker;
  }

  uninstall() {
    return this.worker.unregister().then(e => this.status = e ? 'uninstalled' : 'error').catch(this.message.push);
  }

}
;