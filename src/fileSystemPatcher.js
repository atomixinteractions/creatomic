import chalk from 'chalk'
import {
  ROOT,
  FILE,
  DIRECTORY,
  patches,
} from './helpers'

const dim = chalk.dim

const c_new = chalk.green
const c_changed = chalk.yellow
const c_drop = chalk.red
const c_move = chalk.blue

const TYPES = {
  [FILE]:       'F ',
  [DIRECTORY]:  'D ',
  [ROOT]:       'R ',
}

const ACTIONS = {
  [patches.PATCH_APPEND]:           'APPEND  ',
  [patches.PATCH_CREATE]:           'CREATE  ',
  [patches.PATCH_DELETE]:           'DELETE  ',
  [patches.PATCH_MOVE]:             'MOVE    ',
  [patches.PATCH_REPLACE_CONTENT]:  'REPLACE ',
}

const spacer = '            '



export default class FileSystemPatcher {
  constructor(fileSystem) {
    this.patches = fileSystem.patches
  }


  getDiff() {
    return this.patches.map(({ type, action, path, changes }) => {
      let string = []
      const label = ACTIONS[action] + ' ' + TYPES[type]

      switch (action) {
        case patches.PATCH_CREATE:
          string.push(
            c_new.inverse(' + ' + label),
            c_new(path)
          )
          if (type === FILE && changes.content && changes.content.length) {
            string.push('\n' + changes.content.split('\n').map(line => ' + ' + spacer + line).join('\n'))
          }
          break

        case patches.PATCH_REPLACE_CONTENT:
          string.push(
            c_changed.inverse(' * ' + label),
            c_changed(path)
          )
          break

        case patches.PATCH_APPEND:
          string.push(
            c_changed.inverse(' + ' + label),
            c_changed(path),
            '\n' + changes.content.split('\n').map(line => ' + ' + spacer + line).join('\n')
          )
          break

        case patches.PATCH_MOVE:
          string.push(
            c_move.inverse(' > ' + label),
            c_move(path),
            '->',
            c_move(path),
          )
          break

        case patches.PATCH_DELETE:
          string.push(
            c_drop.inverse(' - ' + label),
            c_drop(path)
          )
          break
      }

      return string.join(' ')
    }).join('\n')
  }
}
