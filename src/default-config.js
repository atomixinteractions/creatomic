
/**
 * Default config for Generator
 * @typedef {Object} GeneratorConfig
 */
const defaultConfig = {
  naming: {
    root: 'app',
    components: 'components',
    atoms: 'atoms',
    molecules: 'molecules',
    organisms: 'organisms',
    templates: 'templates',
    pages: 'pages',
    modules: 'modules',
  },
  fileExtensions: 'js', // default extension for all types
  fileNamingCase: 'kebab-case', // UpperCamelCase, lowerCamelCase, snake_case
  templates: { // specified templates for each type
    component: './templates/component.js'
    // if template file return string — should be .replace()
    // if return function, execute function with params
  },
  indexFile: { // if true, generate index.js for each type
    components: false, // export all from atoms, molecules, organisms ...
    atoms: true,
    molecules: true,
    organisms: true,
    templates: false,
    pages: false,
    modules: false, // modules inherits config for atoms, molecules, ...
  },
}

export default defaultConfig
