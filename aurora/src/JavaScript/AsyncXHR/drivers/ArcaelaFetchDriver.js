export default function ArcaelaFetchDriver(Request, Fetch) {
  let Cancelable = new AbortController(),
      signal = Cancelable.signal;
  Fetch.prototype.abort = Cancelable.abort;
  return Fetch.resolve(fetch(Request.url, { ...Request,
    signal
  }).catch(error => ({
    data: null,
    ok: false,
    status: 0,
    error
  })).then(response => {
    return { ...response,
      data: true,
      ok: response.statusText && response.statusText.toLowerCase() == 'ok' && response.status >= 200 && response.status < 300,
      code: response.status,
      mime: (response.headers || {})['content-type'] || 'text/plain'
    };
  }));
}
;