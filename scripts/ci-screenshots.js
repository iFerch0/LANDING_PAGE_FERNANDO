const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

(async () => {
  const outDir = path.join(process.cwd(), 'tmp', 'screenshots');
  fs.mkdirSync(outDir, { recursive: true });

  const routes = [
    'http://localhost:3000/',
    'http://localhost:3000/servicios/reparacion-computadores-monteria',
    'http://localhost:3000/servicios/recuperacion-datos-monteria',
  ];

  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  for (const r of routes) {
    console.log('Visiting', r);
    const res = await page.goto(r, { waitUntil: 'networkidle2', timeout: 30000 });
    if (!res || res.status() >= 400) {
      console.error('Route failed', r, res && res.status());
      await browser.close();
      process.exit(2);
    }
    const file = path.join(outDir, encodeURIComponent(r) + '.png');
    await page.screenshot({ path: file, fullPage: true });
    console.log('Saved', file);
  }
  await browser.close();
  console.log('Screenshots complete');
})();
