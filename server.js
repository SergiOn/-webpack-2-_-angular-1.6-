var static = require('node-static');
var file = new static.Server('./client');

require('http').createServer(function (request, response) {
    if (!/\./.test(request.url)) {
        request.url = '/';
    }
    file.serve(request, response);
}).listen(5000);