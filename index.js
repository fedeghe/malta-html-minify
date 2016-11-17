require('malta').checkDeps('html-minifier');
/**
 * malta-html-minify plugin
 * dependency : html-minifier
 * 
 * affects: .html
 * outputs: a file named as the template
 * parameters accepted: all parameters accepted by the html-minifier (https://www.npmjs.com/package/html-minifier)
 * 
 * pipe support : yes
 */
var minify = require("html-minifier").minify,
	path = require('path'),
	fs = require('fs');

function malta_html_minify(o, options) {
	var self = this,
		namePack = this.outName,
		start = new Date(),
		msg,
		pluginName = path.basename(path.dirname(__filename)),
		doErr = function (e) {
			console.log(('[ERROR on ' + o.name + ' using ' + pluginName + '] :').red());
			console.dir(e);
			self.stop();
		};
	
	try {
		o.content = minify(o.content, options);
	} catch(err) {
		doErr(err);
	}
	
	return function (solve, reject){
		fs.writeFile(namePack, o.content, function(err) {
			err && doErr(err);
			msg = 'plugin ' + pluginName.white() + ' wrote ' + namePack + ' (' + self.getSize(namePack) + ')';
			solve(o);
			self.notifyAndUnlock(start, msg);
		});
	};
}
malta_html_minify.ext = ['html', 'md', 'pug'];
module.exports = malta_html_minify;