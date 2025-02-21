let controller;
const url = "https://mdn.github.io/dom-examples/abort-api/sintel.mp4";

const downloadBtn = document.querySelector(".download");
const abortBtn = document.querySelector(".abort");

downloadBtn.addEventListener("click", fetchVideo);

abortBtn.addEventListener("click", () => {
    if (controller) {
        controller.abort();
        console.log("中止下载");
    }
});

function fetchVideo() {
    controller = new AbortController();
    const signal = controller.signal;
    fetch(url, {signal}).then((response) => {
        console.log("下载完成", response);
    }).catch((err) => {
        console.error(`下载错误：${err.message}`);
    });
}
