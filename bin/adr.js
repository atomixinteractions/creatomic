#!/usr/bin/env node

const Package = require('../package.json')
const caporal = require('caporal')


caporal
  .version(Package.version)
  .description('Generate your Atomic components for React')

caporal
  .command('init', 'Generate base atomic structure for your project')
  .action((args, options) => {
    console.log('INIT', args, options)
  })

const typesAvailable = ['atom', 'molecule', 'organism', 'template', 'page']

caporal
  .command(`new`, 'Create new component')
  .argument('<type>', 'One of: atom, molecule, organism, template, page', typesAvailable)
  .argument('<name>', `CamelCased name of your component, can have / to set module name`)
  .action((args, options, logger) => {
    console.log(`NEW`, args, options)
  })

caporal
  .command('new module', 'Generate module structure')
  .argument('<name>', 'CamelCased name of new module')
  .action((args, options) => {
    console.log('NEW MODULE', args, options)
  })

caporal.parse(process.argv)
