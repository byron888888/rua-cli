#!/usr/bin/env node
import { createRequire } from "module";
import chalk from "chalk";
import create from "../lib/create.js";
// chalk 和 inquirer是esm

// import inquirer from "inquirer";
const require = createRequire(import.meta.url);

const program = require("commander");


program
  .version(`rua-cli ${require("../package").version}`)
  .usage("<command> [options]");

program
  .command("create <app-name>")
  .description("创建项目")
  .action((name, options) => {
    console.log(chalk.bold.blue(`RUA CLI V1.0.0`));
    create(name, options);
  });

program.on("--help", () => {
  console.log();
  console.log(
    `  Run ${chalk.yellow(
      `rua-cli <command> --help`
    )} for detailed usage of given command.`
  );
  console.log();
});

program.parse(process.argv);
