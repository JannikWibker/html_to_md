const html_to_md = require('../index.js')

const html = `
<body>
  <h1>This is a H1</h1>
  <p>This is a paragraph</p>

  <h2>This is a H2</h2>
  <code>this is inline code</code>

  <h3>This is a H3</h3>
  <span>this is a span</span>

  <h4>This is a H4</h4>
  below is a table (and this is just a textnode)
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>name</th>
        <th>unit</th>
        <th>TCP/IP equivalent</th>
      </tr
    </thead>
    <tbody>
      <tr><td>7</td><td>application</td><td>&nbsp;</td><td rowspan="3">application</td</tr>
      <tr><td>6</td><td>presentation</td><td>&nbsp;</td></tr>
      <tr><td>5</td><td>session</td><td>&nbsp;</td></tr>
      <tr><td>4</td><td>transport</td><td>segments</td><td>transport</td></tr>
      <tr><td>3</td><td>network</td><td>packets</td><td>network</td></tr>
      <tr><td>2</td><td>data-link</td><td>frames</td><td rowspan="2">physical</td></tr>
      <tr><td>1</td><td>physical</td><td>bits</td></tr>
    </tbody>
  </table>

  <h5>This is a H5</h5>
  <img alt="this is an image" src="https://puu.sh/z1sab/dc0c7f7ef7.png" />

  <h6>This is a H6</h6>

  <p>this is <strong>bold</strong>, this is <i>italic</i> and this is <strike>strikethrough</strike></p>

</body>
`

console.log(html_to_md(html, 'body')[0])
