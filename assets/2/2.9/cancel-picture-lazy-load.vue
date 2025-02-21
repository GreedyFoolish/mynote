<template>
  <div>
    <img v-for="(image, index) in topImage" :key="index" :src="image.src" :data-src="image.dataSrc"
         :alt="`Image ${index}`" class="lazy-image" @load="handleLoad" @error="handleError"/>
    <div class="content"></div>
    <img v-for="(image, index) in bottomImage" :key="index" :src="image.src" :data-src="image.dataSrc"
         :alt="`Image ${index}`" class="lazy-image" @load="handleLoad" @error="handleError"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      /**
       * 注意：受到跨域限制（CORS）：目标图片资源可能受到跨域限制，导致无法从当前的请求源（如本地开发环境）访问。
       * 解决方案：访问本地 public 目录下图片资源
       */
      topImage: [
        // {src: "", dataSrc: "https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Filter_effects/filters01-1.png"},
        // {src: "", dataSrc: "https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Filter_effects/filters01-2.png"},
        // {src: "", dataSrc: "https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Filter_effects/filters01-3.png"},
        {src: "", dataSrc: "./load-img/1.png"},
        {src: "", dataSrc: "./load-img/2.png"},
        {src: "", dataSrc: "./load-img/3.png"},
      ],
      bottomImage: [
        // {src: "", dataSrc: "https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Filter_effects/filters01-4.png"},
        // {src: "", dataSrc: "https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Filter_effects/filters01-5.png"},
        // {src: "", dataSrc: "https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Filter_effects/filters01-6.png"},
        {src: "", dataSrc: "./load-img/4.png"},
        {src: "", dataSrc: "./load-img/5.png"},
        {src: "", dataSrc: "./load-img/6.png"},
      ],
      observer: null,
      abortController: {},
    };
  },
  mounted() {
    this.initObserver();
    this.observeImages();
  },
  methods: {
    initObserver() {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          // 当观察元素进入视口时，加载图片
          if (entry.isIntersecting) {
            // console.log("观察元素进入视口：", entry.target, entry)
            const img = entry.target;
            const dataSrc = img.getAttribute("data-src");
            if (dataSrc) {
              // 直接请求图片资源
              // img.src = dataSrc;
              // 使用 AbortController 优化图片资源请求
              const controller = new AbortController();
              this.abortController[dataSrc] = controller;
              fetch(dataSrc, {signal: controller.signal}).then(response => {
                if (!response.ok) {
                  throw new Error("网络响应错误")
                }
                return response.blob()
              }).then(blob => {
                img.src = URL.createObjectURL(blob);
                img.removeAttribute("data-src"); // 避免重复加载
                this.observer.unobserve(img); // 取消对该图片的观察
                delete this.abortController[dataSrc]; // 清除对应的 AbortController
              }).catch(error => {
                if (error.name === "AbortError") {
                  console.log("图片懒加载请求被取消", img.src);
                } else {
                  console.error("图片加载错误", error);
                }
              });
            }
          } else {
            // console.log("观察元素不在视口：", entry.target, entry)
            this.topImage.forEach((image) => {
              if (this.abortController[image.dataSrc]) {
                // 取消图片资源请求
                this.abortController[image.dataSrc].abort();
              }
            });
            this.bottomImage.forEach((image) => {
              if (this.abortController[image.dataSrc]) {
                // 取消图片资源请求
                this.abortController[image.dataSrc].abort();
              }
            });
          }
        });
      }, {
        root: null, // 视口作为参照
        rootMargin: "0px",
        threshold: 0.1 // 交叉比例阈值
      });
    },
    observeImages() {
      this.topImage.forEach((image) => {
        const imgElement = this.$el.querySelector(`[data-src="${image.dataSrc}"]`);
        if (imgElement) {
          // 观察元素
          this.observer.observe(imgElement);
        }
      });
      this.bottomImage.forEach((image) => {
        const imgElement = this.$el.querySelector(`[data-src="${image.dataSrc}"]`);
        if (imgElement) {
          // 观察元素
          this.observer.observe(imgElement);
        }
      });
    },
    handleLoad(event) {
      // 可选：处理图片加载完成后的逻辑
      console.log("图片加载完成：", event.target);
    },
    handleError(event) {
      console.error("图片加载失败：", event.target);
      // 清除对应的实例
      delete this.abortController[event.target.src];
    },
  },
  beforeDestroy() {
    // 在组件销毁时取消所有未完成的请求
    Object.values(this.abortController).forEach((controller) => {
      controller.abort();
    });
    if (this.observer) {
      // 终止对所有目标元素可见性变化的观察
      this.observer.disconnect();
    }
  },
};
</script>

<style>
.lazy-image {
  width: 300px;
  height: auto;
}

.content {
  width: 100%;
  height: 1000px;
  background-color: gray;
}
</style>
