import puppeteer from 'https://deno.land/x/puppeteer@9.0.2/mod.ts';
import {
  assertEquals,
  fail,
} from "https://deno.land/std@0.130.0/testing/asserts.ts";

Deno.test('Should display async rendered comments on react-18 example app home page', async () => {
    const expected = "Wait, it doesn't wait for React to load?";
    const selector = 'section > p:nth-child(2)';
    const browser = await puppeteer.launch({
        executablePath: Deno.env.get('chrome_path'),
        headless: true,
      }
    );
    const page = await browser.newPage();
    await page.setViewport({ width: 979, height: 865 });
    await page.goto('http://localhost:8000/');

    try {

      // testSelector(selector, expected);
      const comment = await page.waitForSelector(selector, {timeout: 15000});
      if (comment) {
        const text = await page.evaluate(element => element.textContent, comment);
        assertEquals(text, expected);
      } else {
        fail(`ERROR: Selector ${selector} not found`);
      }
    } catch (e) {
      fail(`ERROR:  ${e}`);
    } finally {
      await browser.close();
    }
})

const testSelector = async (selector, expectedText) => {
    const browser = await puppeteer.launch({
        executablePath: Deno.env.get('chrome_path'),
        headless: true,
      }
    );
    const page = await browser.newPage();
    await page.setViewport({ width: 979, height: 865 });
    await page.goto('http://localhost:8000/');

    try {
      const comment = await page.waitForSelector(selector)
      if (comment) {
        const text = await page.evaluate(element => element.textContent, comment);
        assertEquals(text, expectedText);
      } else {
        fail(`ERROR: Selector ${selector} not found`)
      }
    } finally {
      await browser.close();
    }
    // return Promise.resolve();
  }