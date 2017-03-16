#!/usr/bin/env node

const Package = require('../package.json')
const caporal = require('caporal')

const createComponentCommand = type => caporal
  .command(`new ${type}`, 'Create new ' + type)
  .argument('<name>', `Name of your ${type} CamelCased, can have / to set module name`)
  .action((args, options, logger) => {
    console.log(`NEW ${type.toUpperCase()}`, args, options)
  })

caporal
  .version(Package.version)
  .description('Generate your Atomic components for React')

caporal
  .command('init', 'Generate base atomic structure for your project')
  .action((args, options) => {
    console.log('INIT', args, options)
  })

;['atom', 'molecule', 'organism', 'template', 'page'].forEach(createComponentCommand)

caporal
  .command('new module', 'Generate module structure')
  .argument('<name>', 'CamelCased name of new module')
  .action((args, options) => {
    console.log('NEW MODULE', args, options)
  })

caporal.parse(process.argv)
