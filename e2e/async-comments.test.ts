import puppeteer from "puppeteer";
import { assertEquals, fail } from "asserts";

Deno.test("Should display all async rendered comments on react-18 example app", async () => {
  const expected_comments = [
    "Wait, it doesn't wait for React to load?",
    "How does this even work?",
    "I like marshmallows",
  ];
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 979, height: 865 });
  await page.goto("http://localhost:8000/");

  try {
    const len = expected_comments.length;
    let index = 2; // nth-child css selector index

    for (let i = 0; i < len; i++) {
      const selector = `section > p:nth-child(${index})`;
      index = index + 1;
      const comment = await page.waitForSelector(selector, { timeout: 10000 });
      if (comment) {
        const text = await page.evaluate(
          (element) => element.textContent,
          comment,
        );
        assertEquals(text, expected_comments[i]);
      } else {
        fail(`ERROR: Selector ${selector} not found`);
      }
    }
  } catch (e) {
    fail(`ERROR: ${e}`);
  } finally {
    await browser.close();
  }
});
