import { test } from 'node:test';
import assert from 'node:assert/strict';
import { handler } from '../netlify/functions/substack-posts.mjs';

const feed = `<rss><channel><item><title>Test post</title><link>https://example.substack.com/p/test</link><description>A public post</description><pubDate>Tue, 17 Nov 2026 12:00:00 GMT</pubDate></item></channel></rss>`;
const event = { httpMethod: 'GET', queryStringParameters: { limit: '2' } };

for (const failure of ['network', 'json', 'http']) {
  test(`RSS survives ${failure} archive failure`, async () => {
    const previousFetch = globalThis.fetch;
    const previousEnv = process.env.SUBSTACK_PUBLICATION_URL;
    process.env.SUBSTACK_PUBLICATION_URL = 'https://example.substack.com';
    const calls = [];
    globalThis.fetch = async (url, options) => {
      calls.push(url);
      assert.ok(options.signal, 'upstream requests have a timeout');
      if (url.endsWith('/feed')) return new Response(feed);
      if (failure === 'network') throw new Error('upstream disconnected');
      if (failure === 'json') return new Response('{broken', { headers: { 'content-type': 'application/json' } });
      return new Response('Unavailable', { status: 503 });
    };
    try {
      const response = await handler(event);
      assert.equal(response.statusCode, 200);
      assert.equal(JSON.parse(response.body).posts[0].title, 'Test post');
      assert.equal(calls.length, 2, 'no redundant archive probe');
    } finally {
      globalThis.fetch = previousFetch;
      if (previousEnv === undefined) delete process.env.SUBSTACK_PUBLICATION_URL;
      else process.env.SUBSTACK_PUBLICATION_URL = previousEnv;
    }
  });
}
