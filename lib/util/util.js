import { createRequire } from "module";
const require = createRequire(import.meta.url);

const fs = require('fs-extra')
const path = require('path')

export function writeFileTree (dir, files) {
  Object.keys(files).forEach((name) => {
    const filePath = path.join(dir, name)
    fs.ensureDirSync(path.dirname(filePath))
    fs.writeFileSync(filePath, files[name])
  })
}

