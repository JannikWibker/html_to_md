const filter_object = (obj, fn=((a,b) => !!a)) =>
  Object.assign(...Object.keys(obj).map(key => fn(obj[key], key) ? { [key]: obj[key] } : {}))

const _range = n => [...Array(n).keys()].map(x => null)
const  range = n => [...Array(n).keys()]

const transform = (element) => element ? filter_object({
  type: element.type || null,
  name: element.name || null,
  data: element.data || null,
  attribs: element.attribs,
  "x-attribsNamespace": element["x-attribsNamespace"],
  "x-attribsPrefix": element["x-attribsPrefix"],
  children: element.children ? element.children.map(transform) : element.children,
}) : ({})

const _remove_whitespace = x =>
  x.data
    ? /^\s+$/.test(x.data)
      ? Object.assign(x, {data: ''})
      : x
    : x

const remove_whitespace = x =>
  Object.assign(_remove_whitespace(x), x.children ? { children: x.children.map(remove_whitespace) } : {})

const _filter_whitespace = x =>
  x.data
    ? /^\s+$/.test(x.data) && x.data !== '&nbsp;' && x.data !== ' '
      ? null
      : x
    : x

const filter_whitespace = x => ((a=_filter_whitespace(x)) => a
    ? Object.assign(a, x.children
      ? {children: x.children.map(filter_whitespace).filter(x => !!x)}
      : {})
    : a
  )()

const trim_whitespace = (str, n=3) =>
  str.trim().replace(new RegExp('[\\n]{' + n + ',}', 'g'), '\n'.repeat(n))

module.exports = {
  filter_object,
  transform,
  _range,
  range,
  _remove_whitespace,
  remove_whitespace,
  _filter_whitespace,
  filter_whitespace,
  trim_whitespace,
}
