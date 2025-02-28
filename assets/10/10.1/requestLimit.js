/**
 * @description: 基于队列控制并发请求数量
 * @param urlList 请求地址列表
 * @param totalRequests 请求数量
 * @param maxConcurrency 请求并发数量
 * @returns {Promise<*[]>} 请求响应结果集合
 */
export const fetchWithConcurrency = async function (urlList, maxConcurrency = 6, totalRequests = urlList.length ?? 0) {
    const results = [];
    // 活跃请求数量
    let activeRequests = 0;
    // 当前请求索引
    let currentIndex = 0;

    if (urlList?.length === 0) {
        return results;
    }

    // 处理单个请求任务
    async function fetchTask() {
        if (currentIndex >= totalRequests) {
            return;
        }
        // 请求任务索引
        const taskIndex = currentIndex++;
        activeRequests++;

        try {
            if (urlList[taskIndex]) {
                const response = await fetch(urlList[taskIndex]);
                const data = await response.json();
                results[taskIndex] = data;
            }
        } catch (error) {
            console.error("Request failed:", error);
            results[taskIndex] = null;
        } finally {
            activeRequests--;
            if (currentIndex < totalRequests) {
                // 递归调用未请求任务
                await fetchTask();
            }
        }
    }

    // 取出前置 maxConcurrency 个任务
    const initTasks = Array.from({length: maxConcurrency}, fetchTask);
    await Promise.all(initTasks);

    return results;
}
