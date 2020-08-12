const puppeteer = require('puppeteer');
const { clickOnElement } = require('puppeteer');
const sleep = require('sleep');

class HomeController {
  // eslint-disable-next-line class-methods-use-this
  async listImages(req, res) {
    const { perfil } = req.params;

    const list = await (async () => {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.goto(`https://www.instagram.com/${perfil}`);
      // await page.screenshot({ path: 'isaaguiar18.png' });

      const listImg = await page.evaluate(() => {
        window.scrollBy(0, document.body.scrollHeight);
        const nodeList = document.querySelectorAll('article img');

        const imgArray = [...nodeList];
        const imgs = imgArray.map((img) => ({
          src: img.src,
        }));

        return imgs;
      });

      // await browser.close();
      return listImg;
    })();

    return res.json(list);
  }

  async Login(req, res) {
    const { login, password } = req.body;

    const result = await (async () => {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.goto('https://www.instagram.com/', { delay: 1000 });
      await page.waitFor(1000);
      await page.focus("input[name='username']", { delay: 1000 });

      await page.keyboard.type(login);
      await page.focus("input[name='password']", { delay: 1000 });

      await page.keyboard.type(password);
      await page.click("button[type='submit']", { delay: 1000 });

      // await browser.close();
    })();

    return res.json(result);
  }

  delay(time) {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  }
}

module.exports = new HomeController();
