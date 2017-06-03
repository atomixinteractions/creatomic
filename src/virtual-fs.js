import treeify from 'treeify'
import {
  ROOT,
  FILE,
  DIRECTORY,
  dir,
  file,
  escapePath,
  simplify,
  patches,
  patchForDir,
  patchForFile,
} from './helpers'

const chalk = require('chalk')
const g = chalk.green.bold
const r = chalk.red.bold
const y = chalk.yellow.bold
const b = chalk.bold


/**
 * @typedef {Object} GeneratorConfig
 */

export class VirtualFS {
  /**
   * @member {GeneratorConfig}
   */
  config = {}

  /**
   * Directory tree
   * @member {Object}
   */
  tree = dir(ROOT)

  patches = []
  enabledPatches = true


  constructor(config = {}) {
    this.config = config
  }

  addPatch(patch) {
    if (this.enabledPatches) {
      this.patches.push(patch)
    }
  }

  /**
   *
   * @param {string} path
   */
  touch(path) {
    this.createFile(path)
  }

  /**
   *
   * @param {string} path
   * @param {any} content
   */
  createFile(path, content = '') {
    const chunks = escapePath(path).split('/')
    const filename = chunks.pop()

    const dir = this.recursiveCreateDirs(chunks)

    dir.contents[filename] = file(filename, content)

    this.addPatch(patchForFile(patches.PATCH_CREATE, path, { content }))
  }

  /**
   *
   * @param {Array<string>|string} path
   */
  recursiveCreateDirs(path) {
    let chunks = path

    if (typeof path === 'string') {
      chunks = escapePath(path).split('/')
    }

    let current = this.tree
    let currentPath = []

    while (chunks.length) {
      const chunk = chunks.shift()
      currentPath.push(chunk)

      if (!current.contents[chunk]) {
        current.contents[chunk] = dir(chunk)
        this.addPatch(patchForDir(patches.PATCH_CREATE, currentPath.join('/')))
      }

      current = current.contents[chunk]
    }

    return current
  }

  find(path) {
    let current = this.tree
    let chunks = path

    if (typeof path === 'string') {
      chunks = escapePath(path).split('/')
    }

    while (chunks.length) {
      const chunk = chunks.shift()

      if (current.type === DIRECTORY) {
        if (current.contents[chunk]) {
          current = current.contents[chunk]
          continue
        }
        return null
      }
      else {
        // current.type === FILE
        if (chunks.length === 0) {
          break
        }
        else {
          return null
        }
      }
    }

    return current
  }

  /**
   *
   * @param {string} path
   * @return {boolean}
   */
  hasFile(path) {
    const founded = this.find(path)

    if (founded && founded.type === FILE) return true
    return false
  }

  /**
   * @param {string} path
   * @return {boolean}
   */
  hasDir(path) {
    const founded = this.find(path)

    if (founded && founded.type === DIRECTORY) return true
    return false
  }

  print() {
    console.log(treeify.asTree(simplify(this.tree), 2))
  }

  appendToFile(filePath, content, createIfNotFound = false) {
    let file = this.find(filePath)

    if (!file) {
      if (createIfNotFound) {
        this.createFile(filePath, content)
        return true
      }
      else {
        return false
      }
    }

    file.content += content
    this.addPatch(patchForFile(patches.PATCH_APPEND, filePath, { content }))
    return true
  }

  deleteFile(path) {
    const chunks = escapePath(path).split('/')
    const filename = chunks.pop()

    const containDir = this.find(chunks)
    if (!containDir) return false

    const file = containDir.contents[filename]
    if (!file || file.type !== FILE) return false

    const newContents = {}
    Object.keys(containDir.contents).forEach(name => {
      if (name === filename) return
      newContents[name] = containDir.contents[name]
    })
    containDir.contents = newContents

    this.addPatch(patchForFile(patches.PATCH_DELETE, path, { file }))
    return file
  }

  deleteDir(path, deleteContents = false) {
    let chunks = escapePath(path).split('/')
    const dirname = chunks.pop()

    const parentDir = this.find(chunks)
    if (!parentDir) return false

    const dir = parentDir.contents[dirname]
    if (!dir || dir.type !== DIRECTORY) return false

    const childs = Object.keys(dir.contents)
    const hasContents = childs.length != 0
    if (!deleteContents && hasContents) {
      return false
    }

    if (deleteContents && hasContents) {
      childs.forEach(name => {
        const child = dir.contents[name]
        if (child.type === DIRECTORY) {
          this.deleteDir(chunks.concat(dirname, name).join('/'), deleteContents)
        }
        else {
          this.deleteFile(chunks.concat(dirname, name).join('/'))
        }
      })
    }

    const newContents = {}
    Object.keys(parentDir.contents).forEach(name => {
      if (name === dirname) return

      newContents[name] = parentDir.contents[name]
    })
    parentDir.contents = newContents

    this.addPatch(patchForDir(patches.PATCH_DELETE, path, { directory: dir }))
    return dir
  }

}
