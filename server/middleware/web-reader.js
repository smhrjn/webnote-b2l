const read = require('node-readability')
const sanitizer = require('sanitizer')

module.exports = (req, res, next) {
    read(req.body.weburl, function(err, article, meta) {
        if (err) {
			return res.json(err);
        const scrapedArticle = {
            url: req.body.weburl,
            title: article.title.trim(),
            content: stripHTML(article.content || "" );
        }
        article.close();
        next(scrapedArticle);
    });

});

function stripHTML(html) {
    let clean = sanitizer.sanitize(html, function (str) {
        return str;
    });
    // Remove all remaining HTML tags.
    clean = clean.replace(/<(?:.|\n)*?>/gm, "");


    // See: http://stackoverflow.com/questions/816085/removing-redundant-line-breaks-with-regular-expressions
    clean = clean.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/ig, "\n");

    // Return the final string, minus any leading/trailing whitespace.
    return clean.trim();
}
