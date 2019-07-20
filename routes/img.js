var express = require('express');
var router = express.Router();
const browser = require(__basedir + '/libs/browser');
const logger = require(__basedir + '/libs/logger');
const ps = require('child_process');
const fs = require('fs');
const rimraf = require("rimraf");
const archiver = require('archiver');
const path = require('path');

let download = function(uri, downloadPath) {
  if (!fs.existsSync(downloadPath)) {
    fs.mkdirSync(downloadPath, {recursive: true});
  }
  let filename = path.basename(uri);
  ps.execFileSync('curl', ['--silent', '-o', downloadPath + filename, uri]);
};

/* Scrap web HTML content */
router.get('/', async function(req, res, next) {
  let timestamp = new Date().getTime();
  let downloadPath = __basedir + '/download/' + timestamp + '/';
  let urls = await browser.get(req.query.url, (error) => {
    var imgs = document.querySelectorAll('img'), i;
    var imageUrls = [];
		for (i = 0; i < imgs.length; ++i) {
			imageUrls.push(imgs[i].src);
		}
    return imageUrls;
  });
  for (i = 0; i < urls.length; i++) {
    download(urls[i], downloadPath);
  }

  let zipPath = __basedir + '/download/' + timestamp + '.zip';
  var output = fs.createWriteStream(zipPath);
  var archive = archiver('zip', {
    zlib: { level: 9 }
  });

  output.on('close', function () {
    logger.log(archive.pointer() + ' total bytes');
    logger.log('archiver has been finalized and the output file descriptor has closed.');
    rimraf.sync(downloadPath);
    res.download(zipPath);
  });

  archive.on('error', function(err) {
    logger.error(err);
    res.status(500).send('Error');
  });
  
	archive.pipe(output);
	archive.directory(downloadPath, false);
	archive.finalize();
});

module.exports = router;
