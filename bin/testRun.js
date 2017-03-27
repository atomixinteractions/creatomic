const chalk = require('chalk')
const g = chalk.green.bold
const r = chalk.red.bold
const y = chalk.yellow.bold
const b = chalk.bold

const VirtualFS = require('../lib/virtualFs').default

const fs = new VirtualFS()

fs.recursiveCreateDirs('components/atoms')
fs.recursiveCreateDirs('components/molecules')
fs.recursiveCreateDirs('components/organisms')
fs.recursiveCreateDirs('components/templates')
fs.recursiveCreateDirs('components/pages')

fs.recursiveCreateDirs('foo/bar/baz')
fs.recursiveCreateDirs('foo/bar/kaz')
// fs.recursiveCreateDirs('foo/baz/kaf')
fs.createFile('foo/baz/kaf/min.foo')

// create atom
fs.createFile('components/atoms/Example.js', '// template for atom')
fs.createFile('modules/index.js')

fs.appendToFile('components/atoms/Example.js', '\n// Appended content')
fs.appendToFile('modules/example/atoms/FooBar.js', '#!/usr/bin/env node', true)

fs.deleteFile('foo/baz/kaf/min.foo')
fs.deleteDir('foo', true)

fs.print()

console.log('')
fs.patches.forEach(p => console.log(y(p.action), b(p.type), g('/' + p.path), p.changes))

console.log('')
console.log(
  'hasFile "components/modules/index.js"',
  String(fs.hasFile('components/modules/index.js'))
)

console.log('')
console.log(
  'hasDir "components/atoms"',
  String(fs.hasDir('components/atoms'))
)


console.log('')
console.log('content of "components/atoms/Example.js"',
  fs.find('components/atoms/Example.js')
)

console.log('')
console.log('content of "modules/example/atoms/FooBar.js"',
  fs.find('modules/example/atoms/FooBar.js')
)
