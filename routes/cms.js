var express = require('express');
var router = express.Router();
var contentFul = require('contentful');

/**
 * Home page loader
 */
router.get('/', function(req, res) {
    // load contentFul content
    getContentFulClient(req.app.get('config').contentFul).getEntries(
        {
            'content_type': 'homepage',
        }
    ).then(function (entries) {
        // get the only we want :)
        if (entries.total > 0) {
            var entry = entries.items[0];
            res.render('cms/homepage', {entry: entry.fields});
        }
    })
});

router.get('/:uri', function(req, res) {
    getContentFulClient(req.app.get('config').contentFul).getEntries(
        {
            'content_type': 'content',
            'fields.url': req.params.uri
        }
    ).then(function(entries) {
        if (entries.total === 0) {
            res.redirect('/')
        }

        res.render('cms/content', {entry: entries.items[0].fields});
    })
})

function getContentFulClient(configs) {
    return contentFul.createClient(configs);
}

module.exports = router;