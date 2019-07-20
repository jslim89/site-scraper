var express = require('express');
var router = express.Router();
const browser = require(__basedir + '/libs/browser');

/* Scrap web HTML content */
router.get('/', async function(req, res, next) {
  let output = await browser.get(req.query.url, (error) => {
    return document.querySelector('html').outerHTML;
  });
  res.send(output);
});

module.exports = router;
