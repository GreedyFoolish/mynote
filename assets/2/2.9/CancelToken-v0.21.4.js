"use strict";

var Cancel = require("./Cancel-v0.21.4");

/**
 * 定义 CancelToken 构造函数，接受一个执行器函数 executor 作为参数。
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
    // 构造函数（CancelToken）接受一个执行器函数作为参数，确保其为函数类型。
    if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
    }

    //  resolvePromise 用于稍后解析内部的 Promise。
    var resolvePromise;

    // 创建一个内部的 Promise，当取消请求发生时，该 Promise 将被解析。
    // resolvePromise 被赋值为 resolve 函数，以便稍后可以调用它来解析 Promise。
    this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
    });

    // v0.22.0才新增了这段代码，用_listeners记录回调函数
    // this.promise.then(function (cancel) {
    //     if (!token._listeners) return;
    //
    //     var i;
    //     var l = token._listeners.length;
    //
    //     for (i = 0; i < l; i++) {
    //         token._listeners[i](cancel);
    //     }
    //     token._listeners = null;
    // });

    // 将当前实例保存到变量 token 中，以确保在闭包中可以正确引用 this。
    var token = this;
    // 调用传入的 executor 函数。当 cancel 函数被调用时，会创建一个新的 CanceledError 并解析 Promise。
    executor(function cancel(message) {
        if (token.reason) {
            // 已申请取消
            return;
        }

        token.reason = new Cancel(message);
        resolvePromise(token.reason);
    });
}

/**
 * 定义 throwIfRequested 方法，如果已经发起了取消请求，则抛出 CanceledError。
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
    if (this.reason) {
        throw this.reason;
    }
};

/**
 * 定义静态方法 source，返回一个对象，包含一个新的 CancelToken 实例和一个用于取消该 CancelToken 的函数。
 */
CancelToken.source = function source() {
    var cancel;
    var token = new CancelToken(function executor(c) {
        cancel = c;
    });
    return {
        token: token,
        cancel: cancel
    };
};

module.exports = CancelToken;
