
// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": preferDefault(require("/Users/nathanielfostan/work/fostanxyz/.cache/dev-404-page.js")),
  "component---src-pages-404-js": preferDefault(require("/Users/nathanielfostan/work/fostanxyz/src/pages/404.js")),
  "component---src-pages-index-js": preferDefault(require("/Users/nathanielfostan/work/fostanxyz/src/pages/index.js")),
  "component---src-templates-using-dsg-js": preferDefault(require("/Users/nathanielfostan/work/fostanxyz/src/templates/using-dsg.js"))
}

