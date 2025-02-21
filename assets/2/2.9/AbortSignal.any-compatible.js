// 如果 AbortSignal.any() 不可用，可以通过以下方式手动实现类似功能
const manualController = new AbortController();
const timeoutController = new AbortController();

// 超时逻辑
setTimeout(() => {
    timeoutController.abort();
}, 5000);

// 创建一个主控制器
const mainController = new AbortController();

// 监听手动取消信号
manualController.signal.addEventListener("abort", () => {
    mainController.abort();
});

// 监听超时信号
timeoutController.signal.addEventListener("abort", () => {
    mainController.abort();
});

// 使用主控制器的信号
fetch("https://api.example.com/data", {signal: mainController.signal}).then(response => {
    response.json()
}).then(data => {
    console.log("请求成功:", data)
}).catch(error => {
    if (error.name === "AbortError") {
        console.error("请求被取消或超时:", error.message);
    } else {
        console.error("请求失败:", error.message);
    }
});

// 手动取消请求
setTimeout(() => {
    manualController.abort();
    console.log("手动取消请求");
}, 3000);
