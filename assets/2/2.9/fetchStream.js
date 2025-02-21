// 创建 AbortController 实例
const controller = new AbortController();
const signal = controller.signal;

// 发起 Fetch 请求
const fetchStream = async () => {
    try {
        const response = await fetch("https://example.com/streaming-data", {signal});
        const reader = response.body.getReader();

        while (true) {
            const {done, value} = await reader.read();
            if (done) break;
            // 处理流数据
            console.log(new TextDecoder().decode(value));
        }
    } catch (error) {
        if (error.name === "AbortError") {
            console.log("Fetch 请求已被取消");
        } else {
            console.error("发生错误:", error);
        }
    }
};

// 启动流处理
fetchStream();

// 在某个时刻取消请求
setTimeout(() => {
    controller.abort();
    console.log("取消操作已触发");
}, 5000); // 假设 5 秒后取消请求
