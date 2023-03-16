import { createRequire } from "module";
const require = createRequire(import.meta.url);

export function getPromptModules() {
  return [
    'babel',
    'router',
  ].map(file => require(`../promptModules/${file}.cjs`))
}