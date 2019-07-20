# Site Scraper

_"Why don't just use **curl**?"_

You're right, curl can get the HTML content too.

But when come to single page application, we have to wait for JavaScript
to render it's content. Thus, we need [headless chrome](https://github.com/GoogleChrome/puppeteer).

This project is a wrapper function, which can treat it as a microservice,
to get the content by

```
GET /html?url=http://jslim.net/about/
```

## Setup

Set the environment variables

```
$ cp .env.example .env
$ vim .env
```

### Proxy

Proxy I would suggest to use [luminati.io](http://bit.ly/2XWFBhd), as the price consider quite cheap.

<a href="http://bit.ly/2XWFBhd" title="The largest proxy network" target="_blank"><img src="http://jslim.net/images/ads/lum_ad_250x250.png"/></a>

## Usage

Run it with docker

_(The docker image is [official node image](https://hub.docker.com/_/node/))_

```
$ docker-compose up -d
```

Then access it from browser: [127.0.0.1:3000](http://127.0.0.1:3000)

### API

| Method | Path  | Query string         | Description                                    |
|--------|-------|----------------------|------------------------------------------------|
| GET    | /html | url=http://jslim.net | Get the HTML content                           |
| GET    | /img  | url=http://jslim.net | Download all images from `<img>` into zip file |

## Disclaimer

Some of the links above are affiliate links.

## License

MIT License

Copyright (C) 2019 Js Lim

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
