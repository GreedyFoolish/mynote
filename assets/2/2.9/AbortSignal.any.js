// 创建一个手动的 AbortController
const manualController = new AbortController();

// 创建一个超时信号，超时时间为 5000 毫秒
const timeoutSignal = AbortSignal.timeout(5000);

// 使用 AbortSignal.any() 将手动信号和超时信号组合成一个联合信号
const combinedSignal = AbortSignal.any([manualController.signal, timeoutSignal]);

// 执行 fetch 请求
fetch("https://api.example.com/data", {signal: combinedSignal}).then(response => {
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

// 手动取消请求（如果需要）
setTimeout(() => {
    manualController.abort();
    console.log("手动取消请求");
}, 3000);
