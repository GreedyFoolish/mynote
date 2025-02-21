/**
 * 全局请求管理器
 */
class GlobalRequestManager {
    constructor() {
        this.controllers = new Map();
    }

    // 注册低优先级请求
    registerLowPriorityRequest(controller) {
        this.controllers.set(controller, true);
    }

    // 取消所有低优先级请求
    cancelLowPriorityRequests() {
        for (const [controller] of this.controllers) {
            controller.abort();
        }
        this.controllers.clear();
    }
}

const requestManager = new GlobalRequestManager();
export default requestManager;
