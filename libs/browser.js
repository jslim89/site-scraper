const puppeteer = require('puppeteer');
const logger = require('./logger');

const proxy = {
  host: process.env.PROXY_HOST,
  user: process.env.PROXY_USER,
  pass: process.env.PROXY_PASS,
};

module.exports.get = async (url, callback) => {
  var options = { args: ['--no-sandbox'] };
  if (proxy.host) options.args.push('--proxy-server=' + proxy.host);
  const browser = await puppeteer.launch(options);
  try {
    const page = await browser.newPage();
    if (proxy.host && proxy.user && proxy.pass) {
      await page.authenticate({
        username: proxy.user,
        password: proxy.pass
      });
    }
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9'
    });
    if (process.env.BROWSER_USER_AGENT) {
      await page.setUserAgent(process.env.BROWSER_USER_AGENT);
    }

    var reqArgs = {};
    if (process.env.BROWSER_TIMEOUT) {
      reqArgs.timeout = parseInt(process.env.BROWSER_TIMEOUT);
      reqArgs.waitUntil = 'networkidle2';
    }
    await page.goto(url, reqArgs);

    const body = await page.evaluate(callback);
    await browser.close();

    return body;
  } catch (error) {
    logger.error(error);
    await browser.close();
    return error;
  }
};
