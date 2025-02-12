/**
 * 生成笔记目录
 * 使用方式：打开终端，执行 node generate-toc.js 即可
 */
const fs = require("fs");
const path = require("path");

// 读取Markdown文件
function readMarkdownFile(filePath) {
    return fs.readFileSync(filePath, "utf-8");
}

// 解析Markdown标题
function parseMarkdownHeaders(markdownContent) {
    const headers = [];
    const headerRegex = /^(#{1,6})\s+(.*)/gm;

    let match;
    while ((match = headerRegex.exec(markdownContent)) !== null) {
        const level = match[1].length; // 标题级别（# 的数量）
        const text = match[2].trim(); // 标题文本
        const anchor = text.toLowerCase().replace(/[^a-z0-9]+/g, "-"); // 生成锚点链接
        headers.push({level, text, anchor});
    }

    return headers;
}

// 生成目录
function generateTableOfContents(headers) {
    return headers.map(header => {
        const indent = "#".repeat(header.level); // 根据标题级别生成缩进
        return `${indent} ${header.text}`;
    }).join("\n");
}

// 主函数
function generateMarkdownTableOfContents(filePath) {
    const markdownContent = readMarkdownFile(filePath);
    const headers = parseMarkdownHeaders(markdownContent);
    const toc = generateTableOfContents(headers);

    // console.log("生成的目录：");
    // console.log(toc);

    // 要写入的文件路径
    const writePath = path.join(__dirname, "toc.md");

    try {
        // 同步覆盖文件内容
        fs.writeFileSync(writePath, toc);
        console.log("文件内容已成功覆盖！");
    } catch (err) {
        console.error("写入文件时发生错误：", err);
    }
}

// 示例：读取当前目录下的 README.md 文件
const filePath = path.join(__dirname, "README.md");
generateMarkdownTableOfContents(filePath);
