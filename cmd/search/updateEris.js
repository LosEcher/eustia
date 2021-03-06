var request = require('request'),
    path = require('path'),
    fs = require('fs');

var logger = require('../../lib/logger');

var DOWNLOAD_PATH = 'https://raw.githubusercontent.com/liriliri/eris/master/eris.json',
    ERIS_PATH = path.resolve(__dirname, '../share/eris.json');

module.exports = function (options, cb)
{
    if (!options.update) return cb(null, require('../share/eris.json'));

    logger.tpl({}, 'UPDATE {{#cyan}}eris.json{{/cyan}}');

    request.get(DOWNLOAD_PATH)
        .on('response', function (res)
        {
            var status = res.statusCode;

            if (status < 200 || status >= 300)
            {
                return cb(new Error('Error downloading eris.json: ' + status));
            }
        })
        .pipe(fs.createWriteStream(ERIS_PATH))
        .on('close', function ()
        {
            fs.readFile(ERIS_PATH, 'utf-8', function (err, data)
            {
                if (err) return cb(err);
                cb(null, JSON.parse(data));
            });
        })
        .on('error', function (err) { cb(err) });
};