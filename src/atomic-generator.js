import fs from 'fs'
import { resolve } from 'path'
import merge from 'deepmerge'
import { VirtualFS } from './virtual-fs'
import defaultConfig from './default-config'

export class AtomicGenerator {

  static init(config) {
    const instance = new AtomicGenerator(config)
    if (instance.hasConfig()) {
      instance.loadConfig()
    }
    else {
      instance.createConfig()
    }
  }

  static create(type, name, options) {
    console.log('CREATE', type, name, options)
  }

  constructor(config) {
    this.config = merge(defaultConfig, config)
    this.cwd = process.env.CWD || process.cwd()
    this.vfs = new VirtualFS(this.config)
  }

  hasConfig() {
    const dirStats = fs.statSync(resolve(this.cwd, '.atomic'))
    if (dirStats.isDirectory() && fs.existsSync(resolve(this.cwd, '.atomic', 'config.json'))) {
      return true
    }

    return false
  }

  createConfig() {
    const configContent = JSON.stringify(this.config, 2, 2)
    this.vfs.createFile('.atomic/config.json', configContent)
  }

  loadConfig() {
    const content = fs.readFileSync(resolve(this.cwd, '.atomic', 'config.json'))
    const json = JSON.parse(content)
    this.config = merge(this.config, json)
  }
}
