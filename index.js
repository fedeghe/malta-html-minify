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
const minify = require("html-minifier").minify,
	path = require('path'),
	fs = require('fs');

function malta_html_minify(o, options) {
	const self = this,
		namePack = this.outName,
		start = new Date(),
        pluginName = path.basename(path.dirname(__filename));
        
    let msg;
	
	return (solve, reject) => {
        try {
            o.content = minify(o.content, options);
            fs.writeFile(namePack, o.content, err => {
                err && self.doErr(err, o, pluginName);
                msg = 'plugin ' + pluginName.white() + ' wrote ' + namePack + ' (' + self.getSize(namePack) + ')';
                err
                    ? reject(`Plugin ${pluginName} write error:\n${err}`)
                    : solve(o);
                self.notifyAndUnlock(start, msg);
            });
        } catch (err) {
            reject(`Plugin ${pluginName} minification error:\n${err}`)
            self.doErr(err, o, pluginName);
        }
	};
}
malta_html_minify.ext = ['html', 'md', 'pug'];
module.exports = malta_html_minify;