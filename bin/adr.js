#!/usr/bin/env node

const caporal = require('caporal')
const Package = require('../package.json')
const { AtomicGenerator } = require('../dist/atomic-generator')


caporal
  .version(Package.version)
  .description('Generate your Atomic components for React')
  // .option('--dummy', 'Only show what will br changed. Do not change file system.')

caporal
  .command('init', 'Generate base atomic structure for your project')
  .option('--ext <ext>', 'Default file extensions', /\w{2,}/, 'js')
  .option('--case <case>', 'File naming case.', /^UpperCamelCase|lowerCamelCase|kebab-case|snake_case$/, 'UpperCamelCase')
  .option('--root <name', 'Name of the root directory. Ex.: src, app', /\w{3,}/, 'app')
  .option('--index', 'Generate index file. Default: true', null, true)
  .action((args, options) => {
    const config = {
      fileNamingCase: options.case,
      fileExtensions: options.ext,
      naming: { root: options.root },
    }
    if (options.index === false) {
      config.indexFile = false
    }
    AtomicGenerator.init(config)
  })

const typesAvailable = ['atom', 'molecule', 'organism', 'template', 'page']

caporal
  .command('module', 'Generate module structure')
  .argument('<name>', 'CamelCased name of new module')
  .action((args, options) => {
    console.log('NEW MODULE', args, options)
  })

typesAvailable.forEach(type => {
  caporal
    .command(type, 'Generate new ' + type + ' component')
    .argument('<ComponentName>', 'Name of the new component in UpperCamelCase')
    .action((args, options, logger) => {
      // console.log({ args, options })
      AtomicGenerator.create(type, args.componentName, {})
    })
})

caporal.parse(process.argv)
