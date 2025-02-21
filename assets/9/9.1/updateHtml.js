import fs from "fs";

// 打包后的 HTML 文件路径
const htmlPath = "./dist/index.html";
const prefix = "/ofd/business"; // 替换为你的前缀

// 读取 HTML 文件内容
const htmlText = fs.readFileSync(htmlPath, "utf8");

// 定义正则表达式，匹配 id 为 vite-legacy-polyfill 或 vite-legacy-entry 的 script 标签
const regex = /<script[^>]+id=[""](?:vite-legacy-polyfill|vite-legacy-entry)[""][^>]*>/g;

// 替换匹配到的 script 标签的 src 和 data-src 属性
const updatedHtml = htmlText.replace(regex, (match) => {
    // 匹配并替换 data-src 属性
    const dataSrcMatch = match.match(/data-src=[""]([^""]+)[""]/);
    if (dataSrcMatch) {
        match = match.replace(dataSrcMatch[1], `${prefix}/${dataSrcMatch[1]}`);
    } else {
        // 匹配并替换 src 属性
        const srcMatch = match.match(/src=[""]([^""]+)[""]/);
        if (srcMatch) {
            match = match.replace(srcMatch[1], `${prefix}/${srcMatch[1]}`);
        }
    }
    return match;
});

// 将修改后的内容写回 HTML 文件
fs.writeFileSync(htmlPath, updatedHtml, "utf8");

console.log("HTML 文件已更新");
