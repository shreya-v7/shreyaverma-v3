export const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
};

export const FETCH_HEADERS = {
  Accept: 'application/json',
  'User-Agent': 'Mozilla/5.0 (compatible; portfolio-site/1.0)',
};

export function json(statusCode, body, extraHeaders = {}) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...CORS_HEADERS,
      ...extraHeaders,
    },
    body: JSON.stringify(body),
  };
}

export function corsPreflight() {
  return {
    statusCode: 204,
    headers: {
      ...CORS_HEADERS,
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
    body: '',
  };
}
