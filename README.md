# Atomic Design for React

## Readme

__Project now in development! Do not use it your projects__

http://bradfrost.com/blog/post/atomic-web-design/

http://atomicdesign.bradfrost.com


## Usage

### CLI interface

```bash
npm install --global adr

# Create base dir structure
# /.atomic.js
# /app/components/atoms/index.js
# /app/components/molecules/index.js
# /app/components/organisms/index.js
# /app/components/templates/index.js
# /app/components/pages/index.js
adr init
# CWD='' adr init  # can be used to change working dir

# Create simple atom <Button />
# /app/components/atoms/Button/Button.js
# /app/components/atoms/Button/Button.spec.js
# Append `export Button from './Button/Button'` to /app/components/atoms/index.js
adr atom Button

# Create molecule in /app/components/molecules
adr molecule DropDown

adr organism Calendar
adr template GenericTemplate
adr page AboutPage


# Create simple module
# /app/modules/user/index.js
# /app/modules/user/components/atoms/index.js
# /app/modules/user/components/molecules/index.js
# /app/modules/user/components/organisms/index.js
# /app/modules/user/components/templates/index.js
# /app/modules/user/components/pages/index.js
adr module User

# Create atom in module
# /app/modules/user/components/atoms/Status/Status.js
# /app/modules/user/components/atoms/Status/Status.spec.js
adr atom User/Status
```

### Configuration

File **/.atomic.js**:

```js
module.exports = {
  rootDirectory: 'app',
  naming: {
    components: 'components',
    atoms: 'atoms',
    modules: 'modules',
  },
  generateSpecs: true,            // create /app/components/[type]/Name/Name.spec.js
  generateReadme: true,           // create /app/components/[type]/Name/Name.md
  generator: {
    modules: 'es6', // 'commonjs', 'commonjs.default'
    reexportTemplate: ({ type, name, config }) => `export NAME from '${config.naming.components}/${config.naming[type]}/NAME/NAME'`,
    exportDefaultTemplate: ({ type, name }) => `export default ${name}`,
    importDependencyTemplate: ({ local, modulePath }) => `import ${} from '${modulePath}'`
  },
}
```
