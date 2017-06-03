const chalk = require('chalk')
const g = chalk.green.bold
const r = chalk.red.bold
const y = chalk.yellow.bold
const b = chalk.bold

const { VirtualFS } = require('../dist/virtual-fs')
const defaultConfig = require('../dist/default-config').default
const { FileSystemDiffer } = require('../dist/file-system-differ')

const fs = new VirtualFS(defaultConfig)

fs.enabledPatches = false
fs.touch('app/components/atoms/index.js')
fs.touch('app/components/molecules/index.js')
fs.touch('app/components/organisms/index.js')
fs.touch('app/components/templates/index.js')
fs.touch('app/components/pages/index.js')
// fs.touch('app/modules/index.js')
// fs.recursiveCreateDirs('app/modules/example/atoms')
// fs.recursiveCreateDirs('app/modules/example/molecules')
// fs.recursiveCreateDirs('app/modules/example/organisms')
// fs.recursiveCreateDirs('app/modules/example/templates')
// fs.recursiveCreateDirs('app/modules/example/pages')
// fs.touch('app/modules/example/organisms/index.js')
// fs.createFile('app/modules/example/index.js', '// Module content')
// fs.appendToFile('app/modules/index.js', `export example from './example'`)
fs.enabledPatches = true


// fs.createFile('app/components/atoms/Button.js',
// `import React from 'react

// export default function Button() {
//   return (
//     <div>Button atom</div>
//   )
// }
// `)

// fs.appendToFile('app/components/atoms/index.js', `export Button from './Button'`)

// fs.recursiveCreateDirs('app/components/atoms')
// fs.recursiveCreateDirs('app/components/molecules')
// fs.recursiveCreateDirs('app/components/organisms')
// fs.recursiveCreateDirs('app/components/templates')
// fs.recursiveCreateDirs('app/components/pages')

// fs.recursiveCreateDirs('foo/bar/baz')
// fs.recursiveCreateDirs('foo/bar/kaz')
// // fs.recursiveCreateDirs('foo/baz/kaf')
// fs.createFile('foo/baz/kaf/min.foo')

// // create atom
// fs.createFile('app/components/atoms/Example.js', '// template for atom')
// fs.createFile('app/modules/index.js')

// fs.appendToFile('app/components/atoms/Example.js', '\n// Appended content')
// fs.appendToFile('app/modules/example/atoms/FooBar.js', '#!/usr/bin/env node', true)

// fs.deleteFile('foo/baz/kaf/min.foo')
// fs.deleteDir('foo', true)

// fs.createFile('app/modules/example/organisms/Box/Box.js',
// `import React, { PropTypes, Component } from 'react'
// import css from './Box.css'

// export default class Box extends Component {
//   render() {
//     return (
//       <div className={css.Box}>
//         Box organism content
//       </div>
//     )
//   }
// }
// `)
// fs.createFile('app/modules/example/organisms/Box/Box.css',
// `
// .Box {
//   display: flex;
// }
// `)
// fs.createFile('app/modules/example/organisms/Box/Box.md',
// `
// # Box

// # Usage
// `)
// fs.createFile('app/modules/example/organisms/Box/index.js', `export default from './Box`)
// fs.appendToFile('app/modules/example/organisms/index.js', `export Box from './Box`)


console.log()
console.log(chalk.green('Structure will be created:'))
console.log('[project root]')
fs.print()

// console.log('')
// fs.patches.forEach(p => console.log(y(p.action), b(p.type), g('/' + p.path), p.changes))

// console.log('')
// console.log(
//   'hasFile "components/modules/index.js"',
//   String(fs.hasFile('app/components/modules/index.js'))
// )

// console.log('')
// console.log(
//   'hasDir "components/atoms"',
//   String(fs.hasDir('app/components/atoms'))
// )


// console.log('')
// console.log('content of "components/atoms/Example.js"',
//   fs.find('app/components/atoms/Example.js')
// )

// console.log('')
// console.log('content of "modules/example/atoms/FooBar.js"',
//   fs.find('app/modules/example/atoms/FooBar.js')
// )

const differ = new FileSystemDiffer(fs)

// console.log('')
console.log(differ.getDiff())

console.log('\n\n')
