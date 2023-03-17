import { createRequire } from "module";
import Creator from "./Creator.js";

const require = createRequire(import.meta.url);
const path = require('path')

export default async (projectName) => {
  // 命令运行时的目录
  const cwd = process.cwd()
  // 目录拼接项目名
  const targetDir = path.resolve(cwd, projectName || '.')
  const creator = new Creator(projectName,targetDir)
  creator.onReady((_creator) => _creator.create() )
}