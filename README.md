---
[![npm version](https://badge.fury.io/js/malta-html-minify.svg)](http://badge.fury.io/js/malta-html-minify)
[![npm downloads](https://img.shields.io/npm/dt/malta-html-minify.svg)](https://npmjs.org/package/malta-html-minify)
[![npm downloads](https://img.shields.io/npm/dm/malta-html-minify.svg)](https://npmjs.org/package/malta-html-minify)  
---  

This plugin can be used on: **.html** files and even on **.md** and **.pug** files after using the right plugin

Options : all options of the [html-minifier package](https://www.npmjs.com/package/html-minifier)

Sample usage:  
```
malta app/source/index.html public -plugins=malta-html-minify[removeAttributeQuotes:true,minifyJS:true,removeComments:true,removeEmptyAttributes:true,removeEmptyElements:true,maxLineLength:100,collapseWhitespace:true]
```
or in the .json file :
```
"app/source/index.html" : "public -plugins=malta-html-minify[removeAttributeQuotes:true,minifyJS:true,removeComments:true,removeEmptyAttributes:true,removeEmptyElements:true,maxLineLength:100,collapseWhitespace:true]"
```
or in a script : 
``` js
var Malta = require('malta');
Malta.get().check([
    'app/source/index.html',
    'public',
    '-plugins=malta-html-minify[removeAttributeQuotes:true,minifyJS:true]',
    '-options=showPath:false,watchInterval:500,verbose:0'
    ]).start(function (o) {
        var s = this;
        console.log('name : ' + o.name)
        console.log("content : \n" + o.content);
        'plugin' in o && console.log("plugin : " + o.plugin);
        console.log('=========');
    });
```