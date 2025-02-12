/**
 * 拆分笔记功能
 * 读取指定文件内容，根据章节（二级标题）对内容进行拆分并写入到指定文件中
 * 使用方式：打开终端，执行 node splitContent.js 即可
 */
const fs = require("fs");
const path = require("path");

// 读取文件路径
const inputFilePath = path.join(__dirname, "README.md");
// 拆分文件目录
const outputDirPath = path.join(__dirname, "");

// 确保输出目录存在
if (!fs.existsSync(outputDirPath)) {
    fs.mkdirSync(outputDirPath, {recursive: true});
}

// 读取文件内容
const content = fs.readFileSync(inputFilePath, "utf-8");

// 按一级标题分割内容
const sections = content.split(/(?=\n## )/).slice(1);

// 遍历每个章节并保存到单独的文件
sections.forEach((section, index) => {
    // 获取标题作为文件名
    const titleMatch = section.match(/## (.+)/u);
    const fileName = titleMatch[1];
    const outputFilePath = path.join(outputDirPath, `${fileName}.md`);
    // 使用正则表达式匹配所有标题，并将它们提升一级
    const updatedContent = section.replace(/^(#{1,8})\s+/gm, (match, hashes) => {
        // 去掉一个 "#"，但确保至少保留一个 "#"
        return "#".repeat(Math.max(1, hashes.length - 1)) + " ";
    }).trim();
    // 保存章节内容到文件
    fs.writeFileSync(outputFilePath, updatedContent, "utf-8");
});
