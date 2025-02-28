import Queue from "yocto-queue";

export default function pLimit(concurrency) {
    // 检查 concurrency 输入的合法性
    validateConcurrency(concurrency);

    // 创建一个队列实例
    const queue = new Queue();
    // 当前正在执行的任务数量
    let activeCount = 0;

    /**
     * 执行下一个任务处理函数
     */
    const resumeNext = () => {
        // 如果正在执行的任务数小于并发限制并且队列中还有任务，则出队并执行
        if (activeCount < concurrency && queue.size > 0) {
            queue.dequeue()();
            // 因为队列数量 pendingCount 已减少 1，所以 activeCount 增加 1。
            activeCount++;
        }
    };

    /**
     * 执行下一个任务处理函数的调用入口
     */
    const next = () => {
        activeCount--;

        // 调用 resumeNext 函数来执行下一个任务。
        resumeNext();
    };

    /**
     * 入队任务
     * @param function_ 要执行的任务函数
     * @param resolve 返回的回调函数，用于告知 Promise 对象，任务是否执行成功
     * @param arguments_ 参数列表
     */
    const run = async (function_, resolve, arguments_) => {
        // 执行任务函数 function_ 并将结果保存到 result 中
        const result = (async () => function_(...arguments_))();

        // 使用 resolve 将结果返回给 enqueue 方法
        resolve(result);

        try {
            await result;
        } catch {
        }

        // 执行完任务后调用 next 函数，继续执行下一个任务
        next();
    };

    /**
     * 入队任务的函数
     * @param function_ 要执行的任务函数
     * @param resolve 返回的回调函数，用于告知 Promise 对象，任务是否执行成功
     * @param arguments_ 参数列表
     */
    const enqueue = (function_, resolve, arguments_) => {
        // 创建一个新的 Promise，并将 internalResolve 作为参数传递给回调函数。
        new Promise(internalResolve => {
            // 将 internalResolve 函数推入队列 queue 中。当它被调用时，会解析这个 Promise。
            queue.enqueue(internalResolve);
        }).then(
            // 使用 bind 方法，将 run 函数的参数提前绑定为 function_, resolve, 和 arguments_
            // 当 Promise 被解析时，会调用 run(function_, resolve, arguments_)。
            run.bind(undefined, function_, resolve, arguments_),
        );

        // 定义并立即执行一个异步函数。
        (async () => {
            // 等待下一个微任务队列中的任务完成。这确保了 activeCount 的更新是异步的，以便在检查 activeCount 时获取最新的值
            await Promise.resolve();

            // 检查当前正在执行的任务数量是否小于并发限制
            if (activeCount < concurrency) {
                // 如果可以执行新的任务，则调用 resumeNext 函数来执行下一个任务。
                resumeNext();
            }
        })();
    };

    /**
     * 生成器函数，创建一个 Promise，该 Promise 将任务入队
     * @param function_ 要执行的任务函数
     * @param arguments_ 参数列表
     * @returns {Promise<unknown>} 返回一个 Promise 对象
     */
    const generator = (function_, ...arguments_) => new Promise(resolve => {
        enqueue(function_, resolve, arguments_);
    });

    // 使用 Object.defineProperties 方法为 generator 对象添加一些属性和方法
    Object.defineProperties(generator, {
        activeCount: {
            // activeCount 属性的 getter 函数，返回当前正在执行的任务数量
            get: () => activeCount,
        },
        pendingCount: {
            // pendingCount 属性的 getter 函数，返回队列中等待执行的任务数量
            get: () => queue.size,
        },
        clearQueue: {
            // clearQueue 方法，用于清空队列
            value() {
                queue.clear();
            },
        },
        concurrency: {
            // concurrency 属性的 getter 函数，返回并发限制数量
            get: () => concurrency,
            // concurrency 属性的 setter 函数，用于设置并发限制数量
            set(newConcurrency) {
                validateConcurrency(newConcurrency);
                concurrency = newConcurrency;

                // ：queueMicrotask 方法会将回调函数添加到微任务队列中，该队列会在当前同步代码执行完毕后立即执行
                queueMicrotask(() => {
                    // eslint-disable-next-line no-unmodified-loop-condition
                    while (activeCount < concurrency && queue.size > 0) {
                        resumeNext();
                    }
                });
            },
        },
    });

    return generator;
}

export function limitFunction(function_, option) {
    const {concurrency} = option;
    const limit = pLimit(concurrency);

    return (...arguments_) => limit(() => function_(...arguments_));
}

function validateConcurrency(concurrency) {
    // 检查并发数 concurrency 是否为正整数或正无穷大，并且大于0
    if (!((Number.isInteger(concurrency) || concurrency === Number.POSITIVE_INFINITY) && concurrency > 0)) {
        throw new TypeError("Expected `concurrency` to be a number from 1 and up");
    }
}
