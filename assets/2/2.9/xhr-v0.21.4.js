"use strict";

var utils = require("./../utils");
var settle = require("./../core/settle");
var cookies = require("./../helpers/cookies");
var buildURL = require("./../helpers/buildURL");
var buildFullPath = require("../core/buildFullPath");
var parseHeaders = require("./../helpers/parseHeaders");
var isURLSameOrigin = require("./../helpers/isURLSameOrigin");
var createError = require("../core/createError");

module.exports = function xhrAdapter(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;
        var responseType = config.responseType;

        if (utils.isFormData(requestData)) {
            delete requestHeaders["Content-Type"]; // Let the browser set it
        }

        var request = new XMLHttpRequest();

        // HTTP 基本身份验证
        if (config.auth) {
            var username = config.auth.username || "";
            var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
            requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
        }

        var fullPath = buildFullPath(config.baseURL, config.url);

        request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

        // 设置请求超时
        request.timeout = config.timeout;

        function onloadend() {
            if (!request) {
                return;
            }
            // 获取响应头信息（如果支持 getAllResponseHeaders 方法），解析为对象形式
            var responseHeaders = "getAllResponseHeaders" in
            request ? parseHeaders(request.getAllResponseHeaders()) : null;
            // 根据 responseType 获取响应数据，可以是文本或 JSON 数据，也可以是其他类型的数据
            var responseData = !responseType || responseType === "text" || responseType === "json" ?
                request.responseText : request.response;
            // 构建一个包含响应数据、状态码、状态文本、响应头、配置和请求对象的 response 对象
            var response = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config: config,
                request: request
            };
            // 使用 settle 函数来决定是调用 resolve 还是 reject，这取决于请求的结果
            settle(resolve, reject, response);

            // 将 request 设置为 null，以释放资源
            request = null;
        }

        if ("onloadend" in request) {
            // 如果 onloadend 可用，则使用 onloadend
            request.onloadend = onloadend;
        } else {
            // 监听 ready 状态以模拟 onloadend
            request.onreadystatechange = function handleLoad() {
                if (!request || request.readyState !== 4) {
                    return;
                }
                // 当请求出错，我们没有收到响应，这将由 onerror 处理
                // 有一个例外情况：使用 file 协议请求，大多数浏览器会将状态返回为 0，即使这是一个成功的请求
                if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
                    return;
                }
                // onreadystatechange 事件会优先于 onerror 或 ontimeout 调用，因此 onloadend 应该在下一个事件循环中调用
                setTimeout(onloadend);
            };
        }

        // 处理浏览器请求取消（而不是手动取消）
        request.onabort = function handleAbort() {
            if (!request) {
                return;
            }
            reject(createError("Request aborted", config, "ECONNABORTED", request));
            // 将 request 设置为 null，以释放资源
            request = null;
        };

        // 处理网络错误
        request.onerror = function handleError() {
            // 真正的错误被浏览器隐藏了，只有当它是网络错误时，才应该触发 onerror
            reject(createError("Network Error", config, null, request));
            // 将 request 设置为 null，以释放资源
            request = null;
        };

        // 处理请求超时
        request.ontimeout = function handleTimeout() {
            var timeoutErrorMessage = "timeout of " + config.timeout + "ms exceeded";
            if (config.timeoutErrorMessage) {
                timeoutErrorMessage = config.timeoutErrorMessage;
            }
            reject(createError(
                timeoutErrorMessage,
                config,
                config.transitional && config.transitional.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED",
                request
            ));
            // 将 request 设置为 null，以释放资源
            request = null;
        };

        // 添加 xsrf 标头。只有在标准浏览器环境中运行时，才会执行此操作。
        // 在 Web Worker 或 react-native 环境中不会执行此操作
        if (utils.isStandardBrowserEnv()) {
            // 添加 xsrf 标头
            var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
                cookies.read(config.xsrfCookieName) :
                undefined;

            if (xsrfValue) {
                requestHeaders[config.xsrfHeaderName] = xsrfValue;
            }
        }

        // 添加请求标头
        if ("setRequestHeader" in request) {
            utils.forEach(requestHeaders, function setRequestHeader(val, key) {
                if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
                    // 如果未定义数据，则删除 Content-Type
                    delete requestHeaders[key];
                } else {
                    // 其余请求添加请求标头
                    request.setRequestHeader(key, val);
                }
            });
        }

        // 根据需要，设置请求 withCredentials 配置
        if (!utils.isUndefined(config.withCredentials)) {
            request.withCredentials = !!config.withCredentials;
        }

        // 根据需要，设置请求 responseType 配置
        if (responseType && responseType !== "json") {
            request.responseType = config.responseType;
        }

        // 根据需要，设置请求 progress 配置
        if (typeof config.onDownloadProgress === "function") {
            request.addEventListener("progress", config.onDownloadProgress);
        }

        // 并非所有浏览器都支持 upload 事件
        if (typeof config.onUploadProgress === "function" && request.upload) {
            request.upload.addEventListener("progress", config.onUploadProgress);
        }

        // 使用 CancelToken 处理请求取消
        if (config.cancelToken) {
            // 请求取消方法
            config.cancelToken.promise.then(function onCanceled(cancel) {
                if (!request) {
                    return;
                }

                request.abort();
                reject(cancel);
                // 将 request 设置为 null，以释放资源
                request = null;
            });
        }

        if (!requestData) {
            requestData = null;
        }

        // 发送请求
        request.send(requestData);
    });
};
