
const VirtualFS = require('../lib/virtualFs').default

const fs = new VirtualFS()

fs.recursiveCreateDirs('components/atoms')
fs.recursiveCreateDirs('components/molecules')
fs.recursiveCreateDirs('components/organisms')
fs.recursiveCreateDirs('components/templates')
fs.recursiveCreateDirs('components/pages')

// create atom
fs.createFile('components/atoms/Example.js', '// template for atom')

fs.createFile('components/modules/index.js')

fs.print()

console.log('')
fs.patches.forEach(p => console.log(p.action, p.type, p.path, p.changes))
