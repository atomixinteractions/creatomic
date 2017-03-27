import treeify from 'treeify'
import defaultConfig from './defaultConfig'
import { dir, file, escapePath, simplify, ROOT, DIRECTORY, FILE, patches, patchForDir, patchForFile } from './helpers'


/**
 * @type {Object} GeneratorConfig
 */

export default class VirtualFS {
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


  constructor(config = {}) {
    this.config = Object.assign({}, defaultConfig, config)
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
  createFile(path, content) {
    const chunks = escapePath(path).split('/')
    const filename = chunks.pop()

    const dir = this.recursiveCreateDirs(chunks)

    dir.contents[filename] = file(filename, content)

    this.patches.push(patchForFile(patches.PATCH_CREATE, path, { content }))
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
        this.patches.push(patchForDir(patches.PATCH_CREATE, currentPath.join('/')))
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
      console.log('chunk:', chunk)
      console.log('  current:', current.name, '::', current.type)
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

}