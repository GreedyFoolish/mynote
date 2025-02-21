// 创建全局 AbortController 实例
let controller = new AbortController();
const {signal} = controller;

// 监听网络状态变化
function handleNetworkChange(event) {
    if (event.type === "offline") {
        // 用户切换网络状态时取消正在进行的请求
        console.log("Offline: Cancelling all pending requests.");
        controller.abort(); // 取消所有请求
    } else if (event.type === "online") {
        console.log("Back online: Resuming requests.");
        controller = new AbortController(); // 重新初始化
    }
}

window.addEventListener("online", handleNetworkChange);
window.addEventListener("offline", handleNetworkChange);

/**
 * 封装 fetch 请求方法
 * @param url 请求路径
 * @param options 请求配置
 * @param maxRetries 最大重试次数
 * @param retryDelay 重试间隔时间
 * @returns {Promise<any|undefined>}
 */
export function fetchWithAbort(url, options = {}, maxRetries = 3, retryDelay = 1000) {
    // 请求失败时重试
    const fetchData = async (retryCount = 0) => {
        try {
            const response = await fetch(url, {...options, signal});
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        } catch (error) {
            if (error.name === "AbortError") {
                console.log("Fetch aborted:", url);
                throw error; // 如果是用户主动取消，直接抛出错误
            }
            // 检查是否达到最大重试次数
            if (retryCount >= maxRetries) {
                console.error("Fetch failed after retries:", url, error);
                throw error; // 达到最大重试次数后抛出错误
            }
            // 等待重试间隔后再次尝试
            console.log(`Fetch failed, retrying in ${retryDelay}ms... (${retryCount + 1}/${maxRetries})`);
            await new Promise((resolve) => setTimeout(resolve, retryDelay));
            return fetchData(retryCount + 1); // 递归调用，重试
        }
    };

    return fetchData();
}
