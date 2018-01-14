const nl = '\n'
const table = ({ filter_object, _range, range, transform, _remove_whitespace, remove_whitespace, _filter_whitespace, filter_whitespace }) => (table, {inline=x => x.data}) => {
  //console.log(table)
  const l_table = filter_whitespace(transform(table))

  //console.log(l_table)

  if(l_table.name === 'table') {
    let str = ''
    const isTHead = l_table.children[0].name === 'thead' && l_table.children[1].name === 'tbody'
    if(l_table.children[0].name === 'tbody' || isTHead) {
      let l_trows
      if(isTHead) l_trows = l_table.children[1].children
      else        l_trows = l_table.children[0].children

      const l_theading = l_table.children[0].children[0]
      const l_trow_count = l_trows.length
      const l_tcolumn_count = l_trows[0].children.length
      const l_theading_titles = l_theading.children.map(x => x.name === 'th'
        ? x.children.map(inline).join('').replace(/\|/g, '\\|')
        : null)
      str += '| ' + l_theading_titles.join(' | ') + ' |' + nl
      str += '| :-- '.repeat(l_tcolumn_count) + '|' + nl


      const data = _range(l_trow_count - (isTHead ? 0 : 1)).map(() => _range(l_tcolumn_count))

      const rowspan_cells = []
      const colspan_cells = []

      l_trows.slice(isTHead ? 0 : 1).forEach((row, a) =>
        row.children.forEach((child, b) => {
          data[a][b] = (child.children[0]
            ? child.children.map(inline).join('')
            : child.data
              ? inline(child)
              : '&nbsp;'
            )

          if(child.attribs)
            if(child.attribs.rowspan)
              rowspan_cells.push({a: a, b: b, rowspan: parseInt(child.attribs.rowspan)})
            if(child.attribs.colspan)
              colspan_cells.push({a: a, b: b, colspan: parseInt(child.attribs.colspan)})
          })
        )

      rowspan_cells.forEach(({a, b, rowspan}) => {
        const r = range(rowspan-1).map(x => x + a + 1)
        r.forEach(x => data[x].splice(b, 0, '^ '))
        r.map(x => data[x] = data[x].filter(y => y !== null))
      })

      colspan_cells.forEach(({a, b, colspan}) => {
        const r = range(colspan-1).map(x => x + b)
        r.forEach(x => data[a].splice(x, 0, '>'))
        data[a] = data[a].filter(y => y !== null)
      })

      //console.log(data)

      str += data.map(x => x.map(y => '| ' + y + ' ').join('') + '|').join(nl)
      //console.log(str)
      return str
    }
  }
}

module.exports = table
