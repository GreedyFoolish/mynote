/**
 * 合并笔记功能
 * 读取当前目录下除指定排除文件路径列表以外的所有 .md 文件并将内容合并写入到指定文件中
 * 使用方式：打开终端，执行 node mergeContent.js 即可
 */
const fs = require("fs");
const path = require("path");

// 目录路径
const directoryPath = path.join(__dirname, "");
// 合并文件路径
const outputDirPath = path.join(__dirname, "README.md");
// 排除文件路径列表
const excludeFilePath = [
    "README.md",
    "toc.md",
];


// 读取目录中的所有文件
fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error("Error reading directory:", err);
        return;
    }

    // 过滤得到除指定文件（README.md）以外的所有 .md 文件
    const mdFiles = files.filter(file => {
        let pass = true
        excludeFilePath.forEach(filePath => {
            if (file === filePath) {
                pass = false
            }
        })
        return file.endsWith(".md") && pass
    }).map(file => {
        return path.join(directoryPath, file)
    }).sort((a, b) => {
        // 提取文件名
        const fileA = path.basename(a);
        const fileB = path.basename(b);
        // 提取文件名中的数字
        const numA = parseInt(fileA.match(/^(\d+)/)?.[1], 10);
        const numB = parseInt(fileB.match(/^(\d+)/)?.[1], 10);
        // 按数字升序排序
        return numA - numB;
    });

    // 读取所有 .md 文件的内容并合并
    let combinedContent = "";
    mdFiles.forEach((file) => {
        const content = fs.readFileSync(file, "utf-8");
        // 使用正则表达式匹配所有标题，并将它们降低一级
        const updatedContent = content.replace(/^(#{1,8})\s+/gm, (match, hashes) => {
            // 在现有 "#" 前面添加一个 "#"
            return "#".repeat(hashes.length + 1) + " ";
        }).trim();
        // 添加内容并用两个换行符分隔
        combinedContent += updatedContent + "\n\n";
    });

    // 将合并后的内容写入文件
    fs.writeFileSync(outputDirPath, combinedContent, "utf-8");
    console.log(`Updated file content with content from ${mdFiles.length} files.`);
});

