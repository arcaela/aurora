export default function ArcaelaAxiosDriver(Request, Fetch) {
  let Instance = axios.create(),
      Cancelable = new axios.CancelToken(e => Fetch.prototype.abort = e);
  Request[Request.method == 'POST' ? 'data' : 'params'] = Request.body;
  return Fetch.resolve(Instance.request({ ...Request,
    cancelToken: Cancelable,
    validateStatus: () => true
  }).catch(error => ({
    code: 0,
    ok: false,
    status: 'fail',
    headers: {},
    data: null
  })).then(response => ({ ...response,
    code: response.status,
    ok: response.statusText && response.statusText.toLowerCase() == 'ok' && response.status > 199 && response.status < 400,
    status: response.status > 199 && response.status < 400,
    mime: (response.headers || {})['content-type'] || 'text/plain'
  })));
}
;