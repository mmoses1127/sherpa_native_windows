const csrfFetch = async (url, options = {}) => {
  // set options.method to 'GET' if there is no method
  options.method = options.method || 'GET';
  // set options.headers to an empty object if there is no headers
  options.headers = options.headers || {};

  // if the options.method is not 'GET', then set the 'Content-Type' header to 'application/json', and set the 'XSRF-TOKEN' header to the value of the `XSRF-TOKEN` cookie
  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] =
      options.headers['Content-Type'] || 'application/json';
    options.headers['X-CSRF-TOKEN'] = sessionStorage.getItem('X-CSRF-Token');
  }

  // call the default window's fetch with the url and the options passed in
  const res = await fetch(url, options);

  // if the response status code is 400 or above, then throw an error with the error being the response
  if (res.status >= 400) throw res;

  // if the response status code is under 400, then return the response to the next promise chain
  return res;
};

export async function restoreCSRF() {
  const response = await csrfFetch("/api/session");
  storeCSRFToken(response);
  return response;
}

export const storeCSRFToken = (response) => {
  const csrfToken = response.headers.get('X-CSRF-Token');
  if (csrfToken) sessionStorage.setItem('X-CSRF-Token', csrfToken);
}

export default csrfFetch;