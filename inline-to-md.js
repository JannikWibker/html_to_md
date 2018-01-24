const inline = ({ filter_object, transform, _range, range, _remove_whitespace, remove_whitespace, _filter_whitespace, filter_whitespace }, {table}) => {
  const _inline = (inline, isStrictlyInline=false) => {

    const l_inline = filter_whitespace(transform(inline))

    const inline_elements = ['span', 'a', 'strong', 'b', 'em', 'i', 'strike', 'br', 'sup', 'sub', 'ul', 'ol', 'img', 'code']
    const block_elements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div', 'main', 'footer', 'header', 'dl', 'dd', 'table', 'body']
    const ignore_elements = ['math', 'script', 'noscript', 'form']
    const elements = [...inline_elements, ...block_elements, ...ignore_elements]
    if(inline.type !== 'text' && inline.type !== 'comment') {
      if(elements.filter(x => x === inline.name).length === 0) {
        console.log('unknown element')
        console.log(inline)
        console.log(l_inline)
      }
    }

    const span_to_md = (span) => span.children.map(_inline, true).join('')
    const link_to_md = (link) => `[${link.children.map(_inline, true).join('')}](${link.attribs ? link.attribs.href ? link.attribs.href : '' : ''})`
    const strong_to_md = (strong) => `**${strong.children.map(_inline, true).join('')}**`
    const em_to_md = (strong) => `_${strong.children.map(_inline, true).join('')}_`
    const strikethrough_to_md = (strikethrough) => `~~${strikethrough.children.map(_inline, true).join('')}~~`
    const sup_to_md = (sup) => sup.children.filter(x => x.name === 'a')[0]
      ? `<sup>${sup.children.map(_inline, true).join('')}</sup>`
      : `^${sup.children.map(_inline, true).join('')}^`
    const sub_to_md = (sub) => sub.children.filter(x => x.name === 'a')[0]
      ? `</sub>{${sub.children.map(_inline, true).join('')}}</sub>`
      : `~${sub.children.map(_inline, true).join('')}~`
    const list_to_md = (list) => {
      console.log(list)
      return '\n' + list.children
        .filter(x => x.type === 'tag' && x.name === 'li')
        .map((li, i) => `${list.name === 'ul' ? '-' : (i+1) + '.'} ${li.children.map(_inline, true).join('')}`)
        .join('\n') + '\n'
    }
    // use isStrictlyInline
    const code_to_md = (code) => `\`${code.children.map(_inline)}\``

    const heading_to_md = (nr, heading) => `\n\n${'#'.repeat(nr)} ${heading.children.map(_inline).join('')}\n\n`
    const paragraph_to_md = (paragraph) => `\n${paragraph.children.map(_inline).join('')}\n`
    const div_to_md = (div) => `\n${div.children.map(_inline).join('').trim()}\n`
    const table_to_md = (_table) => `\n${table(_table, {inline: _inline})}\n`

    const img_to_md = (img) => `![${l_inline.attribs.alt || ''}](${l_inline.attribs.src})`

    if(l_inline.type === 'text') return (l_inline.data.startsWith(' ') ? ' ' : '') + l_inline.data.trim() + (l_inline.data.endsWith(' ') ? ' ' : '')
    if(l_inline.type === 'tag') {

      switch(l_inline.name) {
        case 'span':    return span_to_md(l_inline)
        case 'a':       return link_to_md(l_inline)
        case 'strong':
        case 'b':       return strong_to_md(l_inline)
        case 'em':
        case 'i':       return em_to_md(l_inline)
        case 'strike':  return strikethrough_to_md(l_inline)
        case 'br':      return '\n'
        case 'sup':     return sup_to_md(l_inline)
        case 'sub':     return sub_to_md(l_inline)
        case 'ul':
        case 'ol':      return list_to_md(l_inline)
        case 'code':    return code_to_md(l_inline)

        case 'h1':      return heading_to_md(1, l_inline)
        case 'h2':      return heading_to_md(2, l_inline)
        case 'h3':      return heading_to_md(3, l_inline)
        case 'h4':      return heading_to_md(4, l_inline)
        case 'h5':      return heading_to_md(5, l_inline)
        case 'h6':      return heading_to_md(6, l_inline)
        case 'p':       return paragraph_to_md(l_inline)
        case 'div':     return div_to_md(l_inline)
        case 'main':    return div_to_md(l_inline)
        case 'footer':  return div_to_md(l_inline)
        case 'header':  return div_to_md(l_inline)
        case 'dl':      return div_to_md(l_inline)
        case 'dd':      return div_to_md(l_inline)
        case 'table':   return table_to_md(l_inline)
        case 'hr':      return '\n---\n'
        case 'body':    return l_inline.children.map(_inline).join('')

        case 'img':     return img_to_md(l_inline)

        default: return ''
      }

      // inline
      // if(l_inline.name === 'span') return span_to_md(l_inline)
      // if(l_inline.name === 'a') return link_to_md(l_inline)
      // if(l_inline.name === 'strong') return strong_to_md(l_inline)
      // if(l_inline.name === 'b') return strong_to_md(l_inline)
      // if(l_inline.name === 'em') return em_to_md(l_inline)
      // if(l_inline.name === 'i') return em_to_md(l_inline)
      // if(l_inline.name === 'strike') return strikethrough_to_md(l_inline)
      // if(l_inline.name === 'br') return '\n'
      // if(l_inline.name === 'sup') return sup_to_md(l_inline)
      // if(l_inline.name === 'sub') return sub_to_md(l_inline)
      // if(l_inline.name === 'ul') return list_to_md(l_inline)
      // if(l_inline.name === 'ol') return list_to_md(l_inline)
      // if(l_inline.name === 'code') return code_to_md(l_inline)

      // block
      // if(l_inline.name === 'h1') return heading_to_md(1, l_inline)
      // if(l_inline.name === 'h2') return heading_to_md(2, l_inline)
      // if(l_inline.name === 'h3') return heading_to_md(3, l_inline)
      // if(l_inline.name === 'h4') return heading_to_md(4, l_inline)
      // if(l_inline.name === 'h5') return heading_to_md(5, l_inline)
      // if(l_inline.name === 'h6') return heading_to_md(6, l_inline)
      // if(l_inline.name === 'p') return paragraph_to_md(l_inline)
      // if(l_inline.name === 'div') return div_to_md(l_inline)
      // if(l_inline.name === 'main') return div_to_md(l_inline)
      // if(l_inline.name === 'footer') return div_to_md(l_inline)
      // if(l_inline.name === 'header') return div_to_md(l_inline)
      // if(l_inline.name === 'dl') return div_to_md(l_inline)
      // if(l_inline.name === 'dd') return div_to_md(l_inline)
      // if(l_inline.name === 'table') return table_to_md(l_inline)
      // if(l_inline.name === 'body') return l_inline.children.map(_inline).join('')

      // can be both; use isStrictlyInline
      // if(l_inline.name === 'img') return img_to_md(l_inline)

      // else return ''
    }
  }
  return _inline
}

module.exports = inline
