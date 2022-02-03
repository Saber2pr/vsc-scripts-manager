# Scripts Manager

<img height="64px" src="https://cdn.jsdelivr.net/gh/saber2pr/MyWeb@master/resource/image/vsc-scripts-manager.png" />

---

[![Version for VS Code Extension](https://vsmarketplacebadge.apphb.com/version-short/saber2pr.scripts-manager.svg?logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=saber2pr.scripts-manager) [![Installs](https://vsmarketplacebadge.apphb.com/installs/saber2pr.scripts-manager.svg)](https://marketplace.visualstudio.com/items?itemName=saber2pr.scripts-manager) [![Rating](https://vsmarketplacebadge.apphb.com/rating/saber2pr.scripts-manager.svg)](https://marketplace.visualstudio.com/items?itemName=saber2pr.scripts-manager)

manage scripts by vscode extension.

## Overview

1. click statusBar at bottom left:

![](https://cdn.jsdelivr.net/gh/saber2pr/MyWeb@master/resource/image/vsc-scriptlist-bar.webp)

2. create script item with cli command:

![](https://cdn.jsdelivr.net/gh/saber2pr/MyWeb@master/resource/image/vsc-scriptlist-add.webp)

3. run script:

![](https://cdn.jsdelivr.net/gh/saber2pr/MyWeb@master/resource/image/vsc-scriptlist-run.webp)

## Usage

for create script with a file:

- Create and Edit `*.scripts` file.

- Default scripts `~/.scriptslistrc`, Click the `Scripts` StatusBar at bottom left.

for file script, here is format for args:

> generate the parameter form using the special comment

javascript/typescript:

```js
// args:[name,type{dev|prod},force?]

console.log(process.argv.slice(2))
```

the parameter form like this:

![](https://cdn.jsdelivr.net/gh/saber2pr/MyWeb@master/resource/image/vsc-scriptlist-form.webp)

for shell:

```sh
# args:[name,type{dev|prod},force?]

echo $@
```

## More

1. Feedback and opensource on github [vsc-scripts-manager](https://github.com/Saber2pr/vsc-scripts-manager)
