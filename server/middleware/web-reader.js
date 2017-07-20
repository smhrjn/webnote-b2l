const read = require('node-readability');
const sanitizer = require('sanitizer');

// Module that reads a web page and takes its text out using both modules above
// output is sent to note creating route
module.exports = (url, next) => {
	console.log('URL: ' + url);
	read(url, (err, article, meta) => {
		if (err) {
			return next(err, false);
		} else {
			if (article.content) {
				console.log('Title Before: ' + article.title.length);
				console.log('Content Before: ' + article.content.length);
				let scrapedArticle = {
					url: url,
					title: article.title.trim(),
					content: stripHTML(article.content || '')
				};
				if (!scrapedArticle.title.length) {
					scrapedArticle.title = 'Clipped!';
				}
				console.log('Title After: ' + scrapedArticle.title.length);
				console.log('Content After: ' + scrapedArticle.content.length);
				article.close();
				next(null, scrapedArticle);
			} else {
				return next('No Text Obtained From Given URL', false);
			}
		}
	});
};

const stripHTML = html => {
	// console.log('HTML: ' + html);
	let clean = sanitizer.sanitize(html, str => {
		return str;
	});

	// Remove remaining HTML tags.
	clean = clean.replace(/<(?:.|\n)*?>/gm, '');
	clean = clean.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/ig, '\n');
	// console.log('Clean Text: ' + clean);

	// Return the resulting text trimming whitespace.
	return clean.trim();
};
