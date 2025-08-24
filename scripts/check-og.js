const https = require('https');
const http = require('http');

function checkUrl(url) {
  return new Promise((resolve) => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.request(url, { method: 'HEAD' }, (res) => {
      const contentType = res.headers['content-type'] || '';
      const ok = res.statusCode === 200 && contentType.startsWith('image/');
      resolve({ url, status: res.statusCode, contentType, ok });
    });
    req.on('error', (err) => resolve({ url, error: err.message, ok: false }));
    req.end();
  });
}

async function main() {
  const urls = [
    'https://www.ferchotecnico.com/hero-poster.jpg',
  ];

  const results = await Promise.all(urls.map(checkUrl));
  let allOk = true;
  results.forEach((r) => {
    if (!r.ok) {
      console.error('OG check failed:', r);
      allOk = false;
    } else {
      console.log('OG OK:', r.url, r.status, r.contentType);
    }
  });

  if (!allOk) process.exit(2);
}

main();
