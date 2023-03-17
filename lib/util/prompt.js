// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

export async function getPromptModules() {
  return await Promise.all(
  ["babel", "router"].map(async (file) => {
    const module = await import(`../promptModules/${file}.js`);
    console.log(module)
    return module
  }))
}
