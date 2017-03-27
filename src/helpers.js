
export const symbol = name => typeof Symbol !== 'undefined' ? Symbol(name) : `SOMESYMBOL_${name}`

export const DIRECTORY = symbol('DIRECTORY')
export const FILE = symbol('FILE')
export const ROOT = symbol('ROOT')


export const dir = (name) => ({
  name,
  type: DIRECTORY,
  contents: {},
})

export const file = (name, content = '') => ({
  name,
  type: FILE,
  content,
})

export const escapePath = path => path.replace(/\\+/g, '/')

export const simplify = node => {
  if (node.type === DIRECTORY) {
    const obj = {}

    Object.keys(node.contents)
      .forEach(key => { obj[key] = simplify(node.contents[key]) })

    return obj
  }
  else {
    return node.content ? `Length: ${node.content.length}` : '[Empty]'
  }
}

const PATCH_CREATE = symbol('PATCH_CREATE')
const PATCH_REMOVE = symbol('PATCH_REMOVE')
const PATCH_REPLACE_CONTENT = symbol('PATCH_REPLACE_CONTENT')
const PATCH_APPEND = symbol('PATCH_APPEND')
const PATCH_RENAME = symbol('PATCH_RENAME')
const PATCH_MOVE = symbol('PATCH_MOVE')

export const patches = { PATCH_CREATE, PATCH_REMOVE, PATCH_REPLACE_CONTENT, PATCH_REMOVE, PATCH_MOVE, PATCH_APPEND }

export const patchForFile = (action, path, changes = {}) => ({
  type: FILE,
  action,
  path,
  changes,
})

export const patchForDir = (action, path, changes = {}) => ({
  type: DIRECTORY,
  action,
  path,
  changes,
})
