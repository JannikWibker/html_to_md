const cheerio = require('cheerio')

const utils = require('./utils.js')
const table = require('./table-to-md.js')(utils)
const inline = require('./inline-to-md.js')(utils, {table})

const main = (html, selector='body') =>
  cheerio.load(html, {ignoreWhitespace: true})(selector)
    .toArray()
    .map(inline)
    .map(x => utils.trim_whitespace(x, 3))

module.exports = main
