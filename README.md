#### README.md

##### How to use

For basic usage take a look at the demo folder (especially the demo.js file)

```js
const html_to_md = require('./index.js') // I don't know if ill publish this on npm so for now using it with the complete path is required

const html = `
<body>
  <h1>This is a headline</h1>
  This is just some text
</body>
`

console.log(html_to_md(html, 'body')[0])
// -> # This is a headline
// ->
// -> This is just some text

// the 'body' is a selector (works just like document.querySelectorAll). The default is 'body'.
```
