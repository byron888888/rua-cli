import inquirer from "inquirer";
import { defaults } from "./util/preset.js";
import PromptModuleAPI from "./PromptModuleAPI.js";
import { getPromptModules } from "./util/prompt.js";

// const inquirer = require('inquirer')
// const { defaults } = require('./util/preset')

export default class Creator {
  constructor(name, context) {
    // 项目名称
    this.name = name;
    // 项目路径，含名称
    this.context = process.env.VUE_CLI_CONTEXT = context;
    // package.json 数据
    this.pkg = {};
    // 包管理工具
    this.pm = null;
    // 预设提示选项
    this.presetPrompt = this.resolvePresetPrompts();
    // 自定义特性提示选项（复选框）
    this.featurePrompt = this.resolveFeaturePrompts();
    // 保存相关提示选项
    this.outroPrompts = this.resolveOutroPrompts();
    // 其他提示选项
    this.injectedPrompts = [];

    const promptAPI = new PromptModuleAPI(this);
    const promptModules = getPromptModules();
    promptModules.forEach((m) => m(promptAPI));

    // 测试
    inquirer.prompt(this.resolveFinalPrompts()).then((res) => {
      console.log("选择的选项：");
      console.log(res);
    });
    // 预设提示选项
  }

  // 获得预设的选项
  resolvePresetPrompts() {
    const presetChoices = Object.entries(defaults.presets).map(
      ([name, preset]) => {
        return {
          name: `${name}(${Object.keys(preset.plugins).join(",")})`, // 将预设的插件放到提示
          value: name,
        };
      }
    );

    return {
      name: "preset", // preset 记录用户选择的选项值。
      type: "list", // list 表单选
      message: `Please pick a preset:`,
      choices: [
        ...presetChoices, // Vue2 默认配置，Vue3 默认配置
        {
          name: "Manually select features", // 手动选择配置，自定义特性配置
          value: "__manual__",
        },
      ],
    };
  }
  // 自定义特性复选框
  resolveFeaturePrompts() {
    return {
      name: "features", // features 记录用户选择的选项值。
      when: (answers) => answers.preset === "__manual__", // 当选择"Manually select features"时，该提示显示
      type: "checkbox",
      message: "Check the features needed for your project:",
      choices: [], // 复选框值，待补充
      pageSize: 10,
    };
  }
  // 保存相关提示选项
  resolveOutroPrompts() {
    const outroPrompts = [
      // useConfigFiles 是单选框提示选项。
      {
        name: "useConfigFiles",
        when: (answers) => answers.preset === "__manual__",
        type: "list",
        message: "Where do you prefer placing config for Babel, ESLint, etc.?",
        choices: [
          {
            name: "In dedicated config files",
            value: "files",
          },
          {
            name: "In package.json",
            value: "pkg",
          },
        ],
      },
      // 确认提示选项
      {
        name: "save",
        when: (answers) => answers.preset === "__manual__",
        type: "confirm",
        message: "Save this as a preset for future projects?",
        default: false,
      },
      // 输入提示选项
      {
        name: "saveName",
        when: (answers) => answers.save,
        type: "input",
        message: "Save preset as:",
      },
    ];
    return outroPrompts;
  }
  resolveFinalPrompts() {
    const prompts = [
      this.presetPrompt,
      this.featurePrompt,
      ...this.outroPrompts,
    ];
    console.log("prompts", prompts);
    return prompts;
  }
}