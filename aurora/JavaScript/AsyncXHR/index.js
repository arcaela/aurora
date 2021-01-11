import ArcaelaAxiosDriver from 'arcaela/js/AsyncXHR/drivers/ArcaelaAxiosDriver';
import ArcaelaFetchDriver from 'arcaela/js/AsyncXHR/drivers/ArcaelaFetchDriver';
export default (function () {
  class AsyncXHR {
    constructor(url, inputs, headers) {
      this.url(url || window.location.href).cache(false).input(inputs || {}).headers({
        'X-Requested-With': 'XMLHttpRequest',
        "Content-Type": "application/json;charset=UTF-8",
        ...(headers || {})
      }).token(document.querySelector('[name="csrf-token"]'));
    }

    extends(key, ...params) {
      return __options = this[key] || {}, !params.length ? __options : params.length == 1 ? __options[params[0]] : (__options[params[0]] = params[1], this[key] = __options, this);
    }

    objectable(key, index, ...params) {
      return __inputs = this[key](index) || {}, !params.length ? __inputs : typeof params[0] == 'object' ? this[key](index, Object.merge(__inputs, params[0])) : params.length == 1 ? __inputs[params[0]] : (__inputs[params[0]] = params[1], this[key](index, __inputs));
    }

    get $request() {
      return {
        body: this.body(true),
        url: this.url(),
        method: this.method(),
        headers: this.headers(),

        get urlKey() {
          return this.method == 'GET' ? this.url + '/?' + JSON.stringify(this.body) : null;
        }

      };
    }

    body(auto = null) {
      return new class extends FormData {
        constructor($data) {
          super();
          return this.build($data), auto ? this.auto : this;
        }

        build($data = {}) {
          return Object.keys(this.$data = $data).forEach(key => {
            let val = $data[key];
            this.hasFile = val ? instanceOf(val, 'File') || instanceOf(val, 'FileList') || this.hasFile : this.hasFile;
            if (Array.isArray(val)) val.forEach(item => this.append(key + '[]', item));else this.set(key, val);
          }), this;
        }

        get auto() {
          return this.hasFile ? this : this.$data;
        }

        json() {
          return this.$data;
        }

        encode() {
          return this;
        }

      }({ ...this.input(),
        ...this.file(true)
      });
    }

    callbacks(key, callback = null) {
      let _all = this.config('__callbacks') || new Proxy({}, {
        get(root, _key) {
          return _key in root ? root[_key] : null;
        },

        set(root, _key, value) {
          return !(typeof value == 'function') ? null : root[_key] = value;
        }

      });

      return key === true ? _all : typeof key == 'string' ? callback === null ? _all[key] : (_all[key] = callback, this.config('__callbacks', _all)) : Array.isArray(key) ? key.map(k => {
        return _all[k];
      }) : this.config('__callbacks', _all);
    }

    driver(...params) {
      let keyStore = '[[drivers]]',
          error = (...content) => {
        if (!this.debug()) return;
        console.error(...content);
      },
          warn = (...content) => {
        if (!this.debug()) return;
        console.warn(...content);
      },
          DRIVERS = this[keyStore] || {
        active: null,
        $store: {},

        set $active(value) {
          return Object.keys(this.$store).indexOf(value) >= 0 ? (warn(`Driver "${value}" habilitado.`), this.active = value) : error(`El driver "${value}" no está definido.`);
        },

        get $active() {
          return this.$store[this.active] || error(this.active ? `El driver "${this.active}" no está definido.` : 'No has activado ningun driver');
        }

      };

      if (!params.length) return DRIVERS.$store;else if (params.length == 1) {
        if (params[0] === true) return DRIVERS.$active || (() => {});else if (typeof params[0] == 'string') return DRIVERS.$store[params[0]] || (error(`El driver "${value}" no está definido.`), () => {});
      } else if (params.length >= 1) {
        let key = params[0],
            noop = params[1];

        if (noop === true) {
          return DRIVERS.$active = key;
        } else if (typeof noop == 'function') {
          DRIVERS.$store[key] = noop;
        }
      }
      return this[keyStore] = DRIVERS, this;
    }

    config(...params) {
      return this.extends('__options', ...params);
    }

    data(...params) {
      return this.extends('__request', ...params);
    }

    debug(state) {
      return state == undefined ? this.debugging || null : (this.debugging = state, this);
    }

    then(_success, _error) {
      let Fetch = Promise,
          Request = this.$request,
          Cached = this.cache(),
          Callbacks = this.callbacks(true);

      Fetch.prototype.abort = () => {};

      (Callbacks.before || (() => {})).call(this, Request);
      return Fetch.resolve(null || Cached.get(Request.urlKey) || this.driver(true).call(this, Request, Fetch)).then(Response => {
        /*
            {
                code:0|100-550,
                ok:true|false,
                status:success|error|fail,
                headers:{},
                data:{},
            }
        */
        if (!Response || Response.code < 100) throw {
          data: Response || "Empty response",
          ok: false,
          status: 'fail',
          code: 0
        };
        (Callbacks.after || (() => {})).call(this, Response);
        let status = Response.ok && Response.code > 199 && Response.code < 400 && Response.data ? Response.data.status ? false || Response.data.status === 'success' || Response.data.status === true : true : false;
        return (status ? Response => {
          if (Cached.active && Request.urlKey) cache(Request.urlKey, Response, Cached.expire);
          return (_success || Callbacks.success || (R => R)).call(this, Response.data, Response);
        } : Response => {
          return (Callbacks.error || (R => {
            throw Response;
          })).call(this, Response);
        }).call(this, Response);
      }).catch(_error || Callbacks.fail || console.error);
    } /////////////////////////////////////////////////////////////////////////////////////////////////


    url(url) {
      return typeof url == 'string' ? this.data('url', url) : this.data('url');
    }

    headers(...params) {
      return this.objectable('data', '__headers', ...params);
    }

    input(...params) {
      return this.objectable('data', '__inputs', ...params);
    }

    method(...params) {
      if (!params.length) return (this.data('method') || 'GET').toUpperCase();else if (params[0].toString().match(/GET|POST|DELETE|PATCH|PUT/i)) return this.data('method', 'POST').input('_method', params[0].toUpperCase() == 'POST' ? '' : params[0]);
      return this.data('method', 'GET').input('_method', null);
    }

    cache(...params) {
      let cached = this.config('__cache') || {
        active: false,

        get expire() {
          return new Date().getTime() + target.time * 60 * 1000;
        },

        set expire(value) {
          this.time = Number.is(value) || this.time;
        },

        get get() {
          return keyIndex => {
            return this.active ? cache(keyIndex) : null;
          };
        },

        time: 3
      };
      if (!params.length) return cached;
      cached.active = !!params[0];
      cached.time = params.length ? params.length == 1 ? typeof params[0] == 'number' ? params[0] : 0 : typeof params[1] == 'number' ? params[0] : 0 : cached.time;
      return this.config('__cache', cached);
    }

    token(token) {
      return typeof token == 'undefined' ? this.input('_token') : this.input('_token', HTMLElement.is(token) ? token.value || token.content || '' : token);
    }

    file(input, name = 'FILES') {
      let FILES = this.data('__files') || {};
      if (typeof input == 'undefined' || input === true) return Object.keys(FILES).length ? FILES : null;else if (input instanceof HTMLElement && input.getAttribute('type') == 'file') name = input.getAttribute('name') || name, input = [...input.files];else if (input instanceof File) input = [input];else if (input instanceof FileList) input = [...input];else if (Array.isArray(input)) input = input.filter(file => file instanceof File);else input = [];
      FILES[name] = (FILES[name] || []).push(...input);
      return this.data('__files', FILES);
    }

    form(selector) {
      selector = typeof selector == 'string' ? document.querySelector(selector) : HTMLElement.is(selector) ? selector : selector instanceof jQuery ? selector[0] : null;
      if (!selector) return this;
      console.warn("Form: ", selector);
      return this.url(selector.getAttribute('action') || window.location.href).headers('Content-Type', selector.getAttribute('enctype' || undefined)).method(selector.getAttribute('action') || 'GET').input(Object.values(selector.elements).reduce((obj, input) => {
        if (['checkbox', 'radio'].indexOf((input.type || '').toLowerCase()) >= 0) input.value = input.checked ? 'on' : '';
        if (input.type && input.type == 'file') this.file(input);else if (input.name) obj[input.name] = input.value;
        return obj;
      }, {}));
    }

    before(loop = true) {
      return this.callbacks('before', loop);
    }

    success(loop = true) {
      return this.callbacks('success', loop);
    }

    error(loop = true) {
      return this.callbacks('error', loop);
    }

    after(loop = true) {
      return this.callbacks('after', loop);
    }

    fail(loop = true) {
      return this.callbacks('fail', loop);
    }

    abort(loop = true) {
      return this.callbacks('abort', loop);
    }

    uploading(loop = true) {
      return this.callbacks('uploading', loop);
    }

    downloading(loop = true) {
      return this.callbacks('downloading', loop);
    }

  }

  ;
  AsyncXHR.prototype.debug(false).driver('axios', ArcaelaAxiosDriver).driver('fetch', ArcaelaFetchDriver).driver('axios', true);
  return AsyncXHR;
})();