# Scripts Manager

[![Version for VS Code Extension](https://vsmarketplacebadge.apphb.com/version-short/saber2pr.scripts-manager.svg?logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=saber2pr.scripts-manager) [![Installs](https://vsmarketplacebadge.apphb.com/installs/saber2pr.scripts-manager.svg)](https://marketplace.visualstudio.com/items?itemName=saber2pr.scripts-manager) [![Rating](https://vsmarketplacebadge.apphb.com/rating/saber2pr.scripts-manager.svg)](https://marketplace.visualstudio.com/items?itemName=saber2pr.scripts-manager)

manage scripts by vscode extension.

## Usage

- Create and Edit `*.scripts` file.

script args format:

javascript/typescript:

```js
// args:[name]
// args:[name,type{dev|prod},force?]

console.log(process.argv.slice(2))
```

shell:

```sh
# args:[name]
# args:[name,type{dev|prod},force?]

echo $@
```

## More

1. Feedback and opensource on github [vsc-scripts-manager](https://github.com/Saber2pr/vsc-scripts-manager)
