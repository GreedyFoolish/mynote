"use strict";

/**
 * CancelToken 类用于处理操作的取消请求。它允许客户端代码通过传递一个执行器函数（executor function）来创建
 * 一个 CancelToken 实例，并在需要时取消操作。
 */
var CanceledError = require("./CanceledError-v0.28.1");

/**
 * 定义 CancelToken 构造函数，接受一个执行器函数 executor 作为参数。
 * @param executor 执行器函数
 * @constructor
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

    // 将当前实例保存到变量 token 中，以确保在闭包中可以正确引用 this。
    var token = this;

    // 当 Promise 被解析时，遍历所有监听器并依次调用它们，最后清空监听器列表。这确保了所有订阅者都能接收到取消事件的通知。
    this.promise.then(function (cancel) {
        if (!token._listeners) return;

        var i = token._listeners.length;

        while (i-- > 0) {
            token._listeners[i](cancel);
        }
        token._listeners = null;
    });

    // 重写 promise.then ，使其返回一个新的 Promise，绑定取消事件的监听器和处理逻辑。这样可以在链式调用中支持取消操作。
    this.promise.then = function (onfulfilled) {
        var _resolve;
        var promise = new Promise(function (resolve) {
            token.subscribe(resolve);
            _resolve = resolve;
        }).then(onfulfilled);

        promise.cancel = function reject() {
            token.unsubscribe(_resolve);
        };

        return promise;
    };

    // 调用传入的 executor 函数。当 cancel 函数被调用时，会创建一个新的 CanceledError 并解析 Promise。
    executor(function cancel(message, config, request) {
        if (token.reason) {
            // 已申请取消
            return;
        }

        token.reason = new CanceledError(message, config, request);
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
 * 定义 subscribe 方法，用于订阅取消事件。如果已经取消，则立即调用监听器。
 */
CancelToken.prototype.subscribe = function subscribe(listener) {
    // 如果 CancelToken 实例已经执行 cancel，则直接执行该回调函数
    if (this.reason) {
        listener(this.reason);
        return;
    }

    // 如果 CancelToken 实例还没执行 cancel，则把回调函数放进监听器列表里
    if (this._listeners) {
        // 如果存在，则将新的 listener 添加到现有的监听器列表中。
        this._listeners.push(listener);
    } else {
        // 如果不存在，则初始化一个新的数组，并将 listener 作为第一个元素添加进去。
        this._listeners = [listener];
    }
};

/**
 * 定义 unsubscribe 方法，用于取消订阅取消事件，从监听器列表中移除指定的监听器。
 */

CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
    if (!this._listeners) {
        return;
    }
    var index = this._listeners.indexOf(listener);
    if (index !== -1) {
        this._listeners.splice(index, 1);
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
