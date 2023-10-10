# rename-source-map

rename  sourceMap

## how to use?

vueCli

```javascript
const webpackRenamePlugin=require('rename-source-map')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: true,
 
  configureWebpack: {
    //name: string 
    plugins: [new webpackRenamePlugin('_rename_')],
  },
})
```

webpack config

```javascript

const webpack = require('webpack');
const webpackRenamePlugin=require('rename-source-map')

// 在配置中添加插件
module.exports = {
  // todo
  plugins: [
    //name: string 
    new webpackRenamePlugin('_rename_'),
  ],
};
```

