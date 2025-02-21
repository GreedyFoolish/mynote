let controller = null;
let loading = false;

const requestVideo = () => {
    console.log("下载中");
    loading = true;
    // 注意：每次请求都会创建一个新的实例，是因为 AbortController 实例调用 abort 后，
    // AbortController 实例的状态 signal 就为 aborted 不能更改
    controller = new AbortController();
    const xhr = new XMLHttpRequest();
    xhr.open("get", "https://mdn.github.io/dom-examples/abort-api/sintel.mp4");
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            console.log("下载成功");
            loading = false;
        }
    };
    // 监听 AbortController 实例的 abort 事件，当 AbortController 实例调用 abort 方法时，就会触发该事件执行回调
    controller.signal.addEventListener("abort", () => {
        console.log("下载中止");
        loading = false;
        xhr.abort();
    });
    xhr.send();
};

// 调用 AbortController 实例的 abort 方法，从而触发上面注册在 abort 事件的回调的执行
const abortDownload = () => {
    controller.abort();
};
