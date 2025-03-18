/**
 * 生成UUID
 * @returns {string} UUID
 */
const uuid = () => {
    let d = new Date().getTime();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
};

/**
 * 构造函数
 * @param config 配置项
 * @constructor
 */
const WSClientFn = function (config) {
    // 配置
    this.config = config;
    // 成功回调函数列表
    this.resolve = {};
    // 失败回调函数列表
    this.reject = {};
};

/**
 * WebSocket 客户端
 * @param options 初始化参数
 * @returns {WSClientFn}
 * @constructor
 */
export const WSClient = (options) => {
    // 默认配置
    const defaults = {
        // WebSocket 服务地址
        url: "ws://127.0.0.1:13426",
        // 连接成功事件
        onOpen: function () {
        },
        // 连接失败事件
        onClose: function () {
        }
    };

    // 合并配置
    const config = Object.assign({}, defaults, options);

    // 创建对象
    const WSClientIns = new WSClientFn(config);

    // 打开连接
    WSClientIns.connect();

    // 返回
    return WSClientIns;
}

/**
 * 打开连接
 */
WSClientFn.prototype.connect = function () {
    const _this = this;
    // 判断传参是否为空
    if (_this.config.url == null || _this.config.url === "") {
        console.error("WebSocket服务地址不能为空");
        return;
    }

    // 判断浏览器是否支持 WebSocket
    if (!("WebSocket" in window)) {
        alert("您的浏览器不支持 WebSocket 请使用其他浏览器进行尝试");
        return;
    }

    // 打开 WebSocket
    const ws = new WebSocket(_this.config.url);

    // 连接打开事件
    ws.onopen = function () {
        console.info("WebSocket服务：" + _this.config.url + " 已连接");
        _this.config.onOpen();
    };

    // 收到消息
    ws.onmessage = function (e) {
        const data = e?.data;
        if (data) {
            // 判断返回是否成功 | 调用成功回调函数
            if (data?.code === 0) {
                if (typeof _this.resolve[_this.messageId] === "function") {
                    _this.resolve[_this.messageId](data);
                } else {
                    console.error("未找到对应的回调函数")
                }
            } else {
                console.error(data?.message || "响应数据格式错误")
            }
        } else {
            console.error("响应数据格式错误")
        }
    };

    // 连接关闭事件
    ws.onclose = function (e) {
        _this.config.onClose(e);
    };

    // 连接错误：如果出现连接、处理、接收、发送数据失败的时候触发 onerror 事件
    ws.onerror = function (e) {
        console.error("WebSocket服务：" + _this.config.url + " 连接错误");
    };

    // 返回
    _this.obj = ws;
};

/**
 * 关闭连接
 */
WSClientFn.prototype.close = function () {
    this.obj.close();
};

/**
 * 发送消息
 * @param data 消息（JSON格式）
 */
WSClientFn.prototype.send = function (data) {
    // 判断传参是否为空
    if (data == null || data === "") {
        console.error("发送内容不能为空");
        return;
    }

    const messageId = uuid();

    this.messageId = messageId
    // 将成功回调函数存起来
    if (typeof (data.success) === "function") {
        this.resolve[messageId] = data?.success;
        data.messageId = messageId;
        delete data.success;
    }

    // 将失败回调函数存起来
    if (typeof (data.error) === "function") {
        this.reject[messageId] = data?.error;
        data.messageId = messageId;
        delete data.error;
    }

    // 发送消息
    this.obj.send(data?.msg);
};

/**
 * WebSocket客户端调用实例
 */
const curIns = {}
curIns.WSClient = WSClient({
    url: "ws://127.0.0.1:13426",
    onOpen: function () {
        curIns.WSClient.send({
            msg: "/execcmd?cmdbody=CMDDATA:133",
            success: (data) => {
                console.log(data)
            }
        })
    },
    onClose: function () {
        console.error("服务关闭");
    }
})
