const path = require('path');
const http = require('http');
const merry = require('merry'); // A cute server framework
const bankai = require('bankai'); // A cute asset streaming helper
const compression = require('compression'); // Compresssss 🙏

const clientPath = path.join(__dirname, 'client.js');
const assets = bankai(clientPath, {
    html: {
      title: 'long-way',
      body: `
        <div id="app"></div>
      `,
    },
    js: {
        transform: ['yo-yoify', 'sheetify/transform', 'babelify'],
    },
    uglify: true,
    assert: false,
});

var env = merry.env({ PORT: 8080 });
var app = merry();

app.use({
    onRequest: compression(),
});

const getHtml = (req, res) => assets.html(req, res).pipe(res);

app.router([
    ['/', getHtml],
    ['/404', getHtml],
    ['/bundle.js', (req, res) => assets.js(req, res).pipe(res)],
    ['/bundle.css', (req, res) => assets.css(req, res).pipe(res)],
]);

const server = http.createServer(app.start());
server.listen(env.PORT);
