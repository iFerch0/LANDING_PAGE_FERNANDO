/* eslint-disable no-console */

const fs = require('node:fs/promises');
const path = require('node:path');
const puppeteer = require('puppeteer');

async function main() {
  const baseUrl = process.env.CI_BASE_URL || 'http://localhost:3000';
  const outputDir = path.join(process.cwd(), 'artifacts', 'ci-screenshots');
  const outputFile = path.join(outputDir, 'home.png');

  await fs.mkdir(outputDir, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(baseUrl, { waitUntil: 'networkidle2', timeout: 60000 });
    await page.screenshot({ path: outputFile, fullPage: true });
    console.log(`Smoke screenshot generated at ${outputFile}`);
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
