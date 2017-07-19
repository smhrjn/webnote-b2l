const read = require('node-readability')
const sanitizer = require('sanitizer')

//Module that reads a web page and takes its text out using both modules above
//output is sent to note creating route


module.exports = (url, next) => {
    read(url, function(err, article, meta) {
        if (err) return next(err, false);

        const scrapedArticle = {
            url: url,
            title: article.title.trim(),
            content: stripHTML(article.content || "" )
        }
        article.close();
        next(null, scrapedArticle);
    });

}

function stripHTML(html) {
    let clean = sanitizer.sanitize(html, function (str) {
        return str;
    });
    // Remove remaining HTML tags.
    clean = clean.replace(/<(?:.|\n)*?>/gm, "");


    //http://stackoverflow.com/questions/816085/removing-redundant-line-breaks-with-regular-expressions
    clean = clean.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/ig, "\n");

    // Return the resulting text trimming whitespace.
    return clean.trim();
}
