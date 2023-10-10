const fs = require('fs')
class webpackRenamePlugin {
  constructor(options) {
    this.options = options||''
  }
  apply(compiler) {
    compiler.hooks.done.tapAsync('webpackRenamePlugin', (compilation, next) => {
      const dirpath = compilation.compilation.compiler.options.context
      const filterMap = /\.(map)$/
      const outpath=compilation.compilation.compiler.options.output.path;
      if(compilation.compilation.compiler._assetEmittingPreviousFiles){
          Array.from(compilation.compilation.compiler._assetEmittingPreviousFiles).map((it) => {
            if (filterMap.test(it)) {
              let newPath = it.split('.js.map')[0] + `${this.options}.js.map`
              fs.rename(it, newPath, (error) => {})
            }
          })
      }else{
        const readFileList = (ipath) => {
          const files = fs.readdirSync(ipath)
          files.forEach((itm, index) => {
            const stat = fs.statSync(ipath + itm)
            if (stat.isDirectory()) {
              readFileList(`${ipath + itm}/`)
            } else {
              if (filterMap.test(itm)) {
                const newPath = `${itm.split('.js.map')[0]}${this.options}.js.map`
                fs.rename(`${ipath + itm}`, `${ipath + newPath}`, (error) => {
                  // console.log(error)
                })
              }
            }
          })
        }
        if(outpath){
          readFileList(outpath+'/')
        }else{
          console.error('修改source-map 失败！请联系开发人员')
        }
      }
      next()
    })
  }
}

module.exports = webpackRenamePlugin
