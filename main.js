import { createRequire } from "module";
import chalk from "chalk";
import inquirer from "inquirer";

console.log(
  `${chalk.blue("hello")}, ${chalk.red("this")} ${chalk.underline(
    "is"
  )} ${chalk.bgRed("chalk")}!`
);

const require = createRequire(import.meta.url);

const ejs = require("ejs");

const str = `
<div>
<% if (user) { %>
  <span><%= user.name %></span>
<% } else { %>
  <span>登录</span>
<% } %>
</div>
`;

// 编译模板
let template = ejs.compile(str, {});

// 渲染模板，根据用户状态渲染不同的视图。
const data = { user: null }; // { user: { name: 'zhangsan' } }
console.log(template(data));

//获取PackgeJson文件信息
let { program } = require("commander");

// const { program } = require("commander");

program
  .name("cli")
  .description("这是一个神奇的脚手架")
  .version("0.0.1")
  .usage("<command> [options]");

program
  .command("createPage")
  .description("生成一个页面") // 命令描述
  .argument("<name>", "文件名字") // <name> 表 name 为必填
  .action((name) => {
    // 输入该命令的动作，逻辑实现。
    console.log(`新建了一个文件：${name}`);
  });

program.parse(); // 解析
