## 1、CSS相关

### 1.1 实现淡入淡出、透明度、过度

```vue

<template>
  <div class="transition-box">
    <div :class="{transition:true,isShow:isShow}" @click="isShow = !isShow">
      <span style="font-size: 28px;font-weight: 600">点击切换</span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isShow: false
      };
    },
  }
</script>

<style scoped lang="scss">
  .transition-box {
    width: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .transition {
      width: 150px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      background-color: #E6A23C;
      border-radius: 30px;
      cursor: pointer;
      transition: all 1s;
      opacity: 0.3;
    }

    .isShow {
      height: 150px;
      line-height: 150px;
      border-radius: 0;
      opacity: 1;
    }
  }
</style>
```

### 1.2 svg中text标签基础使用

参考网址：https://blog.csdn.net/weixin_40779234/article/details/113701444

### 1.3 HTML跳转到页面指定位置的几种方法

#### 1.3.1 利用 id 为标记的锚点，这里作为锚点的标签可以是任意元素。

```html
<a href="#aa">跳转到 id 为 aa 标记的锚点</a>
<div id="aa">id 为 aa 标记的锚点</div>
```

#### 1.3.2 利用 a 标签的 name 属性作为锚点，这里作为锚点的标签只能是 a 标签。

```html
<a href="#bb">跳转到 name 为 bb 标记的锚点</a>
<a name="bb">name 为 bb 标记的锚点</a>
```

注意：当以`a`标签`name`属性作为锚点和利用`id`为标记的锚点同时出现（即以`name`为锚点和以`id`为锚点名字相同时），会将后者作为锚点。

#### 1.3.3 利用 scrollTo()，window.scrollTo 滚动到文档中的某个坐标。

```html
<a id="linkDom">平滑移动到cc</a>
<div id="cc">cc</div>
```

```javascript
const linkDom = document.getElementById("linkDom")
const cc = document.getElementById("cc")

function toTargetDom(el) {
    const bridge = el
    const body = document.body
    const height = 0
    // 计算该 DOM 节点到 body 顶部距离
    do {
        height += bridge.offsetTop
        bridge = bridge.offsetParent
    } while (bridge != body)
    // 滚动到指定位置
    window.scrollTo({
        top: height,
        behavior: "smooth"
    })
}

linkDom.addEventListener("click", function () {
    toTargetDom(cc)
})
```

#### 1.3.4 利用 scrollIntoView()，Element.scrollIntoView() 方法让当前的元素滚动到浏览器窗口的可视区域内。

```html
<a id="linkDom">移动到dd</a>
<div id="dd">dd</div>
```

```javascript
const linkDom = document.getElementById("linkDom")
const dd = document.getElementById("dd")

function toTargetDom(el) {
    el.scrollIntoView()
}

linkDom.addEventListener("click", function () {
    toTargetDom(dd)
})
```

#### 1.3.5 利用 scrollIntoView()，跳转到指定页面的指定位置。

```javascript
const scrollTo = (behavior = "smooth", block = "start", inline = "nearest", item) => {
    // 跳转到指定页面
    // pageIns.value.scrollIntoView({ behavior, block, inline });
    if (item) {
        /* 数据示例
        {
            "key": 979,
            "label": "第五条 抵押财产的保险",
            "pageIndex": 7,
            "position": {
                "x": 0.1914,
                "y": 0.1983
            },
            "children": []
        }
        */
        const targetPos = document.createElement("div");
        targetPos.style.width = "100px";
        targetPos.style.height = "100px";
        targetPos.style.position = "absolute";
        targetPos.style.top = item.position.y * 100 + "%";
        // pageIns是指定页面的ref
        pageIns.value.appendChild(targetPos);
        console.log("targetPos", targetPos);
        // 跳转到指定页面的指定位置
        targetPos.scrollIntoView({behavior: "smooth"});
        pageIns.value.removeChild(targetPos)
    }
};
```

### 1.4 实现回到页面顶部功能

参考网址：https://segmentfault.com/a/1190000041750000
动态显示滚动按钮
“回到顶部”并不是一直显示的，而是滚动到一定值才出现的，因此应该在window.onscroll里定义一个判断事件。

```javascript
window.onscroll = function () {
  const currentHeight = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
  // 页面滚动超过300px就显示
  if (currentHeight > 300) {
    document.getElementById('backtop').style.display = 'block'
  } else {
    document.getElementById('backtop').style.display = 'none'
  }
}
```

#### 1.4.1 使用锚点实现

```html
<a href="#top">回到顶部</a>
<div id="top"></div>
```

#### 1.4.2 scrollTo函数

控制滚动条回到指定位置，第一个参数是距离页面左端的距离，第二个参数是距离页面顶部的距离。

```html
<a href="javascript:scrollTo(0, 0)">回到顶部</a>
```

#### 1.4.3 scrollTop函数

控制滚动条垂直偏移。

```javascript
<a onclick="byScrollTop()">回到顶部</a>

function byScrollTop() {
    document.documentElement.scrollTop = 0;
    window.pageYOffset = 0; // 兼容ios
    document.body.scrollTop = 0; // 兼容低版本ie
}
```

#### 1.4.4 scrollBy函数

该方法可把内容滚动指定的像素数。第一个参数指向右滚动的像素，第二个参数指向下滚动的参数，负数可使方向相反。

```javascript
<a onclick="byScrollBy()">回到顶部</a>

function byScrollBy() {
  const topHeight = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
  scrollBy(0, -topHeight);
}
```

#### 1.4.4 间接回到顶部

定时器实现滚动动画。通过定时器实现固定速度的自动滚动动画效果。但是这样会有个问题，就是当页面内容十分多的时候，这个时候离顶部已经有很长一段距离了。如果还是一个固定速度的话，可能会长达10秒钟，这对用户体验来说是不友好的。

```javascript
<a onclick="scrollToTop()">回到顶部</a>

function scrollToTop() {
  const topHeight = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
  scrollBy(0, -100);
  // 模拟鼠标向上滚动事件
  scrollDelay = setTimeout('scrollToTop()', 50);
  // 清除滚动事件，避免无法向下移动
  if (topHeight === 0) {
    clearTimeout(scrollDelay);
    scrollDelay = null;
  }
}
```

定时器实现滚动动画-改良版

```javascript
function scrollToTop() {
  const topHeight = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
  const speed = topHeight / 10 > 100 ? topHeight / 10 : 100;
  scrollBy(0, -speed);
  // 模拟鼠标向上滚动事件
  scrollDelay = setTimeout('scrollToTop()', 50);
  // 清除滚动事件，避免无法向下移动
  if (topHeight === 0) {
    clearTimeout(scrollDelay);
    scrollDelay = null;
  }
}
```

### 1.5 鼠标悬停时显示元素

通过`hover`伪类给鼠标悬停后需要展示的元素添加display:block属性实现

```vue

<template>
  <div class="info-item">
    <div class="default-wrap">
      default-wrap
    </div>
    <div class="hover-wrap">
      hover-wrap
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
  }
</script>

<style scoped lang="scss">
  .info-item {
    width: 500px;
    height: 200px;

    .hover-wrap {
      display: none;
    }

    &:hover .default-wrap {
      display: none;
    }

    &:hover .hover-wrap {
      display: block;
    }
  }
</style>
```

### 1.6 CSS实现自动换行、强制换行、强制不换行的属性

* 自动换行：

```vue

<style lang="scss">
  * {
    word-break: normal;
    word-wrap: break-word;
  }
</style>
```

* 强制换行：

```vue

<style lang="scss">
  * {
    /* 按字符截断换行，支持IE和chrome，FF不支持 */
    word-break: break-all;
    /* 按英文单词整体截断换行，以上三个浏览器均支持 */
    word-wrap: break-word;
  }
</style>
```

**注意：单词换行需要父盒子为块级元素**

* 强制不换行：

```vue

<style lang="scss">
  * {
    white-space: nowrap;
  }
</style>
```

```text
word-break : normal | break-all | keep-all
    normal 使用浏览器默认的换行规则，允许字内换行。
    break-all 允许在单词内换行。
    keep-all 只能在半角空格或连字符处换行。
    
word-wrap : normal | break-word
    normal : 允许内容顶开指定的容器边界，允许字内换行。
    break-word : 内容将在边界内换行，允许单词换行。
    
white-space:normal | nowrap | pre-wrap
    normal : 连续的空白符会被合并。源码中的换行符会被当作空白符来处理。并根据填充行框盒子的需要来换行。
    nowrap : 和 normal 一样合并空白符，但阻止源码中的文本换行。
    break-word : 连续的空白符会被保留。在遇到换行符或 <br> 元素时，或者根据填充行框盒子的需要换行。
```

### 1.7 实用的CSS background-image小技巧

参考网址：https://blog.csdn.net/qq_43067585/article/details/109462517

#### 1.7.1 将背景图完美适配视口

```css
body {
    background-image: url("https://1.jpg");
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
}
```

#### 1.7.2 在CSS中使用多个背景图

```css
body {
    background-image: url("https://1.jpg"), url("https://2.jpg");
    background-position: center, top;
    background-repeat: repeat, no-repeat;
    background-size: contain, cover;
}
```

#### 1.7.3 创建三角背景图

参考：https://developer.mozilla.org/zh-CN/docs/Web/CSS/clip-path

```vue

<template>
  <div class="wrap">
    <div class="day-wrap">
    </div>
    <div class="night-wrap">
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
  }
</script>

<style scoped lang="scss">
  .wrap {
    position: absolute;
    width: 500px;
    height: 200px;

    .day {
      background-image: url("https://1.jpg");
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }

    .night {
      background-image: url("https://2.jpg");
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      clip-path: polygon(500px 0, 0 0, 500px 200px);
    }
  }
</style>
```

#### 1.7.4 在背景图上添加叠加渐变

```css
body {
    background-image: linear-gradient(4deg, rgb(11, 12, 13) 30%, rgb(22, 23, 24) 50%, rgb(33, 34, 35) 100%,), url("https://1.jpg");
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
```

#### 1.7.5 创建变色背景图动画

```css
@keyframes background-overlay-animation {
    0% {
        background-image: linear-gradient(4deg, rgb(11, 12, 13) 30%, rgb(22, 23, 24) 50%, rgb(33, 34, 35) 100%,), url("https://1.jpg");
    }
    25% {
        background-image: linear-gradient(4deg, rgb(33, 33, 33) 30%, rgb(22, 23, 24) 50%, rgb(33, 34, 35) 100%,), url("https://1.jpg");
    }
    50% {
        background-image: linear-gradient(4deg, rgb(99, 99, 99) 30%, rgb(22, 23, 24) 50%, rgb(33, 34, 35) 100%,), url("https://1.jpg");
    }
    100% {
        background-image: linear-gradient(4deg, rgb(111, 111, 111) 30%, rgb(22, 23, 24) 50%, rgb(33, 34, 35) 100%,), url("https://1.jpg");
    }
}

@-webkit-keyframes background-overlay-animation {
    0% {
        background-image: linear-gradient(4deg, rgb(11, 12, 13) 30%, rgb(22, 23, 24) 50%, rgb(33, 34, 35) 100%,), url("https://1.jpg");
    }
    25% {
        background-image: linear-gradient(4deg, rgb(33, 33, 33) 30%, rgb(22, 23, 24) 50%, rgb(33, 34, 35) 100%,), url("https://1.jpg");
    }
    50% {
        background-image: linear-gradient(4deg, rgb(99, 99, 99) 30%, rgb(22, 23, 24) 50%, rgb(33, 34, 35) 100%,), url("https://1.jpg");
    }
    100% {
        background-image: linear-gradient(4deg, rgb(111, 111, 111) 30%, rgb(22, 23, 24) 50%, rgb(33, 34, 35) 100%,), url("https://1.jpg");
    }
}

body {
    background-image: url("https://1.jpg");
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    animation-name: background-overlay-animation;
    animation-delay: 5s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-timing-function: linear;
}
```

#### 1.7.6 制作网格背景图

```vue

<template>
  <div class="wrap">
    <div class="itemImag"></div>
    <div class="item"></div>
    <div class="itemImag"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="itemImag"></div>
    <div class="item"></div>
    <div class="itemImag"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="itemImag"></div>
    <div class="item"></div>
    <div class="itemImag"></div>
    <div class="item"></div>
    <div class="itemImag"></div>
    <div class="item"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
  }
</script>

<style scoped lang="scss">
  .wrap {
    position: absolute;
    width: 500px;
    height: 500px;
    background-color: black;
    display: grid;
    grid-template-columns: 25fr 30fr 40fr 15fr;
    grid-template-rows: 20fr 45fr 5fr 30fr;
    grid-gap: 20px;

    .itemImag {
      background-image: url("https://1.jpg");
      background-attachment: fixed;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
</style>
```

#### 1.7.7 将背景图设置为文本填充

参考：https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-clip

```vue

<template>
  <div class="wrap">
    hello world
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
  }
</script>

<style scoped lang="scss">
  .wrap {
    position: absolute;
    width: 500px;
    height: 500px;
    background-image: url("https://1.jpg");
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
</style>
```

### 1.8 图解 e.clientX,e.clientY e.pageX e.pageY e.offsetX e.offsetY

```text
event.clientX、event.clientY
鼠标相对于浏览器窗口可视区域的X，Y坐标（窗口坐标），可视区域不包括工具栏和滚动条。IE事件和标准事件都定义了这2个属性

event.pageX、event.pageY
类似于event.clientX、event.clientY，但它们使用的是文档坐标而非窗口坐标。这2个属性不是标准属性，但得到了广泛支持。IE事件中没有这2个属性。

event.offsetX、event.offsetY
鼠标相对于事件源元素（srcElement）的X,Y坐标，只有IE事件有这2个属性，标准事件没有对应的属性。

event.screenX、event.screenY
鼠标相对于用户显示器屏幕左上角的X,Y坐标。标准事件和IE事件都定义了这2个属性
```

![1.8.png](assets/1.8/1.png)

### 1.9 按钮Button、图标Svg等点击之后出现黑框的原因及解决办法

按钮Button、图标Svg等点击之后出现黑框，是因为`:focus`伪类添加了如下默认的轮廓样式

```css
:focus {
    outline: -webkit-focus-ring-color auto 5px;
}
```

解放方案：将`outline`样式设置为`none`即可

```css
svg {
    outline: none;
}
```

### 1.10 flex布局

参考：https://ruanyifeng.com/blog/2015/07/flex-grammar.html

Flex 布局是什么？
Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。
任何一个容器都可以指定为 Flex 布局。

```css
.box {
    display: flex;
}
```

行内元素也可以使用 Flex 布局。

```css
.box {
    display: inline-flex;
}
```

Webkit 内核的浏览器，必须加上-webkit前缀。

```css
.box {
    display: -webkit-flex; /* Safari */
    display: flex;
}
```

注意，设为 Flex 布局以后，子元素的float、clear和vertical-align属性将失效。

采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex
item），简称"项目"。
容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main
start，结束位置叫做main end；
交叉轴的开始位置叫做cross start，结束位置叫做cross end。项目默认沿主轴排列。单个项目占据的主轴空间叫做main
size，占据的交叉轴空间叫做cross size。

![1.10.1.png](assets/1.10/1.png)

#### 容器的属性：

* flex-direction
* flex-wrap
* flex-flow
* justify-content
* align-items
* align-content

#### 1.10.1 flex-direction属性

flex-direction属性决定主轴的方向（即项目的排列方向）。

```css
.box {
    flex-direction: row;
}

/*
    row（默认值）：主轴为水平方向，起点在左端。
    row-reverse：主轴为水平方向，起点在右端。
    column：主轴为垂直方向，起点在上沿。
    column-reverse：主轴为垂直方向，起点在下沿。
*/
```

![1.10.2.png](assets/1.10/2.png)

#### 1.10.2 flex-wrap属性

默认情况下，项目都排在一条线（又称"轴线"）上。flex-wrap属性定义，如果一条轴线排不下，如何换行。

```css
.box {
    flex-wrap: nowrap;
}

/*
    nowrap（默认）：不换行。
    wrap：换行，第一行在上方。
    wrap-reverse：换行，第一行在下方。
*/
```

![1.10.3.png](assets/1.10/3.png)

#### 1.10.3 flex-flow属性

flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。

```css
.box {
    flex-flow: row nowrap;
}
```

#### 1.10.4 justify-content属性

justify-content属性定义了项目在主轴上的对齐方式。

```css
.box {
    justify-content: flex-start;
}

/*
    它可能取5个值，具体对齐方式与轴的方向有关。下面假设主轴为从左到右。
    flex-start（默认值）：左对齐
    flex-end：右对齐
    center： 居中
    space-between：两端对齐，项目之间的间隔都相等。
    space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
*/
```

![1.10.4.png](assets/1.10/4.png)

#### 1.10.5 align-items属性

align-items属性定义项目在交叉轴上如何对齐。

```css
.box {
    align-items: flex-start;
}

/*
    它可能取5个值。具体的对齐方式与交叉轴的方向有关，下面假设交叉轴从上到下。
    flex-start：交叉轴的起点对齐。
    flex-end：交叉轴的终点对齐。
    center：交叉轴的中点对齐。
    baseline: 项目的第一行文字的基线对齐。
    stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。
*/
```

![1.10.5.png](assets/1.10/5.png)

#### 1.10.6 align-content属性

align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

```css
.box {
    align-content: stretch;
}

/*
    flex-start：与交叉轴的起点对齐。
    flex-end：与交叉轴的终点对齐。
    center：与交叉轴的中点对齐。
    space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
    space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
    stretch（默认值）：轴线占满整个交叉轴。
*/
```

![1.10.6.png](assets/1.10/6.png)

#### 项目的属性：

* order
* flex-grow
* flex-shrink
* flex-basis
* flex
* align-self

#### 1.10.7 order属性

order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

```css
.item {
    order: 0;
}
```

![1.10.7.png](assets/1.10/7.png)

#### 1.10.8 flex-grow属性

flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

```css
.item {
    flex-grow: 0;
}
```

![1.10.8.png](assets/1.10/8.png)

#### 1.10.9  flex-shrink属性

flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。
负值对该属性无效。

```css
.item {
    flex-shrink: 1;
}
```

![1.10.9.png](assets/1.10/9.png)

#### 1.10.10  flex-basis属性

flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。

```css
.item {
    flex-basis: auto;
}
```

#### 1.10.11  flex属性

flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。
建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

```css
.item {
    flex: 0 1 auto
}
```

#### 1.10.12  align-self属性

align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

```css
.item {
    align-self: auto;
}

/*
    该属性可能取6个值，除了auto，其他都与align-items属性完全一致。
    auto：表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
    flex-start：交叉轴的起点对齐。
    flex-end：交叉轴的终点对齐。
    center：交叉轴的中点对齐。
    baseline: 项目的第一行文字的基线对齐。
    stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。
*/
```

![1.10.10.png](assets/1.10/10.png)

### 1.11 Vue移动端 / PC端适配解决方案：postcss-px-to-viewport

参考：https://juejin.cn/post/7018433228591595550

postcss-px-to-viewport就是这样一款优秀、高效、简洁的解决方案，它能完美解决上面的三个痛点，高效的将代码中px单位转为rm、rem、vw等视口单位，一份配置文件完美解决适配问题。

#### 1.11.1 开发环境`npm`安装插件

```shell
npm install postcss-px-to-viewport --save-dev
```

#### 1.11.2 项目根目录添加配置文件 postcss.config.js

#### 1.11.3 添加配置

```javascript
module.exports = {
    plugins: {
        'postcss-px-to-viewport': {
            unitToConvert: 'px', // 需要转换的单位，默认为"px"
            viewportWidth: 1920, // 设计稿的视口宽度
            unitPrecision: 5, // 单位转换后保留的精度
            propList: ['*'], // 能转化为vw的属性列表
            viewportUnit: 'vw', // 希望使用的视口单位
            fontViewportUnit: 'vw', // 字体使用的视口单位
            selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
            minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
            mediaQuery: false, // 媒体查询里的单位是否需要转换单位
            replace: true, //  是否直接更换属性值，而不添加备用属性
            exclude: undefined, // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
            include: undefined, // 如果设置了include，那将只有匹配到的文件才会被转换
            landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
            landscapeUnit: 'vw', // 横屏时使用的单位
            landscapeWidth: 1920 // 横屏时使用的视口宽度
        }
    }
}
```

#### 1.11.4 重新运行项目，触发配置文件生效

### 1.12 标准盒模型和怪异盒子模型的区别

参考：https://blog.csdn.net/karlaofsky/article/details/140264692

盒模型描述了一个 HTML 元素所占用的空间，由内容（content）、内边距（padding）、边框（border）和外边距（margin）组成。

```text
可以通过修改元素的box-sizing属性来改变元素的盒模型：
box-sizing: content-box; 表示标准盒模型（默认值）
box-sizing: border-box; 表示IE盒模型（怪异盒模型）
```

#### 1.12.1 标准盒模型

标准盒模型中，元素的宽度和高度只计算内容的宽度和高度，内边距、边框和外边距不包含在元素的宽度和高度之内。

#### 1.12.1 怪异盒模型

怪异盒模型（IE 盒模型）中，元素的宽度和高度包含了内容、内边距和边框， 外边距不包含在内。

例如，一个设置了宽度高度为 200px，内边距为 10px，边框为 2px ，外边距为 20px 的元素：

![1.12.1.png](assets/1.12/1.png)
![1.12.2.png](assets/1.12/2.png)

在怪异盒模型下，元素在页面上占据的总宽度就是设置的 200px ，因为内边距和边框都包含在这 200px 之内。

![1.12.3.png](assets/1.12/3.png)
![1.12.4.png](assets/1.12/4.png)

当需要精确控制元素的尺寸，且不希望添加内边距（padding）或边框（border）时导致元素的实际占用空间发生变化的情况下，可以使用怪异盒子模型（IE
盒模型），即设置`box-sizing: border-box;`。

### 1.13 获取浏览器可视区域的宽度和高度

参考：https://blog.csdn.net/lifangfang0607/article/details/107376369

```javascript
const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
const width = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
```

### 1.14 样式穿刺，深度选择器

参考：https://juejin.cn/post/7413669480624357386
https://segmentfault.com/a/1190000015932467

在`Vue`项目中，尤其是在使用组件化开发时，有时需要对组件内部的某些样式进行调整，但`Vue`的样式封装特性`scoped`
会阻止外部样式直接作用于组件内部。为了应对解决这个问题，`Vue`引入了深度选择器（也称为穿透选择器或阴影穿透选择器），让我们能够跨越组件的封装边界，对内部元素进行样式定制。

深度选择器允许我们从父组件中穿透到子组件内部，直接修改子组件的样式。这在需要定制第三方`UI`库组件样式时尤为实用。

`scoped`的实现原理

`Vue`中的`scoped`属性的效果主要是通过`PostCss`实现的。以下是转译前的代码:

```vue

<style scoped lang="less">
  .example {
    color: red;
  }
</style>
<template>
  <div class="example">scoped测试案例</div>
</template>
```

转译后:

```vue

<style>
  .example[data-v-5558831a] {
    color: red;
  }
</style>
<template>
  <div class="example" data-v-5558831a>scoped测试案例</div>
</template>
```

`PostCSS`给一个组件中的所有dom添加了一个独一无二的动态属性，给`CSS`选择器额外添加一个对应的属性选择器，来选择组件中的`DOM`
,这种做法使得样式只作用于含有该属性的`DOM`元素（组件内部的`DOM`）。

`scoped`的渲染规则：
给`HTML`的`DOM`节点添加一个不重复的`data`属性（例如：`data-v-5558831a`）来唯一标识这个`DOM`元素在每句`CSS`选择器的末尾（
编译后生成的`CSS`语句）加一个当前组件的`data`属性选择器(例如：`[data-v-5558831a]`)来私有化样式

#### 1.14.1 深度选择器种类

##### 1.14.1.1 原生深度选择器

`>>>`是`CSS`原生中的深度选择器语法，用于穿透样式封装。

* 兼容性：仅在某些特定环境（如`Webpack`的`css-loader`配置中）和原生`CSS`中有效，`Vue`单文件组件中通常需要特定配置才能使用。
* 注意：在`Vue`单文件组件中，我们通常会搭配`CSS`预处理器使用。但`Sass`之类的预处理器无法正确解析`>>>`，所以不推荐使用`>>>`
  ，可以使用`/deep/`或`::v-deep`操作符取而代之，两者都是`>>>`的别名，同样可以正常工作。

```css
.parent >>> .child {
  /* 样式规则 */
}
```

##### 1.14.1.2 /deep/深度选择器

`/deep/`曾经是`CSS`中实际提出的新增功能，但之后被删除，所以不建议使用。

* 兼容性：支持`CSS`预处理器（如`Sass`、`Less`）和`CSS`原生样式。
* 注意：在`Vue3`中，`/deep/`不再被官方直接支持，虽然一些构建工具或库可能仍然兼容，但不推荐使用，使用后编译时控制台会输出警告信息。

```css
.parent /deep/ .child {
  /* 样式规则 */
}
```

##### 1.14.1.3 ::v-deep深度选择器

`::v-deep`是`/deep/`的别名深度选择器。

* 兼容性：支持`Vue2`，但在`Vue3`中不推荐使用。
* 注意：在`Vue3`中，`::v-deep`也不再被官方直接支持，虽然一些构建工具或库可能仍然兼容，但不推荐使用，使用后编译时控制台会输出警告信息。

```css
.parent /deep/ .child {
  /* 样式规则 */
}
```

##### 1.14.1.4 ::v-deep()深度选择器

`::v-deep()`是深度选择器从`Vue2`向`Vue3`演化过程中的一个过渡性组合器。

用法：支持`Vue3`，但编译时视为已弃用并会引发警告。

```css
.parent ::v-deep(.child) {
  /* 样式规则 */
}
```

##### 1.14.1.5 :deep()深度选择器

`:deep()`是`Vue3`官方推荐的深度选择器，不建议使用`>>>`，`/deep/`，`::v-deep`及`::v-deep()`。

* 兼容性：支持`Vue3`，但在`Vue2`中不可使用。
* 文档：https://cn.vuejs.org/api/sfc-css-features#style-scoped

```css
.parent :deep(.child) {
  /* 样式规则 */
}
```

#### 1.14.2 演变过程

参考：https://github.com/vuejs/rfcs/blob/scoped-styles-changes/active-rfcs/0023-scoped-styles-changes.md#deep-selectors

最初我们支持`>>>`组合器，以使选择器“更深入”。但是，由于这不是官方的`CSS`组合器，因此某些`CSS`预处理器（如`SASS`）在解析它时会遇到问题。
后来改用了`/deep/`，它曾是`CSS`中实际提出的新增功能（`Chrome`原生支持）但后来删除了。这给用户带来了困惑，因为他们担心`/deep/`
在`Vue SFC`中使用会导致他们的代码在已删除该功能的浏览器中不受支持。但是，就像`>>>`一样，`/deep/`它仅被`Vue`的`SFC`
编译器用作编译时提示来重写选择器，并在最终的`CSS`中被删除。

为了避免因删除组合器而产生的混淆/deep/，我们引入了另一个自定义组合器，`::v-deep`这次更明确地表明这是一个特定于`Vue`
的扩展，并使用伪元素语法，以便任何预处理器都应该能够解析它。出于兼容性原因，当前`Vue2 SFC`
编译器仍支持深度组合器的先前版本，这又会让用户感到困惑。在`Vue3`中，我们不再支持`>>>`和`/deep/`。

当我们在为`Vue3`开发新的`SFC`编译器时，我们注意到`CSS`伪元素实际上在语义上不是组合器。伪元素接受参数更符合惯用的`CSS`
，因此我们也以`::v-deep()`这种方式进行工作。目前仍支持将作为组合器的`::v-deep`用法，但会视为已弃用并会引发警告。

`>>>` → `/deep/` → `::v-deep` → `::v-deep()` → `:deep()`

可以明显看到深度选择器的演化趋势：**关系选择器 → 伪元素 → 伪类**

#### 1.14.3 使用场景

1. 在`Vue2`中使用`::v-deep`。
2. 在`Vue3`中使用`:deep()`。
3. `/deep/`需要与特定浏览器版本搭配使用，不推荐使用。
4. 部分`CSS`预处理器对`>>>`支持不佳，在不使用`CSS`预处理器时可使用，否则不推荐使用。

## 2、JavaScript相关

### 2.1 获取图片实际宽高

```javascript
const img_url = '13643608813441.jpg'
const img = new Image()
img.src = img_url
if (img.complete) {
    // 判断是否有缓存
    alert('from:complete : width:' + img.width + ',height:' + img.height)
} else {
    // 加载完成执行
    img.onload = function () {
        alert('width:' + img.width + ',height:' + img.height)
    }
}
```

### 2.2 JavaScript中封装手机触屏判断滑动方向和滑动距离

参考：https://blog.csdn.net/qq_39460057/article/details/134651637

```javascript
export const onTouchMove = (el, callback) => {
  let [startX, startY, moveEndX, moveEndY] = [0, 0, 0, 0]
  el.addEventListener("touchstart", e => {
    console.log(`changedTouches: ${e.changedTouches}`)
    startX = e.changedTouches[0].pageX
    startY = e.changedTouches[0].pageY
  })
  el.addEventListener("touchmove", e => {
    // 阻止默认滚动行为
    e.preventDefault()
  })
  el.addEventListener("touchend", e => {
    moveEndX = e.changedTouches[0].pageX
    moveEndY = e.changedTouches[0].pageY
    const [disX, disY] = [moveEndX - startX, moveEndY - startY]
    let [direction, distance] = ["", 0]
    if (Math.abs(disX) > Math.abs((disY))) {
      direction = disX > 0 ? "right" : "left"
      distance = disX
    } else if (Math.abs(disX) < Math.abs((disY))) {
      direction = disY > 0 ? "down" : "up"
      distance = disY
    }
    callback({direction, distance})
  })
}

// 调用方式
onTouchMove(el, info => {
  console.log(info)
})
```

### 2.3 函数节流和函数防抖及其区别

参考：https://juejin.cn/post/7103365414776176648

浏览器中总是有一些操作非常耗费性能。所以就有了函数节流和函数防抖来提高浏览器性能。

```text
函数节流：频繁触发一个事件时候，每隔一段时间，函数只会执行一次。
函数防抖：当触发一个时间后的n秒内，如果该事件没有被第二次触发，则执行。否，则重新开始计时。
```

#### 2.3.1 函数节流

函数节流应用场景：滚动条滚动事件，dom的拖拽事件等

例： 我们都知道滚动条滚动的时候触发事件的频率极其地频繁。监控滚动条的滚动事件，滚动一次该事件可以触发上百次。很显然，有时候，我们并不需要触发如此多的次数。函数节流，由此而生。在固定的时间内，只触发一次。

```javascript
// 节流函数。callback 需要节流的函数，time 节流间隔时间点，默认值 300 毫秒
export const onScroll = (callback, time = 300) => {
  let state = true;
  // 判断如否有函数传入
  if (typeof callback !== "function") {
    throw "第一个入参必须是函数,需要被节流的函数"
  }
  return () => {
    if (state) {
      callback();
      state = false;
      setTimeout(() => {
        state = true;
      }, time)
    }
  }
}
```

调用方式

```vue

<template>
  <div class="wrap" @scroll="onScroll(callback,300)">
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    methods: {
      callback() {
        console.log("节流函数")
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
```

#### 2.3.2 函数防抖

函数防抖应用场景:搜索框的搜索事件等

例：搜索框实际上是监控搜索框内容改变，请求后台搜索查询。 比如我们输入一个`search`单词，搜索框内部的`change`
事件会触发六次，每输入一个字母触发一次`change`事件。但是，我们真的需要发送六个请求去查询吗？完全不必要。
实际上我们只需要在`search`单词输入完毕后查询一次即可。函数防抖，由此而生。在规定时间内，受防抖的函数被触发第二次时候后，上一次触发销毁，下一次重新开始计时，计时完毕后触发执行。

```javascript
// 防抖函数。callback 需要节流的函数，time 节流间隔时间点，默认值 300 毫秒
export const onchange = (callback, time = 300) => {
  let asyncFun;
  if (typeof callback !== "function") {
    throw "第一个入参必须是函数,需要进行防抖的函数"
  }
  return () => {
    // 在上一个函数被触发前，销毁他
    if (asyncFun !== undefined) clearTimeout(asyncFun);
    asyncFun = setTimeout(() => {
      callback();
    }, time)
  }
}
```

调用方式

```vue

<template>
  <input @input="onchange(callback,300)">
</template>

<script>
  export default {
    data() {
      return {};
    },
    methods: {
      callback() {
        console.log("防抖函数")
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
```

不论是函数防抖还是函数节流，都是性能优化的一种手段，都是为阻止函数无意义的执行，减小dom压力，避免不必要的性能浪费。

### 2.4 JavaScript删除对象属性及判定是否包含某属性

#### 2.4.1 删除对象属性

##### 2.4.1.1 delete

```text
语法： delete 对象.属性名
```

```javascript
const obj = {name: "zhangsan", age: 18}
delete obj.name
console.log(obj)
// {age:18}
delete obj["name"]
console.log(obj)
// {age:18}
```

##### 2.4.1.2 ES6解构赋值

```text
语法： const {属性名1,属性名2...} = 对象
```

```javascript
const obj = {name: "zhangsan", age: 18}
const {name, ...newObj} = obj
console.log(newObj)
// {age:18}
```

##### 2.4.1.3 ES6反射

```text
语法： Reflect.defineProperty(对象,属性名)
```

```javascript
const obj = {name: "zhangsan", age: 18}
Reflect.defineProperty(obj, "name")
console.log(obj)
// {age:18}
```

#### 2.4.2 对象是否包含某属性

##### 2.4.2.1 delete

```text
语法： obj.hasOwnProperty(属性名)
```

```javascript
const obj = {name: "zhangsan", age: 18}
console.log(obj.hasOwnProperty("name"))
// true
console.log(obj.hasOwnProperty("sex"))
// false
```

##### 2.4.2.2 属性判断

```text
语法： 对象.属性名 !== undefined
```

```javascript
const obj = {name: "zhangsan", age: 18}
console.log(obj.name !== undefined)
// true
console.log(obj.sex !== undefined)
// false
```

##### 2.4.2.3 Object.keys

```text
语法： Object.keys(对象).indexOf(属性名) !== -1
```

```javascript
const obj = {name: "zhangsan", age: 18}
console.log(Object.keys(obj).indexOf("name") !== -1)
// true
console.log(Object.keys(obj).indexOf("sex") !== -1)
// false
```

##### 2.4.2.4 ES6属性名in对象

```text
语法： 属性名 in 对象
```

```javascript
const obj = {name: "zhangsan", age: 18}
console.log("name" in obj)
// true
console.log("sex" in obj)
// false
```

### 2.5 forEach和map的区别

参考：https://juejin.cn/post/7271846986998054971

map会返回一个新的数组，而forEach不会，实际上是因为forEach不会返回任何值（实际上返回的是undefined），而map 是有返回值的，是一个新数组

上述说法是错误的，是否改变原数组，取决于循环中的item是引用类型还是基础类型，引用类型都会发生变化。因为引用类型的元素实际上存储的是引用（内存地址），而非值本身。所以引用类型元素的修改会直接反映在原始数组中。而number,string,Boolean,null,undefined这些基础类型是在栈内存中直接存储变量与值

foreach可以使用return跳出本次循环，而map不能。foreach不支持链式调用，而map支持链式调用，可以继续对返回的新数组进行操作。

**注意：不能使用break语句来中断循环。break语句用于中断循环的功能只适用于for循环或while循环**

### 2.6 JavaScript 中使用媒体查询

参考：https://juejin.cn/post/7206134581744435258

媒体查询想必大家最先想到的都是CSS中@media。没错，这是我们最常用的媒体查询方法，主要用来为我们的网站做适配处理。

```css
h1 {
  font-size: 2rem;
  color: green;
}

@media (min-width: 600px) {
  h1 {
    font-size: 4rem;
  }
}

/* 标题需要为绿色，字体大小为 2rem。但是当屏幕宽度超过 600px 时，字体大小需要增加到 4rem */
```

**在JavaScript中使用媒体查询**

我们可以在`JavaScript`代码中使用与上面相同的媒体查询。主要API就是 `Window.matchMedia()`

`Window`的`matchMedia()`方法返回一个新的`MediaQueryList`对象，表示指定的媒体查询`(en-US)`
字符串解析后的结果。返回的`MediaQueryList`可被用于判定`Document`是否匹配媒体查询，或者监控一个`Document`
来判定它匹配了或者停止匹配了此媒体查询。

**语法**

```javascript
mqList = window.matchMedia(mediaQueryString)
```

**参数**

matchMedia()方法接受单个参数作为其值，即您要检查的媒体查询。

mediaQueryString：一个被用于媒体查询解析的字符串。

**返回值**

一个用来媒体查询的新的MediaQueryList对象
它包含两个属性：

* media，它将媒体查询存储为序列化字符串

* matches，它基本上是一个布尔值，如果我们作为参数提供的媒体查询与文档匹配则返回true

```vue

<template>
  <div>
    <div id="home"></div>
    <div id="home2"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    methods: {
      watchWidthMedia(target, mqList, cnt) {
        if (mqList.matches) {
          target.innerHTML = `<p> >600px ${cnt}次</p>`;
        } else {
          target.innerHTML = `<p> <=600px ${cnt}次</p>`;
        }
      },
      watchWidthChange(target, cnt) {
        if (window.innerWidth > 600) {
          target.innerHTML = `<p> >600px ${cnt}次</p>`;
        } else {
          target.innerHTML = `<p> <=600px ${cnt}次</p>`;
        }
      },
    },
    mounted() {
      let cnt = 0
      const target = document.getElementById("home")
      const mqList = window.matchMedia("(min-width: 600px)")
      mqList.onchange = (e) => {
        cnt++
        this.watchWidthMedia(target, e, cnt)
      }
      this.watchWidthMedia(target, mqList, cnt)

      let cnt2 = 0
      const target2 = document.getElementById("home2")
      window.addEventListener('resize', e => {
        cnt2++
        this.watchWidthChange(target2, cnt2)
      });
      this.watchWidthChange(target2, cnt2);
    }
  }
</script>

<style scoped lang="scss">
</style>
```

**性能对比**

每次调整窗口大小时，`resize`事件侦听器都会触发`watchWidthChange`函数。这仅在某些情况下需要响应窗口大小更改的每个实例，例如更新画布。
但在只有当宽度或高度达到某个阈值时才需要发生某些事情，例如文本更新。在这种情况下，`matchMedia`
将会获得更好的性能，因为它仅在媒体查询条件的实际更改时触发回调。

### 2.7 从生成器函数Generator角度思考async await

参考：https://juejin.cn/post/7412487295729139712
https://zhuanlan.zhihu.com/p/558431779
https://github.com/Sunny-lucking/blog/issues/6

#### 2.7.1 Generator函数基础

所谓 Generator 函数，最大特点就是可以交出函数的执行权（即拥有暂停函数执行的效果）。

```javascript
function* gen() {
  yield 'a'
  yield 'b'
}

const g = gen()
g.next()
// {"value": "a", "done": false}
g.next()
// {"value": "b", "done": false}
g.next()
// {"value": undefined, "done": true}
```

调用生成器函数会返回一个`Generator{}`生成器实例对象。返回的`g`生成器对象可以近似地理解成为下面的对象结构:

```javascript
{
  next: () => {
    return {
      value: VALUE, // value表示生成器函数本次调用返回的值
      done: Boolean, // done表示生成器函数是否执行完毕
    }
  }
}
```

`let g = gen()`调用生成器函数创建了一个生成器对象`g`，`g`拥有上述结构的`next`方法。然后生成器对象中的`next`
方法每次调用会返回一次`{ value: VALUE, done: boolean }`的`gObject`对象。

`yield`关键字会停止函数执行并将`yield`后的值返回作为本次调用`next`的`value`进行返回。如果本次调用`g.next()`
导致生成器函数执行完毕，那么此时`done`会变成`true`表示该函数执行完毕，反之则为`false`。

**注意：当生成器函数执行完毕时，再调用`next`，`done`会变为`true`。同时因为函数不存在返回值，`value`为`undefined`。**

#### 2.7.2 Generator函数返回值

```javascript
function* gen() {
  const a = yield 'a'
  console.log(`step ${a}`)
  const b = yield 'b'
  console.log(`step ${b}`)
}

const g = gen()
g.next()
// {"value": "a", "done": false}
g.next("A")
// {"value": "b", "done": false}
g.next("B")
// {"value": undefined, "done": true}

// 控制台打印结果如下：
// step A
// step B
```

`yield`关键字会暂停函数的运行。第一次调用`next`方法，函数执行到`yield a`语句，此时函数会被暂停。第二次调用`next`
方法，生成器函数会从上一次暂停的语句继续执行。

**注意：当生成器函数恢复执行时，因为上一次执行到`const a = yield a`语句的右半段并没有给`const a`进行赋值。**

`g.next("A")`的参数`A`会作为上一次`yield a`的返回值进行执行。即调用`g.next("A")`时，将生成器函数中的`const a = yield a;`
变为`const a = A;`进行执行。所以调用`g.next("A")`会打印出`step A`。同样的，`g.next("B")`的参数`B`会被当作`yield b`
的返回值赋值给`b`变量，其打印结果为`step B`

**当使用`next`进行传参时，传入的参数会作为上一次生成器函数暂停时`yield`的返回值。第一次调用`next`
的传参是无意义的。因为此时的生成器函数并没有执行，自然也没有`yield`关键字处理。**

#### 2.7.3 Generator函数中的return

```javascript
function* gen() {
  const a = yield 'a'
  console.log(`step ${a}`)
  const b = yield 'b'
  console.log(`step ${b}`)
  return "return step"
  const c = yield 'c'
  console.log(`step ${c}`)
}

const g = gen()
g.next()
// {"value": "a", "done": false}
g.next("A")
// {"value": "b", "done": false}
g.next("B")
// {"value": "return step", "done": true}
g.next()
// {"value": undefined, "done": true}
```

生成器函数存在`return returnValue`时，在`return`前的最后一个`yield`关键字执行完毕后，生成器函数执行完毕。执行`next`
函数，会返回`{ value: returnValue, done: true }`的对象。再次执行`next`会返回`{ value: undefined, done: true }`
的对象。

本例在第三次调用`next`时生成器函数执行完毕，返回含有`returnValue`的对象。

#### 2.7.4 Generator函数异步解决方案

```javascript
function promise1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("promise1")
    }, 1000)
  })
}

function promise2(value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`promise2 => ${value}`)
    }, 1000)
  })
}

function* fn() {
  const value = yield promise1()
  console.log(`value : ${value}`)
  const result = yield promise2(value)
  console.log(`result : ${result}`)
  return result
}

function asyncGenerator(generator) {
  // 调用传入的生成器函数，返回生成器对象。期望返回一个Promise
  const g = generator()
  return new Promise((resolve) => {
    // 执行 yield promise1()，将 promise1 作为 value 返回对象
    const {value, done} = g.next()
    // promise1 等待返回值进行相应操作
    value.then((v) => {
      // 将 promise1 的返回值作为参数执行 yield promise2()，将 promise2 作为 value 返回对象
      const {value, done} = g.next(v)
      // 将 promise2 作为返回参数
      resolve(value)
    })
  })
}

asyncGenerator(fn).then((res) => {
  console.log(`res : ${res}`)
})

// 控制台打印结果
// value : promise1
// res : promise2 => promise1
```

通过`asyncGenerator`函数包裹`generator`生成器函数，结合生成器、`yield`关键字暂停特点及`Promise.then`
方法的特性可以实现类似于`async`函数的异步功能。

**看上去它和`async`很像对吧，不过目前的代码存在一个致命的问题：`asyncGenerator`函数并不具备通用性**

`fn`封装了两层`yield`处理`Promise`的方法，相同的`asyncGenerator`函数内部调用了两次`next`方法。`fn`如果封装了三层`yield`
处理`Promise`的方法，那就需要调整`asyncGenerator`函数的逻辑。再比如`fn`中存在类似`yield 'a'`的方法，使用的`then`方法会报错。

**对`asyncGenerator`代码进行优化**

```javascript
function asyncGenerator2(generator) {
  return new Promise((resolve, reject) => {
    const g = generator();

    function next(param) {
      const {done, value} = g.next(param);
      if (!done) {
        // 未完成 继续递归
        Promise.resolve(value).then((res) => {
          next(res)
        });
      } else {
        // 完成直接重置 Promise 状态
        resolve(value);
      }
    }

    next();
  });
}

asyncGenerator2(fn).then((res) => {
  console.log(`res : ${res}`)
});

// 控制台打印结果
// value : promise1
// result : promise2 => promise1
// res : promise2 => promise1
```

`asyncGenerator2`返回一个`Promise`作为函数的返回值。同时首次调用`asyncGenerator2`函数时会调用`generator()`
得到生成器对象。然后定义`next`函数，只要迭代器未完成就会在`value`的`then`方法中在此递归调用该`next`函数。

**注意：**

* `next`函数接受接收`param`参数。这是因为`Generator`处理异步时，通过`const a = yield Promise`将`Promise`的`resolve`
  参数赋值给`a`，所以需要在`then`函数中将`res`传递给`next(res)`执行并将其结果作为上次`yield`执行的返回值。
* 对`value`使用`Promise.resolve`进行包裹。这是因为需要统一调用`.then`方法进行递归传参，当`yield`后不是`Promise`
  时，需要统一当作`Promise`进行处理。
* 首次调用`next`方法时，并没有传入`param`参数。

#### 2.7.5 总结

生成器函数具有可暂停的特点，调用生成器函数后会返回一个生成器对象。
调用生成器对象的`next`方法，生成器函数会继续执行直到遇到下一个`yield`关键字。调用`next`方法会返回一个对象，其中`done`
表示生成器函数是否执行完毕,`value`表示生成器函数中本次`yield`的返回值。

同时每次调用生成器对象的`next(param)`方法时，可以传入一个参数作为上一次`yield`语句的返回值。所以`async await`
本质上还是利用`Generator`函数内部可以被暂停执行的特性结合`Promise.then`中进行递归调用从而实现`Async await`的语法糖。

## 3、HTML5相关

### 3.1 HTML5触摸事件

参考：https://developer.mozilla.org/zh-CN/docs/Web/API/Element/touchstart_event
https://www.cnblogs.com/wasbg/p/10951926.html
https://juejin.cn/post/6844903695415525383

#### 3.1.1 触摸事件基础

触摸事件组成有如下四部分：

* `touchstart`事件：在一个或多个触点与触控设备表面接触时被触发。
* `touchmove`事件：在触点于触控平面上移动时触发。
* `touchend`事件：在一个或多个触点从触控平面上移开时触发。注意，也有可能触发`touchcancel`事件。
* `touchcancel`事件：在触点被中断时触发，中断方式基于特定实现而有所不同（例如，创建了太多的触点）。

触摸事件都会冒泡，也可以取消。虽然触摸事件没有在`DOM`规范中定义，但是它们却是以兼容`DOM`的方式实现。触摸事件的`event`
对象提供了鼠标事件中的常见属性：

* `bubbles`：事件是否会沿`DOM`树向上冒泡
* `cancelable`：是否可以用`preventDefault()`方法阻止默认事件
* `clientX`：鼠标在视口内的水平坐标
* `clientY`：鼠标在视口内的垂直坐标
* `screenX`：鼠标在屏幕的水平坐标
* `screenY`：鼠标在屏幕的垂直坐标

除了常见的`DOM`属性，触摸事件还包含如下三个用于跟踪触摸的属性。

* `touches`：`touch`对象数组。表示当前与表面接触的触点（不论事件目标或状态变化）。
* `targetTouches`：`touch`对象数组。表示当前与触摸表面接触的触点，且触点起始于事件发生的目标元素。
* `changeTouches`：`touch`对象数组。表示在前一个`touch`事件和当前的事件之间，状态发生变化的独立触点。

`touch`对象属性

* `identifier`：`touch`对象的唯一标识符
* `screenX`：触点相对于屏幕上边缘的`X`坐标
* `screenY`：触点相对于屏幕上边缘的`Y`坐标
* `clientX`：触点相对于可见视区左边缘的`X`坐标。不包括任何滚动偏移。
* `clientY`：触点相对于可见视区左边缘的`Y`坐标。不包括任何滚动偏移。
* `pageX`：触点相对于`HTML`文档左边缘的`X`坐标。当存在水平滚动的偏移时，这个值包含了水平滚动的偏移。
* `pageY`：触点相对于`HTML`文档左边缘的`Y`坐标。当存在水平滚动的偏移时，这个值包含了水平滚动的偏移。
* `target`：返回触摸点最初接触的`Element` ，即使触摸点已经移出那个元素的交互区域。
  **注意：如果这个元素在触摸过程中被移除，这个事件仍然会指向它，因此这个事件也不会冒泡到`window`或`document`对象。**

#### 3.1.2 使用场景示例

实现左滑带出删除按钮，监听长按事件并向上冒泡事件

```vue

<template>
  <div>
    <div ref="wrap" class="wrap" @touchstart="touchStart">
      <div class="wrapDelete">{{"删除"}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        longPress: null,
        pressTime: 0,
      };
    },
    methods: {
      touchStart(event) {
        clearTimeout(this.longPress);
        this.pressTime = 0;
        this.longPress = setTimeout(() => {
          this.pressTime = 1000;
        }, 1000);
        const startPos = {
          x: event.targetTouches[0]?.pageX ?? 0,
          y: event.targetTouches[0]?.pageY ?? 0,
        };
        const move = (e) => {
          const touches = e.targetTouches;
          if (touches.length === 1) {
            const movePos = {
              x: e.targetTouches[0]?.pageX ?? 0,
              y: e.targetTouches[0]?.pageY ?? 0,
            };
            const xDis = movePos.x - startPos.x;
            if (Math.abs(xDis) > 50) {
              if (xDis < 0) {
                this.$refs.wrap.style.transform = "translate(-20%,0)";
              } else {
                this.$refs.wrap.style.transform = "translate(0,0)";
              }
            }
          }
        };
        const stop = () => {
          clearTimeout(this.longPress);
          if (this.pressTime === 1000) {
            // 长按事件向上冒泡事件
            this.$emit("longPressEmits");
          }
          document.removeEventListener("touchmove", move);
          document.removeEventListener("touchend", stop);
        };
        document.addEventListener("touchmove", move);
        document.addEventListener("touchend", stop);
      }
    },
  }
</script>

<style scoped lang="scss">
  .wrap {
    position: relative;

    .sealDelete {
      width: 15%;
      position: absolute;
      top: 15%;
      right: -20%;
      text-align: center;
      color: #FFFFFF;
      background-color: red;
    }
  }
</style>
```

### 3.2 IntersectionObserver使用

参考：https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/IntersectionObserver
https://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html
https://juejin.cn/post/6844903874302574599

#### 3.2.1 IntersectionObserver基础

`IntersectionObserver`接口（从属于`Intersection Observer API`）提供了一种**异步**
观察目标元素与其祖先元素或顶级文档视口（`viewport`）交叉状态的方法。其祖先元素或视口被称为根（`root`）。

当一个`IntersectionObserver`对象被创建时，其被配置为监听根中一段给定比例的可见区域。一旦`IntersectionObserver`
被创建，则无法更改其配置，所以一个给定的观察者对象只能用来监听可见区域的特定变化值；然而，你可以在同一个观察者对象中配置监听多个目标元素。

**语法**

```javascript
const observer = new IntersectionObserver(callback, options);
```

**参数**

`callback`：当元素可见比例超过指定阈值后，会调用一个回调函数，此回调函数接受两个参数：

* `entries`：一个`IntersectionObserverEntry`对象的数组，每个被触发的阈值，都跟指定阈值有或多或少的偏差。
* `observer`：被调用的`IntersectionObserver`实例。

`options`（可选项）：一个可以用来配置`observer`实例的对象。如果`options`未指定，`observer`实例默认使用文档视口作为`root`
，并且没有`margin`，阈值为0%（即一像素的改变都会触发回调函数）。你可以指定以下配置：

* `root`：监听元素的祖先元素`Element`
  对象，其边界盒将被视作视口。目标在根的可见区域的任何不可见部分都会被视为不可见。如果构造函数未传入`root`或其值为`null`
  ，则默认使用顶级文档的视口。
* `rootMargin`：在计算与根节点交叉值的一组偏移量，可以缩小/扩大判定范围从而满足计算需要。语法大致和`CSS`中的`margin`
  属性等同;默认值是`0px 0px 0px 0px`。
* `threshold`：规定的监听目标与边界盒交叉区域的比例值，可以是具体数值或是`0`到`1`之间的数组。若指定值为`0`
  则监听元素即使与根有`1`像素交叉，也被视为可见。若指定值为`1`，则整个元素都在可见范围内时才算可见。阈值的默认值为`0`。

**返回值**

可以使用阈值监听目标元素可见部分与`root`交叉状况的新的`IntersectionObserver`实例。调用自身的observe() 方法开始使用规定的阈值监听指定目标。

**实例方法**

```javascript
IntersectionObserver.disconnect()
// 使 IntersectionObserver 对象停止监听目标。
IntersectionObserver.observe()
// 使 IntersectionObserver 开始监听一个目标元素。
IntersectionObserver.takeRecords()
// 返回所有观察目标的 IntersectionObserverEntry 对象数组。
IntersectionObserver.unobserve()
// 使 IntersectionObserver 停止监听特定目标元素。
```

#### 3.2.2 IntersectionObserverEntry对象

`IntersectionObserverEntry`描述了目标元素与根元素容器在某一特定过渡时刻的交叉状态。其实例对象作为`entries`
参数被传递到一个`IntersectionObserver`的回调函数中;这些对象只能通过调用`IntersectionObserver.takeRecords()`来获取。

**属性**

* `boundingClientRect`：返回一个`DOMRectReadOnly`用来描述包含目标元素的边界信息，
  计算方式与`Element.getBoundingClientRect()`相同。
* `intersectionRatio`：返回`intersectionRect`与`boundingClientRect`的比例值。
* `intersectionRect`：返回一个`DOMRectReadOnly`用来描述根和目标元素的相交区域。
* `isIntersecting`：如果目标元素与交叉区域观察者对象的根相交，返回`true`，否则返回`false`。
* `isVisible`：实验性属性，暂时不与记录
* `rootBounds`：返回一个`DOMRectReadOnly`用来描述根元素的边界信息。
* `target`：与根出现相交区域改变的元素
* `time`：可见性发生变化的时间，是一个高精度时间戳，单位为毫秒

![3.2.1.png](assets/3.2/1.png)

上图中，灰色的水平方框代表视口，深红色的区域代表四个被观察的目标元素。它们各自的`intersectionRatio`图中都已经注明。

#### 3.2.3 使用场景示例

##### 3.2.3.1 惰性加载（lazy load）

有时，我们希望某些静态资源（比如图片），只有用户向下滚动，它们进入视口时才加载，这样可以节省带宽，提高网页性能。这就叫做“惰性加载”。

```javascript
// 图片懒加载
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src
      // 图片加载后，停止监听元素
      observer.unobserve(entry.target)
    }
  });
}, {
  root: document.querySelector(".root")
});

Array.from(document.querySelectorAll("img")).forEach((img) => {
  observer.observe(img);
});
```

##### 3.2.3.2 无限滚动

无限滚动时，在页面底部添加页尾栏（又称边界哨兵）。页尾栏可见表示用户到达了页面底部，从而加载新的条目放在页尾栏前面。这样做的好处是，不需要再一次调用`observe()`
方法，现有的`IntersectionObserver`可以保持使用。

```javascript
// 无限滚动
const observer = new IntersectionObserver((entries) => {
  if (entries[0].intersectionRatio > 0) {
    loadItem(10)
    console.log("load new item")
  }
});

observer.observe(document.querySelector(".scrollerFooter"));
```

### 3.3 Canvas学习

参考：https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Basic_usage

#### 3.3.1 Canvas基本用法

除一些过时的浏览器不支持`<canvas>`元素外，所有的新版本主流浏览器都支持它。`canvas`的默认大小为`300`像素×`150`
像素。可以使用高度和宽度属性来自定义`canvas`的尺寸。为了在`canvas`上绘制图形，需要使用上下文对象，它能动态创建图像。

##### 3.3.1.1 Canvas元素

```html

<canvas width="150" height="150"></canvas>
```

`<canvas>`元素有`width`、`height`、`mozOpaque`（非标准）和`mozPrintCallback`
（非标准）属性。这些都是可选的，并且同样利用`DOM properties` 来设置。当没有设置宽度和高度的时候，`canvas`
会初始化为`300 X 150`像素。该元素可以使用`CSS`来定义大小，但在绘制时图像会伸缩以适应它的框架尺寸：如果`CSS`
的尺寸与初始画布的比例不一致，它会出现扭曲。

**备注：如果你绘制出来的图像是扭曲的，尝试用`width`和`height`属性为`<canvas>`明确规定宽高，而不是使用`CSS`。**

`<canvas>`元素可以像任何一个普通的图像一样（有`margin`，`border`，`background`等属性）被设计。然而，这些样式不会影响在`canvas`
中的实际图像。若开始时没有为`canvas`规定样式规则，其将会完全透明。

`<canvas>`很容易定义一些替代内容。在一些较老的浏览器（IE9及以下）或者不支持`canvas`的文本浏览器上总是展示替代内容。

```html
<!--
    不支持<canvas>的浏览器将会忽略容器并在其中渲染后备内容。
    而支持<canvas>的浏览器将会忽略在容器中包含的内容，并且只是正常渲染canvas。
-->
<canvas id="draw" width="150" height="150">
  Not supporting canvas
</canvas>

<canvas id="clock" width="150" height="150">
  <img src="images/clock.png" width="150" height="150" alt=""/>
</canvas>
```

**注意：`<canvas>` 元素需要结束标签`</canvas>`。如果结束标签不存在，则文档的其余部分会被认为是替代内容，将不会显示出来。**

##### 3.3.1.2 渲染上下文（The rendering context）

`<canvas>`元素创造了一个固定大小的画布，它公开了一个或多个渲染上下文，其可以用来绘制和处理要展示的内容。我们将会将注意力放在
`2D`渲染上下文中。其他种类的上下文也许提供了不同种类的渲染方式；比如，`WebGL`使用了基于`OpenGL ES`的`3D`上下文。

`canvas`起初是空白的。为了展示，首先脚本需要找到渲染上下文，然后在它的上面绘制。`<canvas>`元素有`getContext()`
的方法用来获得渲染上下文和它的绘画功能。`getContext()`接受一个参数，即上下文的类型。

```javascript
const canvas = document.getElementById("draw");
// 检查支持性
if (canvas.getContext) {
  const ctx = canvas.getContext("2d");
  // drawing code here
} else {
  // canvas-unsupported code here
}
```

#### 3.3.2 使用Canvas来绘制图形

##### 3.3.2.1 栅格（canvas grid）

![3.3.1.png](assets/3.3/1.png)

如上图所示，`canvas`元素默认被网格所覆盖。网格中的一个单元相当于`canvas`
元素中的一像素。栅格的起点为左上角（坐标为（0,0））。蓝色方形左上角距离左边（X轴）x像素，距离上边（Y轴）y像素（坐标为（x,y））。

##### 3.3.2.2 绘制矩形

`<canvas>`元素只支持两种形式的图形绘制：矩形和路径（由一系列点连成的线段）。所有其他类型的图形都是通过一条或者多条路径组合而成的。

`canvas`提供了三种方法绘制矩形：

```javascript
fillRect(x, y, width, height)
// 绘制一个填充的矩形
strokeRect(x, y, width, height)
// 绘制一个矩形的边框
clearRect(x, y, width, height)
// 清除指定矩形区域，让清除部分完全透明。
// 上述方法的参数相同。x与y指定了在canvas画布上所绘制的矩形的左上角（相对于原点）的坐标。width和 height设置矩形的尺寸。
```

**示例**

```javascript
function draw() {
  const canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    ctx.fillRect(25, 25, 100, 100);
    // fillRect()函数绘制了一个边长为 100 的黑色正方形
    ctx.clearRect(45, 45, 60, 60);
    // clearRect()函数从正方形的中心开始擦除了一个 60*60 的正方形，
    ctx.strokeRect(50, 50, 50, 50);
    // strokeRect()在清除区域内生成一个 50*50 的正方形边框。
  }
}
```

![3.3.2.png](assets/3.3/2.png)

##### 3.3.2.3 绘制路径

图形的基本元素是路径。路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。一个路径，甚至一个子路径，都是闭合的。使用路径绘制图形需要一些额外的步骤。

```text
1、首先，你需要创建路径起始点。
2、然后你使用画图命令去画出路径。
3、之后你把路径封闭。
4、一旦路径生成，你就能通过描边或填充路径区域来渲染图形。
```

以下是所要用到的函数：

```javascript
beginPath()
// 新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
closePath()
// 闭合路径之后图形绘制命令又重新指向到上下文中。
stroke()
// 通过线条来绘制图形轮廓。
fill()
// 通过填充路径的内容区域生成实心的图形。
```

第一步，调用`beginPath()`
。本质上，路径是由很多子路径构成，这些子路径都是在一个列表中，所有的子路径（线、弧形等）构成图形。调用`beginPath()`
后会清空重置列表，然后我们就可以重新绘制新的图形。

**备注：当前路径为空，即调用`beginPath()`之后，或者`canvas`刚建的时候，第一条路径构造命令通常被视为是`moveTo()`
，无论实际上是什么。出于这个原因，你几乎总是要在设置路径之后专门指定你的起始位置。**

第二步，调用函数指定绘制路径。

第三步，闭合路径`closePath()`（非必需）。这个方法会通过绘制一条从当前点到开始点的直线来闭合图形。如果图形是已经闭合了的，即当前点为开始点，该函数什么也不做。

**备注：当你调用`fill()`函数时，所有没有闭合的形状都会自动闭合，所以你不需要调用`closePath()`函数。但是调用`stroke()`
时不会自动闭合。**

###### 3.3.2.3.1 绘制一个三角形

```javascript
function draw() {
  const canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(75, 50);
    // 移动到(75, 50)（三角形左顶点）
    ctx.lineTo(100, 75);
    // 移动并连接到(100, 75)（三角形下顶点）
    ctx.lineTo(100, 25);
    // 移动并连接到(100, 25)（三角形上顶点）
    ctx.fill();
    // 填充路径区域生成实心的三角形
  }
}
```

![3.3.3.png](assets/3.3/3.png)

###### 3.3.2.3.2 移动笔触

```javascript
moveTo(x, y)
// 将笔触移动到指定的坐标(x, y)上。
```

当`canvas`初始化或`beginPath()`调用后，通常会使用`moveTo()`函数设置起点。我们也能够使用`moveTo()`
绘制一些不连续的路径。例如下面的笑脸示例。

**注意：`moveTo()`并不能画出任何东西**

```javascript
function draw() {
  const canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(75, 75, 50, 0, Math.PI * 2, true);
    // 绘制脸的圆（逆时针）
    ctx.moveTo(110, 75);
    ctx.arc(75, 75, 35, 0, Math.PI, false);
    // 绘制口的半圆（顺时针）
    ctx.moveTo(65, 65);
    ctx.arc(60, 65, 5, 0, Math.PI * 2, true);
    // 绘制左眼
    ctx.moveTo(95, 65);
    ctx.arc(90, 65, 5, 0, Math.PI * 2, true);
    // 绘制右眼
    ctx.stroke();
    // 绘制路径（不调用的话，并不会真正的绘制图形）
  }
}
```

![3.3.4.png](assets/3.3/4.png)

###### 3.3.2.3.3 线

绘制直线，需要用到的方法`lineTo()`。

```javascript
lineTo(x, y)
// 绘制一条从当前位置到指定(x, y)位置的直线。
```

该方法有两个参数：x和y，代表坐标系中直线结束的点。开始点和之前绘制的路径有关，之前的结束点作为接下来的开始点。开始点也可以通过`moveTo()`
函数改变。

```javascript
function draw() {
  const canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    // 填充三角形
    ctx.beginPath();
    ctx.moveTo(25, 25);
    ctx.lineTo(105, 25);
    ctx.lineTo(25, 105);
    ctx.fill();
    // 描边三角形
    ctx.beginPath();
    ctx.moveTo(125, 125);
    ctx.lineTo(125, 45);
    ctx.lineTo(45, 125);
    ctx.closePath();
    ctx.stroke();
  }
}
```

**注意：因为路径使用填充`fill`时，路径自动闭合。而使用描边`stroke`不会闭合路径。如果不使用`closePath()`
闭合路径，则只绘制了两条线段，并不是一个完整的三角形。**

![3.3.5.png](assets/3.3/5.png)

###### 3.3.2.3.4 圆弧

绘制圆弧或者圆，可以使用`arc()`方法。也可以使用`arcTo()`，不过这个的实现并不是那么的可靠，所以我们这里不作介绍。

```javascript
arc(x, y, radius, startAngle, endAngle, anticlockwise = false)
// 画一个以（x,y）为圆心的以 radius 为半径的圆弧（圆），角度从 startAngle 开始到 endAngle 结束，按照 anticlockwise 给定的方向（默认为顺时针）来生成。
// 该方法有六个参数：
// x,y为绘制圆弧所在圆上的圆心坐标。radius为半径。
// startAngle以及endAngle参数用弧度定义了开始以及结束的弧度。这些都是以 x 轴为基准。
// 参数anticlockwise为一个布尔值。为 true 时，是逆时针方向，否则顺时针方向。

arcTo(x1, y1, x2, y2, radius)
// 根据给定的控制点和半径画一段圆弧，再以直线连接两个控制点。
```

**备注：`arc()`函数中表示角的单位是弧度，不是角度。角度与弧度的`js`表达式：弧度=(`Math.PI/180`) X 角度。**

```javascript
function draw() {
  const canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        ctx.beginPath();
        const x = 25 + j * 50; // x 坐标值
        const y = 25 + i * 50; // y 坐标值
        const radius = 20; // 圆弧半径
        const startAngle = 0; // 开始点
        const endAngle = Math.PI + (Math.PI * j) / 2; // 结束点
        const anticlockwise = i % 2 == 0 ? false : true; // 顺时针或逆时针
        ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        if (i > 1) {
          ctx.fill();
        } else {
          ctx.stroke();
        }
      }
    }
  }
}
```

![3.3.6.png](assets/3.3/6.png)

###### 3.3.2.3.5 二次贝塞尔曲线及三次贝塞尔曲线

二次及三次贝塞尔曲线都十分有用，一般用来绘制复杂有规律的图形。

```javascript
quadraticCurveTo(cp1x, cp1y, x, y)
// 绘制二次贝塞尔曲线，cp1x,cp1y 为一个控制点，x,y 为结束点。
bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
// 绘制三次贝塞尔曲线，cp1x,cp1y为控制点一，cp2x,cp2y为控制点二，x,y为结束点。
```

下图能够很好地描述两者的关系，二次贝塞尔曲线有一个开始点（蓝色）、一个结束点（蓝色）以及一个控制点（红色），而三次贝塞尔曲线有两个控制点。

![3.3.7.png](assets/3.3/7.png)

参数x、y在这两个方法中都是结束点坐标。cp1x,cp1y为坐标中的第一个控制点，cp2x,cp2y为坐标中的第二个控制点。

使用二次以及三次贝塞尔曲线是有一定的难度的，因为不同于像`Adobe Illustrators`
这样的矢量软件，我们所绘制的曲线没有给我们提供直接的视觉反馈。这让绘制复杂的图形变得十分困难。

```javascript
// 使用二次贝塞尔曲线来渲染对话气泡。
function draw() {
  const canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    // 二次贝塞尔曲线
    ctx.beginPath();
    ctx.moveTo(75, 25); // 上中点
    ctx.quadraticCurveTo(25, 25, 25, 62.5); // 左中点
    ctx.quadraticCurveTo(25, 100, 50, 100); // 话柄左上顶点
    ctx.quadraticCurveTo(50, 120, 30, 125); // 话柄左下顶点
    ctx.quadraticCurveTo(60, 120, 65, 100); // 话柄右上顶点
    ctx.quadraticCurveTo(125, 100, 125, 62.5); // 右中点
    ctx.quadraticCurveTo(125, 25, 75, 25); // 上中点
    ctx.stroke();
  }
}
```

![3.3.8.png](assets/3.3/8.png)

```javascript
// 使用三次贝塞尔曲线绘制心形。
function draw() {
  const canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    //三次贝塞尔曲线
    ctx.beginPath();
    ctx.moveTo(75, 40); // 心上中点
    ctx.bezierCurveTo(75, 37, 70, 25, 50, 25); // 左半心上中点
    ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5); // 左半心左中点
    ctx.bezierCurveTo(20, 80, 40, 102, 75, 120); // 心下中点
    ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5); // 右半心右中点
    ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25); // 右半心上中点
    ctx.bezierCurveTo(85, 25, 75, 37, 75, 40); // 心上中点
    ctx.fill();
  }
}
```

![3.3.9.png](assets/3.3/9.png)

###### 3.3.2.3.6 矩形

除了直接在画布上绘制矩形的三个方法，还有`rect()`方法，将一个矩形路径增加到当前路径上。

```javascript
rect(x, y, width, height)
// 绘制一个左上角坐标为（x,y），宽高为 width 以及 height 的矩形。
```

当该方法执行的时候，`moveTo()`方法自动设置坐标参数`(0,0)`。也就是说，当前笔触自动重置回默认坐标。

###### 3.3.2.3.7 组合使用

```html
<!-- 因为宽高只有150px所以看不到最外两层矩形的下，右边框 -->
<canvas id="canvas" width="150" height="150"></canvas>
```

```javascript
// 封装的一个用于绘制圆角矩形的函数。
function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x, y + radius); // 矩形左上直线开始点
  ctx.lineTo(x, y + height - radius);  // 矩形左下直线结束点
  ctx.quadraticCurveTo(x, y + height, x + radius, y + height); // 矩形左下圆弧（到下左直线开始点）
  ctx.lineTo(x + width - radius, y + height); // 矩形下右直线结束点
  ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius); // 矩形右下圆弧（到右下直线开始点）
  ctx.lineTo(x + width, y + radius); // 矩形右上直线结束点
  ctx.quadraticCurveTo(x + width, y, x + width - radius, y); // 矩形右上圆弧（到上右直线开始点）
  ctx.lineTo(x + radius, y);  // 矩形上左直线结束点
  ctx.quadraticCurveTo(x, y, x, y + radius); // 矩形左上圆弧（到左上直线开始点）
  ctx.stroke();
}

function draw() {
  const canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    roundedRect(ctx, 12, 12, 150, 150, 15);
    roundedRect(ctx, 19, 19, 150, 150, 9);
    roundedRect(ctx, 53, 53, 49, 33, 10);
    roundedRect(ctx, 53, 119, 49, 16, 6);
    roundedRect(ctx, 135, 53, 49, 33, 10);
    roundedRect(ctx, 135, 119, 25, 49, 10);

    ctx.beginPath();
    ctx.arc(37, 37, 13, Math.PI / 7, -Math.PI / 7, false);
    ctx.lineTo(31, 37);
    ctx.fill(); // 左上小人

    for (let i = 0; i < 8; i++) {
      ctx.fillRect(51 + i * 16, 35, 4, 4); // 第一行小点
    }

    for (i = 0; i < 6; i++) {
      ctx.fillRect(115, 51 + i * 16, 4, 4);  // 第一列小点
    }

    for (i = 0; i < 8; i++) {
      ctx.fillRect(51 + i * 16, 99, 4, 4); // 第二行小点
    }

    ctx.beginPath();
    ctx.moveTo(83, 116);
    ctx.lineTo(83, 102);
    ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
    ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
    ctx.lineTo(111, 116);
    ctx.lineTo(106.333, 111.333);
    ctx.lineTo(101.666, 116);
    ctx.lineTo(97, 111.333);
    ctx.lineTo(92.333, 116);
    ctx.lineTo(87.666, 111.333);
    ctx.lineTo(83, 116);
    ctx.fill(); // 第二行小人整体

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(91, 96);
    ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
    ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
    ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
    ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
    ctx.moveTo(103, 96);
    ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
    ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
    ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
    ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
    ctx.fill(); // 第二行小人眼球

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
    ctx.fill(); // 第二行小人黑眼仁

    ctx.beginPath();
    ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
    ctx.fill(); // 第二行小人黑眼仁
  }
}
```

![3.3.10.png](assets/3.3/10.png)

##### 3.3.2.4 Path2D对象

根据之前例子，你可以用一系列的路径和绘画命令将对象画在画布上。为了简化代码和提高性能，`Path2D`
对象已可以在较新版本的浏览器中使用，用来缓存或记录绘画命令，这样你将能快速地回顾路径。

`Path2D()`会返回一个新初始化的`Path2D`对象（可能将某一个路径作为变量——创建一个它的副本，或将一个包含`SVG path`
数据的字符串作为变量）。

```javascript
new Path2D(); // 空的 Path 对象
new Path2D(path); // 克隆 Path 对象
new Path2D(d); // 从 SVG 建立 Path 对象
```

所有的路径方法比如`moveTo`,`rect`,`arc`或`quadraticCurveTo`等，如我们前面见过的，都可以在`Path2D`中使用。

`Path2D API`添加了`addPath`作为将`path`结合起来的方法。当你想要从几个元素中来创建对象时，可以使用如下代码：

```javascript
Path2D.addPath(path, transform)
// 添加了一条路径到当前路径（可能添加了一个变换矩阵）。
```

**示例**

随着`Path2D API`的产生，可以使用带路径参数（使用`Path2D`对象而不是当前路径）的`stroke`和`fill`方法将对象画在画布上。

```javascript
function draw() {
  const canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    const rectangle = new Path2D();
    rectangle.rect(10, 10, 50, 50);
    const circle = new Path2D();
    circle.moveTo(125, 35);
    circle.arc(100, 35, 25, 0, 2 * Math.PI);
    ctx.stroke(rectangle);
    ctx.fill(circle);
  }
}
```

![3.3.11.png](assets/3.3/11.png)

使用`SVG paths`

新的`Path2D API`可以使用`SVG path data`来初始化`canvas`上的路径。这意味着你在获取路径时可以用`SVG`或`canvas`的方式来重用它们。

这条路径将先移动到`(10,10)`位置`(M10 10)`然后再水平移动`80`个单位`(h 80)`，然后下移`80`个单位`(v 80)`，接着左移`80`
个单位`(h -80)`，再回到起点处`(Z)`。你可以在Path2D constructor 查看这个例子。

```javascript
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const p = new Path2D("M10 10 h 80 v 80 h -80 Z");
ctx.fill(p);
```

![3.3.12.png](assets/3.3/12.png)

#### 3.3.3 应用样式和色彩

##### 3.3.3.1 色彩

```javascript
fillStyle = color
// 设置图形的填充颜色。
strokeStyle = color
// 设置图形轮廓的颜色。
// color可以是表示CSS颜色值的字符串，渐变对象或者图案对象。默认情况下，线条和填充颜色都是黑色（即#000000）。
```

**备注：一旦你设置了`strokeStyle`或者`fillStyle`的值，那么这个新值就会成为新绘制的图形的默认值。如果你要给每个图形上不同的颜色，你需要重新设置
`fillStyle`或`strokeStyle`的值。**

```javascript
// 这些 fillStyle 的值均为橙色
ctx.fillStyle = "orange";
ctx.fillStyle = "#FFA500";
ctx.fillStyle = "rgb(255,165,0)";
ctx.fillStyle = "rgba(255,165,0,1)";
```

**`fillStyle`示例**

```javascript
function draw() {
  // 绘制方格颜色阵列
  const ctx = document.getElementById("canvas").getContext("2d");
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      ctx.fillStyle = `rgb(${Math.floor(255 - 42.5 * i)},
        ${Math.floor(255 - 42.5 * j)}, 0)`;
      ctx.fillRect(j * 25, i * 25, 25, 25);
    }
  }
}
```

**`strokeStyle`示例**

```javascript
function draw() {
  // 绘制方格颜色阵列
  const ctx = document.getElementById("canvas").getContext("2d");
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      ctx.fillStyle = `rgb(${Math.floor(255 - 42.5 * i)},
        ${Math.floor(255 - 42.5 * j)}, 0)`;
      ctx.arc(12.5 + j * 25, 12.5 + i * 25, 10, 0, Math.PI * 2, true);
      ctx.stroke();
    }
  }
}
```

![3.3.14.png](assets/3.3/14.png)

##### 3.3.3.2 透明度

除了可以绘制实色图形，我们还可以用`canvas`来绘制半透明的图形。通过设置`globalAlpha`属性或者使用一个半透明颜色作为轮廓或填充的样式。

```javascript
globalAlpha = transparencyValue
// 这个属性影响到 canvas 里所有图形的透明度，有效的值范围是 0.0（完全透明）到 1.0（完全不透明），默认是 1.0。
```

`globalAlpha`属性在需要绘制大量拥有相同透明度的图形时候相当高效。不过，我认为下面的方法可操作性更强一点。

因为`strokeStyle`和`fillStyle`属性接受符合`CSS3`规范的颜色值，那我们可以用下面的写法来设置具有透明度的颜色。

```javascript
// 指定透明颜色，用于描边和填充样式
ctx.strokeStyle = "rgba(255,0,0,0.5)";
ctx.fillStyle = "rgba(255,0,0,0.5)";
```

**`globalAlpha`示例**

```javascript
function draw() {
  const ctx = document.getElementById("canvas").getContext("2d");
  // 画背景
  ctx.fillStyle = "#FD0";
  ctx.fillRect(0, 0, 75, 75);
  ctx.fillStyle = "#6C0";
  ctx.fillRect(75, 0, 75, 75);
  ctx.fillStyle = "#09F";
  ctx.fillRect(0, 75, 75, 75);
  ctx.fillStyle = "#F30";
  ctx.fillRect(75, 75, 75, 75);
  ctx.fillStyle = "#FFF";
  // 设置透明度值
  ctx.globalAlpha = 0.2;
  // 画半透明圆
  for (let i = 0; i < 7; i++) {
    ctx.beginPath();
    ctx.arc(75, 75, 10 + 10 * i, 0, Math.PI * 2, true);
    ctx.fill();
  }
}
```

![3.3.15.png](assets/3.3/15.png)

**`rgba`示例**

```javascript
function draw() {
  const ctx = document.getElementById("canvas").getContext("2d");
  // 画背景
  ctx.fillStyle = "rgb(255,221,0)";
  ctx.fillRect(0, 0, 150, 37.5);
  ctx.fillStyle = "rgb(102,204,0)";
  ctx.fillRect(0, 37.5, 150, 37.5);
  ctx.fillStyle = "rgb(0,153,255)";
  ctx.fillRect(0, 75, 150, 37.5);
  ctx.fillStyle = "rgb(255,51,0)";
  ctx.fillRect(0, 112.5, 150, 37.5);
  // 画半透明矩形
  for (let i = 0; i < 10; i++) {
    ctx.fillStyle = "rgba(255,255,255," + (i + 1) / 10 + ")";
    for (let j = 0; j < 4; j++) {
      ctx.fillRect(5 + i * 14, 5 + j * 37.5, 14, 27.5);
    }
  }
}
```

![3.3.15.png](assets/3.3/15.png)

##### 3.3.3.3 线型

可以通过一系列属性来设置线的样式。

```javascript
lineWidth = value
// 设置线条宽度。
lineCap = type
// 设置线条末端样式。
lineJoin = type
// 设定线条与线条间接合处的样式。
miterLimit = value
// 限制当两条线相交时交接处最大长度；所谓交接处长度（斜接长度）是指线条交接处内角顶点到外角顶点的长度。
getLineDash()
// 返回一个包含当前虚线样式，长度为非负偶数的数组。
setLineDash(segments)
// 设置当前虚线样式。例如：[10, 20]
lineDashOffset = value
// 设置虚线样式的起始偏移量。
```

**`lineWidth`示例**

设置当前绘线的粗细。属性值必须为正数。默认值是`1.0`。

线宽是指给定路径的中心到两边的粗细。**换句话说就是在路径的两边各绘制线宽的一半。**
因为画布的坐标并不和像素直接对应，当需要获得精确的水平或垂直线的时候要特别注意。

下例中，用递增的宽度绘制了`10`条直线。最左边的线宽`1.0`单位。**所有宽度为奇数的线并不能精确呈现，这就是因为路径的定位问题。**

```javascript
function draw() {
  const ctx = document.getElementById("canvas").getContext("2d");
  for (let i = 0; i < 10; i++) {
    ctx.lineWidth = 1 + i;
    ctx.beginPath();
    ctx.moveTo(5 + i * 14, 5);
    ctx.lineTo(5 + i * 14, 140);
    ctx.stroke();
  }
}
```

![3.3.17.png](assets/3.3/17.png)

**想要获得精确的线条，必须对线条是如何描绘出来的有所理解。**

如下图，用网格代表`canvas`的坐标格，每一格对应屏幕上一个像素点。如图一所示，填充了`(2,1)`至`(5,5)`
的矩形，整个区域的边界刚好落在像素边缘上，这样就可以得到有着清晰边缘的矩形。

如果你想绘制一条从`(3,1)`到`(3,5)`，宽为`1.0`的线条，其效果如图二所示。
实际填充区域（深蓝色部分）会在路径两边各延伸半像素。而这半个像素又是以近似的方式进行渲染，这意味着那些像素只是部分着色，结果就是以实际笔触颜色一半色调的颜色来填充整个区域（浅蓝和深蓝的部分）。这就是上例中为何宽度为`1.0`
的线并不准确的原因。

要解决这个问题，必须对路径施加更精确地控制。已知宽为`1.0`的线条会在路径两边各延伸半像素，按图三的方式绘制从`(3.5,1)`
到`(3.5,5)`，宽为`1.0`的线条，其边缘正好落在像素边界，填充出来就是准确的宽为`1.0`的线条。

![3.3.18.png](assets/3.3/18.png)

**备注： 图三中，其`Y`坐标刚好落在网格线上。若非如此则会出现渲染半个像素的情况（注意：这种现象受到当前`lineCap`（默认为`butt`
）的影响；将`lineCap`设置为`square`，可以得到宽为奇数宽度一半像素的笔画；因此，端点的外轮廓会自动延伸并完全覆盖整个像素格）。**

**注意，只有起点和终点受此影响：若路径使用`closePath()`封闭，它是没有起点和终点的；
其他情况下，路径上的所有端点都与上一个点相连，下一段路径使用当前的`lineJoin`设置（默认为`miter`
），若连接处是水平/垂直及相交的情况，会导致连接处的外轮廓根据相交点自动延伸，因此渲染出的路径轮廓会覆盖整个像素格。**

对于宽为偶数的线条，路径两边的像素数都是整数，那么你想要其路径是落在像素点之间（比如从`(3,1)`到`(3,5)`
）而不是在像素点的中间。同样，注意图三的垂直线条，其`Y`坐标刚好落在网格线上。若非如此，端点同样会出现渲染半个像素的情况。

**尽早地注意到像素网格与路径位置之间的关系，可以尽可能保证图形在经过缩放或者其他变形后都能保持较好的视觉效果：宽为`1.0`
的垂线在放大`2`倍后，会变成清晰的宽为`2.0`并且坐标刚好落在网格线上，不会出现渲染半个像素的情况。**

**`lineCap`示例**

`lineCap`决定了线段端点显示的样子。属性值如下：

* `butt`（默认值）：线条末端呈正方形。
* `round`：线条末端呈圆形的。
* `square`：线条末端呈方形，通过添加一个宽与线宽相同且高为线宽一半的盒子实现。

```javascript
function draw() {
  const ctx = document.getElementById("canvas").getContext("2d");
  const lineCap = ["butt", "round", "square"];
  // 创建路径
  ctx.strokeStyle = "#09f";
  ctx.beginPath();
  ctx.moveTo(10, 10);
  ctx.lineTo(140, 10);
  ctx.moveTo(10, 140);
  ctx.lineTo(140, 140);
  ctx.stroke();
  // 画线条
  ctx.strokeStyle = "black";
  for (let i = 0; i < lineCap.length; i++) {
    ctx.lineWidth = 15;
    ctx.lineCap = lineCap[i];
    ctx.beginPath();
    ctx.moveTo(25 + i * 50, 10);
    ctx.lineTo(25 + i * 50, 140);
    ctx.stroke();
  }
}
```

![3.3.19.png](assets/3.3/19.png)

**`lineJoin`示例**

`lineJoin`决定了两线段连接处所显示的样子。属性值如下：

* `round`：通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。圆角的半径是线段的宽度。
* `bevel`：在相连部分的末端填充一个额外的以三角形为底的区域，每个部分都有各自独立的矩形拐角。
* `miter`（默认值）：通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域。这个设置受到`miterLimit`属性的影响。

```javascript
function draw() {
  const ctx = document.getElementById("canvas").getContext("2d");
  const lineJoin = ["round", "bevel", "miter"];
  ctx.lineWidth = 10;
  for (let i = 0; i < lineJoin.length; i++) {
    ctx.lineJoin = lineJoin[i];
    ctx.beginPath();
    ctx.moveTo(-5, 5 + i * 40);
    ctx.lineTo(35, 45 + i * 40);
    ctx.lineTo(75, 5 + i * 40);
    ctx.lineTo(115, 45 + i * 40);
    ctx.lineTo(155, 5 + i * 40);
    ctx.stroke();
  }
}
```

![3.3.20.png](assets/3.3/20.png)

**`miterLimit`示例**

如上例所示，使用`miter`效果，线段的外侧边缘会被延伸交汇于一点上。线段之间夹角比较大时，交点不会太远，但随着夹角变小，交点距离会呈指数级增大。

`miterLimit`属性就是用来设定外延交点与连接点的最大距离，如果交点距离大于此值，连接效果会变成了`bevel`
。**注意，最大斜接长度（即交点距离）是当前坐标系测量线宽与此`miterLimit`属性值（`canvas`默认为`10.0`）的乘积，所以`miterLimit`
可以单独设置，不受显示比例改变或任何仿射变换的影响：它只影响线条边缘的有效绘制形状。**

更准确的说，斜接限定值`miterLimit`是延伸长度与线宽一半的最大允许比值。它也可以被等效定义为线条内外连接点距离`miterLength`
与线宽`lineWidth`的最大允许比值（因为路径点是内外连接点的中点）。这等同于相交线段最小内夹角`θ`
的一半的余割值，小于此角度的斜接将不会被渲染，而仅渲染斜边连接：

* `miterLimit = max miterLength / lineWidth = 1 / sin ( min θ / 2 )`
* 斜接限定值默认为`10.0`，这将会去除所有小于大约`11`度的斜接（`sin(5.75°) ≈ 0.100188`）。
* 斜接限定值为`√2 ≈ 1.4142136`（四舍五入）时，将去除所有锐角的斜接，仅保留钝角或直角。
* `1.0` 是合法的斜接限定值，但这会去除所有斜接。
* 小于`1.0`的值不是合法的斜接限定值。

![3.3.21.png](assets/3.3/21.png)

```javascript
// 仅包含javascript代码，详见line.html文件
function draw() {
  const ctx = document.getElementById("canvas").getContext("2d");
  // 清空画布
  ctx.clearRect(0, 0, 150, 150);
  // 绘制参考线
  ctx.strokeStyle = "#09f";
  ctx.lineWidth = 2;
  ctx.strokeRect(-5, 50, 160, 50);
  // 设置线条样式
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 10;
  // 检查输入
  if (document.getElementById("miterLimit").value.match(/\d+(\.\d+)?/)) {
    ctx.miterLimit = parseFloat(document.getElementById("miterLimit").value);
  } else {
    alert("Value must be a positive number");
  }
  // 绘制线条
  ctx.beginPath();
  ctx.moveTo(0, 100);
  for (let i = 0; i < 24; i++) {
    const dy = i % 2 === 0 ? 25 : -25;
    ctx.lineTo(Math.pow(i, 1.5) * 2, 75 + dy);
  }
  ctx.stroke();
  return false;
}
```

在此示例中，当你设定`miterLimit`的值小于`4.2`
时，图形可见部分的边角不会延伸相交，而是在蓝色线条边呈现斜边连接效果；当`miterLimit`的值大于
`10.0` 时，此例中大部分的边角都会在远离蓝线的位置相交，且从左至右，距离随着夹角的增大而减小；而介于上述值之间的值所呈现的效果，也介于两者之间。

![3.3.22.png](assets/3.3/22.png)

**虚线示例**

使用`setLineDash`方法和`lineDashOffset`属性来制定虚线样式。`setLineDash`
方法接受一个数组，来指定线段与间隙的交替；`lineDashOffset`属性设置起始偏移量。

在这个例子中，我们创建了一个蚂蚁线的效果。它往往应用在计算机图形程序选区工具动效中。它可以帮助用户通过动画的边界来区分图像背景选区边框。

```javascript
const ctx = document.getElementById("canvas").getContext("2d");
const offset = 0;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.setLineDash([4, 2]);
  ctx.lineDashOffset = -offset;
  ctx.strokeRect(10, 10, 100, 100);
}

function march() {
  offset++;
  if (offset > 16) {
    offset = 0;
  }
  draw();
  setTimeout(march, 20);
}

march();
```

![3.3.23.png](assets/3.3/23.png)

##### 3.3.3.4 渐变

可以用线性或径向渐变来填充或描边。新建一个`canvasGradient`对象，并且赋给图形的`fillStyle`或`strokeStyle`属性。

```javascript
createLinearGradient(x1, y1, x2, y2)
// 接受 4 个参数，表示渐变的起点 (x1,y1) 与终点 (x2,y2)。
createRadialGradient(x1, y1, r1, x2, y2, r2)
// 接受 6 个参数，前三个定义一个以 (x1,y1) 为原点，半径为 r1 的圆，后三个参数则定义另一个以 (x2,y2) 为原点，半径为 r2 的圆。
```

创建出`canvasGradient`对象后，我们就可以用`addColorStop`方法给它上色了。

```javascript
gradient.addColorStop(position, color)
// 接受 2 个参数，position 参数必须是一个 0.0 与 1.0 之间的数值，表示渐变中颜色所在的相对位置。color 参数必须是一个有效的 CSS 颜色值（如 #FFF，rgba(0,0,0,1)等）。
```

你可以根据需要添加任意多个色标（`color stops`）。

```javascript
// 线性黑白渐变
const lineargradient = ctx.createLinearGradient(0, 0, 150, 150);
lineargradient.addColorStop(0, "white");
lineargradient.addColorStop(1, "black");
```

**`createLinearGradient`示例**

本例涉及了两种渐变。第一种是背景色渐变，不难发现，给同一位置色标设置两种颜色可以实现突变的效果，就像本例中从白色到绿色的突变。一般情况下，色标的定义顺序是无所谓的，但是色标位置重复时，顺序就变得非常重要了。所以，保持色标定义顺序和它理想的顺序一致，结果应该没什么大问题。第二种渐变，并不是从`0.0`
位置开始定义色标，因为那并不是那么严格的。在`0.5`
处设置黑色色标，渐变会默认认为从起点到色标之间都是黑色。可以发现，`strokeStyle`和`fillStyle`属性都可以接受`canvasGradient`
对象。

```javascript
function draw() {
  const ctx = document.getElementById("canvas").getContext("2d");
  // 创建渐变对象
  const lingrad = ctx.createLinearGradient(0, 0, 0, 150);
  lingrad.addColorStop(0, "#00ABEB");
  lingrad.addColorStop(0.5, "#fff");
  lingrad.addColorStop(0.5, "#26C000");
  lingrad.addColorStop(1, "#fff");
  const lingrad2 = ctx.createLinearGradient(0, 50, 0, 95);
  lingrad2.addColorStop(0.5, "#000");
  lingrad2.addColorStop(1, "rgba(0,0,0,0)");
  // 指定填充和笔划渐变样式
  ctx.fillStyle = lingrad;
  ctx.strokeStyle = lingrad2;
  // 绘制图形
  ctx.fillRect(10, 10, 130, 130);
  ctx.strokeRect(50, 50, 50, 50);
}
```

![3.3.24.png](assets/3.3/24.png)

**`createRadialGradient`示例**

本例定义了`4`个不同的径向渐变。由于可以控制渐变的起始与结束点，所以我们可以实现一些比经典的径向渐变更为复杂的效果（经典的径向渐变是只有一个中心点，简单地由中心点向外围的圆形扩张）。

```javascript
function draw() {
  const ctx = document.getElementById("canvas").getContext("2d");
  // 创建渐变
  const radgrad = ctx.createRadialGradient(45, 45, 10, 52, 50, 30);
  radgrad.addColorStop(0, "#A7D30C");
  radgrad.addColorStop(0.9, "#019F62");
  radgrad.addColorStop(1, "rgba(1,159,98,0)");
  const radgrad2 = ctx.createRadialGradient(105, 105, 20, 112, 120, 50);
  radgrad2.addColorStop(0, "#FF5F98");
  radgrad2.addColorStop(0.75, "#FF0188");
  radgrad2.addColorStop(1, "rgba(255,1,136,0)");
  const radgrad3 = ctx.createRadialGradient(95, 15, 15, 102, 20, 40);
  radgrad3.addColorStop(0, "#00C9FF");
  radgrad3.addColorStop(0.8, "#00B5E2");
  radgrad3.addColorStop(1, "rgba(0,201,255,0)");
  const radgrad4 = ctx.createRadialGradient(0, 150, 50, 0, 140, 90);
  radgrad4.addColorStop(0, "#F4F201");
  radgrad4.addColorStop(0.8, "#E4C700");
  radgrad4.addColorStop(1, "rgba(228,199,0,0)");
  // 绘制图形
  ctx.fillStyle = radgrad4;
  ctx.fillRect(0, 0, 150, 150);
  ctx.fillStyle = radgrad3;
  ctx.fillRect(0, 0, 150, 150);
  ctx.fillStyle = radgrad2;
  ctx.fillRect(0, 0, 150, 150);
  ctx.fillStyle = radgrad;
  ctx.fillRect(0, 0, 150, 150);
}
```

![3.3.25.png](assets/3.3/25.png)

##### 3.3.3.5 图案样式（Patterns）

在`3.3.2.3.7 组合使用`中，使用循环来实现图案的效果。`createPattern`也可以实现这种效果。

```javascript
createPattern(image, type)
// 接受两个参数。Image 可以是一个 Image 或 canvas 对象。Type 为以下枚举值：repeat，repeat-x，repeat-y 和 no-repeat。
```

**备注：用`canvas`对象作为`Image`参数在`Firefox 1.5 (Gecko 1.8)`中是无效的。**

图案的应用跟渐变很类似的，创建出一个`pattern`之后，赋给`fillStyle`或`strokeStyle`属性即可。

```javascript
const img = new Image();
img.src = "someimage.png";
const ptrn = ctx.createPattern(img, "repeat");
```

**备注：与`drawImage`不同，你需要确认`image`对象已经装载完毕，否则图案可能效果不对的。**

**`createPattern`示例**

```javascript
// 详见patterns.html文件
const ctx = document.getElementById("canvas").getContext("2d");
// 创建一个 image 对象
const img = new Image();
img.src = "./1.png";
img.onload = function () {
  // 确保设置图案样式之前图像已经装载完毕
  ctx.fillStyle = ctx.createPattern(img, "repeat");
  ctx.fillRect(0, 0, 150, 150);
};
```

##### 3.3.3.6 阴影

```javascript
shadowOffsetX = float
// shadowOffsetX 和 shadowOffsetY 用来设定阴影在 X 和 Y 轴的延伸距离，它们是不受变换矩阵所影响的。负值表示阴影会往上或左延伸，正值则表示会往下或右延伸，它们默认都为 0。
shadowOffsetY = float
// shadowOffsetX 和 shadowOffsetY 用来设定阴影在 X 和 Y 轴的延伸距离，它们是不受变换矩阵所影响的。负值表示阴影会往上或左延伸，正值则表示会往下或右延伸，它们默认都为 0。
shadowBlur = float
// shadowBlur 用于设定阴影的模糊程度，其数值并不跟像素数量挂钩，也不受变换矩阵的影响，默认为 0。
shadowColor = color
// shadowColor 是标准的 CSS 颜色值，用于设定阴影颜色效果，默认是全透明的黑色。
```

**文字阴影示例**

```javascript
```

![3.3.2.png](assets/3.3/2.png)

**``示例**

```javascript
function draw() {
  const ctx = document.getElementById("canvas").getContext("2d");
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 2;
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
  ctx.font = "20px Times New Roman";
  ctx.fillStyle = "Black";
  ctx.fillText("Sample String", 5, 30);
}
```

![3.3.26.png](assets/3.3/26.png)

##### 3.3.3.7 Canvas填充规则

参考：https://www.zhangxinxu.com/wordpress/2018/10/nonzero-evenodd-fill-mode-rule/

当使用`fill`，`clip`或`isPointinPath`时，可以指定填充规则。填充规则根据某处在路径内/外侧情况来决定该处是否需要填充，对于路径与自己相交或路径嵌套的场景是非常实用的。

* `nonzero`（默认值）：非零规则`non-zero winding rule`。起始值为`0`，射线会和路径相交，形成一个转向的箭头。若为顺时针方向则`+1`
  ，若为逆时针方向则`-1`。若总计数值非`0`，则认为是路径内部（填充）；若总计数值为`0`，则认为是路径外部（不填充）。
* `evenodd`：奇偶规则`even-odd winding rule`。起始值为`0`，射线会和路径相交，每交叉一条路径，计数就`+1`
  。若总计数值为奇数，则认为是路径内部（填充）；若为偶数，则认为是路径外部（不填充）。

**注意：`nonzero`规则和`evenodd`规则统计的东西不一样，`nonzero`是计算顺时针逆时针数量，`evenodd`是交叉路径数量。**

**`evenodd`示例**

```javascript
function draw() {
  const ctx = document.getElementById("canvas").getContext("2d");
  ctx.beginPath();
  ctx.arc(50, 50, 30, 0, Math.PI * 2, true);
  ctx.arc(50, 50, 15, 0, Math.PI * 2, true);
  ctx.fill("evenodd");
}
```

![3.3.27.png](assets/3.3/27.png)

#### 3.3.4 绘制文本

##### 3.3.4.1 绘制文本

canvas 提供了两种方法来渲染文本：

```javascript
fillText(text, x, y, maxWidth)
// 在指定的 (x,y) 位置填充指定的文本，绘制的最大宽度是可选的。
strokeText(text, x, y, maxWidth)
// 在指定的 (x,y) 位置绘制文本边框，绘制的最大宽度是可选的。
```

**填充文本示例**

```javascript
function draw() {
  const ctx = document.getElementById("canvas").getContext("2d");
  ctx.font = "48px serif";
  ctx.fillText("Hello world", 10, 50);
}
```

![3.3.28.png](assets/3.3/28.png)

**文本边框示例**

```javascript
function draw() {
  const ctx = document.getElementById("canvas").getContext("2d");
  ctx.font = "48px serif";
  ctx.strokeText("Hello world", 10, 50);
}
```

![3.3.29.png](assets/3.3/29.png)

##### 3.3.4.2 有样式的文本

```javascript
font = value
// 当前我们用来绘制文本的样式。这个字符串使用和 CSS font 属性相同的语法。默认的字体是 10px sans-serif。
textAlign = value
// 文本对齐选项。可选的值包括：start, end, left, right or center. 默认值是 start。
textBaseline = value
// 基线对齐选项。可选的值包括：top, hanging, middle, alphabetic, ideographic, bottom。默认值是 alphabetic。
direction = value
// 文本方向。可能的值包括：ltr, rtl, inherit。默认值是 inherit。
```

下图展示了`textBaseline`属性支持的不同基线的情况：

![3.3.30.png](assets/3.3/30.png)

**`textBaseline`示例**

```javascript
// 仅包含javascript代码，详见text.html文件
ctx.font = "48px serif";
ctx.textBaseline = "hanging";
ctx.strokeText("Hello world", 0, 100);
```

![3.3.31.png](assets/3.3/31.png)

##### 3.3.4.3 预测量文本宽度

```javascript
measureText()
// 将返回一个 TextMetrics 对象的宽度、所在像素，这些体现文本特性的属性。
```

**`measureText`示例**

```javascript
function draw() {
  const ctx = document.getElementById("canvas").getContext("2d");
  const text = ctx.measureText("foo");
  // 测量 foo 的文本宽度
  text.width;
  // 15.259994506835938
}
```

##### 3.3.4.4 Geoko 特性说明

在`Geoko`（`Firefox`，`Firefox OS`及基于`Mozilla`的应用的渲染引擎）中，曾有一些版本较早的`API`实现了在`canvas`
上对文本作画的功能，但它们现在已不再使用。

#### 3.3.5 使用图像

`canvas`更有意思的一项特性就是图像操作能力。可以用于动态的图像合成、图形的背景以及游戏界面（`Sprites`
）等。浏览器支持的任意格式的外部图片都可以使用（`PNG`、`GIF`或`JPEG`）。甚至可以将同一个页面中其他`canvas`生成的图片作为图片源。

引入图像到`canvas`里需要以下两个基本操作：

1、获取一个`HTMLImageElement`对象或一个`canvas`对象作为图片源，也可以通过提供一个`URL`的方式来使用图片。
2、使用`drawImage()`函数将图片绘制到画布上

##### 3.3.5.1 获得需要绘制的图片

`canvas`的`API`可以使用以下类型中的一种作为图片源：

```javascript
HTMLImageElement
// 这些图片是由 Image() 函数构造出来的，或是 <img> 元素
HTMLVideoElement
// 用一个 HTML 的 <video> 元素作为你的图片源，可以从视频中抓取当前帧作为一个图像
HTMLCanvasElement
// 可以使用另一个 <canvas> 元素作为你的图片源。
ImageBitmap
// 这是一个高性能的位图，可以低延迟地绘制，它可以从上述的所有源以及其他几种源中生成。
```

**这些源统一由`CanvasImageSource`类型来引用。**

**使用相同页面内的图片**

* `document.images`集合
* `document.getElementsByTagName()`方法
* 如果你知道使用的图片`ID`，你可以用`document.getElementById()`获得这个图片

**使用其他域名下的图片**

在`HTMLImageElement`上使用`crossOrigin`属性，你可以请求加载其他域名上的图片。如果图片的服务器允许跨域访问这个图片，那么你可以使用这个图片而不污染
`canvas`，否则，使用这个图片将会污染`canvas`。

**使用其他`canvas`元素**

和使用相同页面内的图片类似，用`document.getElementsByTagName`或`document.getElementById`方法来获取其他`canvas`
元素。但你引入的应该是已经准备好的`canvas`。

一个常见的应用就是将第二个`canvas`作为另一个大的`canvas`的缩略图。

**由零开始创建图像**

使用脚本创建一个新的`HTMLImageElement`对象。可以使用`Image()`构造函数来实现。

```javascript
const img = new Image();
// 创建一个 img 元素
img.src = "myImage.png";
// 设置图片源地址
```

当脚本执行后，图片开始装载。

若调用`drawImage`时，图片还没加载完，那么就不会有效果（一些旧的浏览器中可能会抛出异常）。因此需要用`load`事件确保使用的图片加载完成：

```javascript
const img = new Image();
// 创建一个 img 元素
img.onload = function () {
  // 执行 drawImage 语句
};
img.src = "myImage.png";
// 设置图片源地址
```

**通过`data:url`方式嵌入图像**

我们还可以通过`data:url`方式来引用图像。`Data urls`允许用一串`Base64`编码的字符串的方式来定义一个图片。

```javascript
img.src = "data:image/gif;base64,R0lGODlhCwALAIAAAAAA3pn/ZiH5BAEAAAEALAAAAAALAAsAAAIUhA+hkcuO4lmNVindo7qyrIXiGBYAOw==";
```

优点：

* 图片即时可用，不需要请求服务器。
* 可以将`CSS`，`JavaScript`，`HTML`和图片全部封装在一起，迁移起来十分方便

缺点：

* 图像没法缓存，图片大的话内嵌的`url`数据会非常长：

**使用视频帧**

你还可以使用`<video>`中的视频帧（即便视频是不可见的）。例如，如果你有一个`ID`为`myvideo`的`<video>`元素，你可以这样做：

```javascript
function getMyVideo() {
  const canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    return document.getElementById("myvideo");
  }
}
```

##### 3.3.5.2 绘制图片

一旦获得了图片源对象，我们就可以使用`drawImage`方法将它渲染到`canvas`里。`drawImage`方法有三种形态，下面是最基础的一种。

```javascript
drawImage(image, x, y)
// 其中 image 是 image 或者 canvas 对象，x 和 y 是其在目标 canvas 里的起始坐标。
// 备注：SVG 图像必须在 <svg> 根指定元素的宽度和高度。
```

**`drawImage`线图示例**

```javascript
// 仅包含javascript代码，详见drawImage.html文件
function draw() {
  const ctx = document.getElementById("canvas").getContext("2d");
  const img = new Image();
  img.onload = function () {
    ctx.drawImage(img, 0, 0);
    ctx.beginPath();
    ctx.moveTo(30, 96);
    ctx.lineTo(70, 66);
    ctx.lineTo(103, 76);
    ctx.lineTo(170, 15);
    ctx.stroke();
  };
  img.src = "./1.png";
}
```

##### 3.3.5.3 缩放

`drawImage`方法的一种重载用法，增加了两个用于控制图像在`canvas`中缩放的参数。

```javascript
drawImage(image, x, y, width, height)
// 这个用法多了 2 个参数：width 和 height，这两个参数用来控制 当向 canvas 画入时应该缩放的大小
```

**`drawImage`平铺图像示例**

此例中，将一张图片作为背景在`canvas`中重复平铺。通过循环铺开经过缩放的图片。图像大小被缩放至原来的六分之一`50x38px`。

**备注： 图像可能会因为大幅度的缩放而变得模糊。如果图像里面有文字，最好还是不要进行缩放，因为文字缩放后很可能就无法辨认了。**

```javascript
function draw() {
  const ctx = document.getElementById("canvas").getContext("2d");
  const img = new Image();
  img.onload = () => {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        ctx.drawImage(img, j * 50, i * 38, 50, 38);
      }
    }
  };
  img.src = "https://mdn.github.io/shared-assets/images/examples/rhino.jpg";
}

draw();
```

![3.3.32.png](assets/3.3/32.png)

##### 3.3.5.4 切片

`drawImage`方法的另外一种重载用法，有`8`个用于控制做切片显示的新参数。

```javascript
drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
// 第一个参数，image 是 image 或者 canvas 对象。
// 新的 8 个参数参考下图图解，前 4 个是定义图片源的切片位置和大小，后 4 个则是定义切片的目标显示位置和大小。
```

![3.3.33.png](assets/3.3/33.png)

切片是个做图像合成的强大工具。假设有一张包含了所有元素的图像，那么你可以用这个方法来合成一个完整图像。例如，你想画一张图表，而手上有一个包含所有必需的文字的
`PNG`文件，那么你可以根据实际数据的需要来改变最终显示的图表。**这方法的另一个好处就是你不需要单独装载每一个图像。**

**`drawImage`相框示例**

```javascript
// 仅包含javascript代码，详见drawImage-album.html文件
async function draw() {
  // 等待所有图片的加载。
  await Promise.all(Array.from(document.images).map((image) => new Promise((resolve) => image.addEventListener("load", resolve))));
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  // 绘制切片
  ctx.drawImage(document.getElementById("source"), 33, 71, 104, 124, 21, 20, 87, 104,);
  // 绘制相框
  ctx.drawImage(document.getElementById("frame"), 0, 0);
}

draw();
```

![3.3.34.png](assets/3.3/34.png)

##### 3.3.5.5 画廊示例

当页面及图片加载好后，为每张**画**创建`canvas`对象，加上相框，然后绘制到画廊中去。

此例中，所有**画**和相框都是固定宽高的。

使用`insertBefore`方法，将新节点（`canvas`元素）插入到指定节点之前。

**`drawImage`画廊示例**

```javascript
// 仅包含javascript代码，详见drawImage-gallery.html文件
const imgSrc = [
  "https://8deb4ee3957797b28d0e0ed0c7f2c8425fd9e13f.mdnplay.dev/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images/gallery_1.jpg",
  "https://8deb4ee3957797b28d0e0ed0c7f2c8425fd9e13f.mdnplay.dev/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images/gallery_2.jpg",
  "https://8deb4ee3957797b28d0e0ed0c7f2c8425fd9e13f.mdnplay.dev/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images/gallery_3.jpg",
  "https://8deb4ee3957797b28d0e0ed0c7f2c8425fd9e13f.mdnplay.dev/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images/gallery_4.jpg",
  "https://8deb4ee3957797b28d0e0ed0c7f2c8425fd9e13f.mdnplay.dev/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images/gallery_5.jpg",
  "https://8deb4ee3957797b28d0e0ed0c7f2c8425fd9e13f.mdnplay.dev/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images/gallery_6.jpg",
  "https://8deb4ee3957797b28d0e0ed0c7f2c8425fd9e13f.mdnplay.dev/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images/gallery_7.jpg",
  "https://8deb4ee3957797b28d0e0ed0c7f2c8425fd9e13f.mdnplay.dev/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images/gallery_8.jpg",
]

async function draw() {
  const imgList = document.querySelectorAll(".img")
  for (let i = 0; i < imgList.length; i++) {
    imgList[i].src = imgSrc[i];
  }
  // 等待所有图片的加载。
  await Promise.all(Array.from(document.images).map((image) => new Promise((resolve) => image.addEventListener("load", resolve))));
  // 循环所有的图片对象
  for (let i = 0; i < imgList.length; i++) {
    // 创建 canvas 元素
    const canvas = document.createElement("canvas");
    canvas.setAttribute("width", "132");
    canvas.setAttribute("height", "150");
    // 在图像前插入
    imgList[i].parentNode.insertBefore(canvas, imgList[i]);
    const ctx = canvas.getContext("2d");
    // 将图像绘制到画布
    ctx.drawImage(imgList[i], 15, 20);
    // 添加相框
    ctx.drawImage(document.getElementById("frame"), 0, 0);
  }
}

draw();
```

![3.3.5.png](assets/3.3/35.png)

##### 3.3.5.6 控制图像的缩放行为

如同前文所述，过度缩放图像可能会导致图像模糊或像素化。可以通过使用绘图环境的`imageSmoothingEnabled`
属性来控制是否在缩放图像时使用平滑算法。默认为`true`，即启用平滑缩放。你也可以禁用此功能：

```javascript
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
```

#### 3.3.6 变形（Transformations）

##### 3.3.6.1 状态的保存和恢复

在了解变形之前，先介绍两个在你开始绘制复杂图形时必不可少的方法。

```javascript
save()
// 保存画布 Canvas 的所有状态
restore()
// save 和 restore 方法是用来保存和恢复 Canvas 状态的，都没有参数。Canvas 的状态就是当前画面应用的所有样式和变形的一个快照。
```

`Canvas`状态存储在栈中，每当`save()`方法被调用后，当前的状态就被推送到栈中保存。一个绘画状态包括：

* 当前应用的变形（即移动，旋转和缩放）
* `Canvas`属性：`strokeStyle`，`fillStyle`，`globalAlpha`，`lineWidth`，`lineCap`，`lineJoin`，`miterLimit`，`lineDashOffset`,
  `shadowOffsetX`，`shadowOffsetY`，`shadowBlur`，`shadowColor`，`globalCompositeOperation`，`font`，`textAlign`，`textBaseline`,`direction`，`imageSmoothingEnabled`
* 当前的裁切路径（`clipping path`）

`save`方法可以调用任意次数。每一次调用`restore`方法，上一个保存的状态就从栈中弹出，所有设定都恢复。

**`save`和`restore`示例**

调用`restore`方法，状态栈中的最后状态会弹出并恢复所有设置。如果没有用`save`保存状态，那就需要手动改变设置来回到前一个状态。

**注意：调用`restore`方法，并且状态栈中没有保存的状态，再次绘制图像则会使用最后一次弹出的状态（没有手动改变设置的情况下）。**

```javascript
function draw() {
  const ctx = document.getElementById("canvas").getContext("2d");
  ctx.fillRect(0, 0, 150, 150); // 使用默认设置绘制一个矩形
  ctx.save(); // 保存默认状态
  ctx.fillStyle = "#09F"; // 在原有配置基础上对颜色做改变
  ctx.fillRect(15, 15, 120, 120); // 使用新的设置绘制一个矩形
  ctx.save(); // 保存当前状态
  ctx.fillStyle = "#FFF"; // 再次改变颜色配置
  ctx.globalAlpha = 0.5;
  ctx.fillRect(30, 30, 90, 90); // 使用新的配置绘制一个矩形
  ctx.restore(); // 重新加载之前的颜色状态
  ctx.fillRect(45, 45, 60, 60); // 使用上一次的配置绘制一个矩形
  ctx.restore(); // 加载默认颜色配置
  ctx.fillRect(60, 60, 30, 30); // 使用加载的配置绘制一个矩形
}
```

![3.3.36.png](assets/3.3/36.png)

##### 3.3.6.2 移动

`translate`方法，它用于以原点为基准将`canvas`移动到一个新位置。

```javascript
translate(x, y)
// translate 方法接受两个参数。 x 是左右偏移量，y 是上下偏移量，如下图所示。
```

![3.3.37.png](assets/3.3/37.png)

大多数情况下，调用`restore`方法比手动恢复原先的状态要简单得多。如果在循环中做位移但没有保存和恢复`canvas`
的状态，很可能会出现某些`canvas`元素没有渲染的情况，因为它很可能已经超出`canvas`范围以外了。

**`translate`示例**

```javascript
function draw() {
  const ctx = document.getElementById("canvas").getContext("2d");
  for (const i = 0; i < 3; i++) {
    for (const j = 0; j < 3; j++) {
      ctx.save();
      ctx.fillStyle = "rgb(" + 51 * i + ", " + (255 - 51 * i) + ", 255)";
      ctx.translate(10 + j * 50, 10 + i * 50);
      ctx.fillRect(0, 0, 25, 25);
      ctx.restore();
    }
  }
}
```

![3.3.38.png](assets/3.3/38.png)

##### 3.3.6.3 旋转

`rotate`方法，它用于以原点为中心旋转`canvas`。

```javascript
rotate(angle)
// rotate 方法接受一个参数：旋转的角度 angle，它是顺时针方向的，以弧度为单位的值。
```

![3.3.39.png](assets/3.3/39.png)

**注意：旋转的中心点始终是`canvas`的原点。如果要改变它，我们需要用到`translate`方法。**

**`rotate`示例**

```javascript
function draw() {
  const ctx = document.getElementById("canvas").getContext("2d");
  ctx.save();
  // 左矩形，从画布原点旋转
  // 绘制蓝色矩形
  ctx.fillStyle = "#0095DD";
  ctx.fillRect(30, 30, 100, 100);
  ctx.rotate((Math.PI / 180) * 25); // 旋转
  // 绘制灰色矩形
  ctx.fillStyle = "#4D4E53";
  ctx.fillRect(30, 30, 100, 100);
  ctx.restore();
  // 右矩形，从矩形中心旋转
  // 绘制蓝色矩形
  ctx.fillStyle = "#0095DD";
  ctx.fillRect(150, 30, 100, 100);
  ctx.translate(200, 80); // 移动到矩形中心
  // translateX = x + 0.5 * width
  // translateY = y + 0.5 * height
  ctx.rotate((Math.PI / 180) * 25); // 旋转
  ctx.translate(-200, -80); // 重置移动操作
  // 绘制灰色矩形
  ctx.fillStyle = "#4D4E53";
  ctx.fillRect(150, 30, 100, 100);
}
```

![3.3.40.png](assets/3.3/40.png)

##### 3.3.6.4 缩放

`scale`方法，它用于增减图形在`canvas`中的像素数目，对形状，位图进行缩小或者放大。

```javascript
scale(x, y)
// scale 方法可以缩放画布的水平和垂直的单位。两个参数都是实数，可为负数，x 为水平缩放因子，y 为垂直缩放因子。
// 如果比 1 小，会缩小图形，如果比 1 大会放大图形。默认值为 1，为实际大小。
```

画布初始情况下，是以左上角坐标为原点的第一象限。如果参数为负实数，相当于以`x`或`y`
轴作为对称轴镜像反转（例如，使用`translate(0,canvas.height)`;`scale(1,-1)`; 以`y`轴作为对称轴镜像反转，就可得到著名的笛卡尔坐标系，左下角为原点）。

默认情况下，`canvas`的`1`个单位为`1`个像素。举例说，如果我们设置缩放因子是`0.5`，`1`个单位就变成对应`0.5`
个像素，这样绘制出来的形状就会是原先的一半。同理，设置为`2.0`时，`1`个单位就对应变成了`2`像素，绘制的结果就是图形放大了`2`倍。

**`scale`示例**

```javascript
function draw() {
  const ctx = document.getElementById("canvas").getContext("2d");
  // draw a simple rectangle, but scale it.
  ctx.save();
  ctx.scale(10, 3);
  ctx.fillRect(1, 10, 10, 10);
  ctx.restore();
  // mirror horizontally
  ctx.scale(-1, 1);
  ctx.font = "48px serif";
  ctx.fillText("MDN", -135, 120);
}
```

![3.3.41.png](assets/3.3/41.png)

##### 3.3.6.5 变形

`transform`方法，它可以直接对`canvas`变形矩阵进行修改。

```javascript
transform(a, b, c, d, e, f)
// 这个方法是将当前的变形矩阵乘上一个基于自身参数的矩阵，矩阵形式：[[a, c, e], [b, d, f], [0, 0, 1]]
```

如果任意一个参数是`Infinity`（全局属性，表示一个无穷大的数值），变形矩阵也必须被标记为无限大，否则会抛出异常。

矩阵中，各个参数含义：

* `a`（`m11`）：水平方向的缩放
* `b`（`m12`）：竖直方向的倾斜偏移
* `c`（`m21`）：水平方向的倾斜偏移
* `d`（`m22`）：竖直方向的缩放
* `e`（`dx`）：水平方向的移动
* `f`（`dy`）：竖直方向的移动

```javascript
setTransform(a, b, c, d, e, f)
// 这个方法会将当前的变形矩阵重置为单位矩阵，然后用相同的参数调用 transform 方法。
// 如果任意一个参数是无限大，那么变形矩阵也必须被标记为无限大，否则会抛出异常。
// 从本质上来说，该方法是取消了当前变形，然后设置为指定的变形，一步完成。
resetTransform()
// 重置当前变形为单位矩阵，它和调用以下语句是一样的：ctx.setTransform(1, 0, 0, 1, 0, 0);
```

**`transform`和`setTransform`示例**

```javascript
function draw() {
  const ctx = document.getElementById("canvas").getContext("2d");
  const sin = Math.sin(Math.PI / 6);
  const cos = Math.cos(Math.PI / 6);
  ctx.translate(100, 100);
  const c = 0;
  for (let i = 0; i <= 12; i++) {
    c = Math.floor((255 / 12) * i);
    ctx.fillStyle = "rgb(" + c + "," + c + "," + c + ")";
    ctx.fillRect(0, 0, 100, 10);
    ctx.transform(cos, sin, -sin, cos, 0, 0);
  }
  // 重置变形
  ctx.setTransform(-1, 0, 0, 1, 100, 100);
  ctx.fillStyle = "rgba(255, 128, 255, 0.5)";
  ctx.fillRect(0, 50, 100, 100);
}
```

![3.3.42.png](assets/3.3/42.png)

#### 3.3.7 合成（Compositing）

##### 3.3.7.1 全局合成操作

参考：https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation

`globalCompositeOperation`属性设置在绘制新形状时应用的合成操作策略。

```javascript
globalCompositeOperation = type
// 这个属性设置在绘制新形状时应用的合成操作策略，有很多种策略。
```

**合成操作策略**

* `source-over`（默认值）：在现有画布上绘制新图形。
* `source-in`：仅在新形状和目标画布重叠的地方绘制新形状。其他的都是透明的。
* `source-out`：在不与现有画布内容重叠的地方绘制新图形。
* `source-atop`：仅在与现有画布内容重叠的地方绘制新图形。
* `destination-over`：在现有画布内容的后面绘制新的图形。
* `destination-in`：仅保留现有画布内容和新形状重叠的部分。其他的都是透明的。
* `destination-out`：仅保留现有画布内容和新形状不重叠的部分。
* `destination-atop`：仅保留现有画布内容和新形状重叠的部分。新形状是在现有画布内容的后面绘制的。
* `lighter`：两个重叠图形的颜色是通过颜色值相加来确定的。
* `copy`：仅显示新图形。
* `xor`：形状在重叠处变为透明，并在其他地方正常绘制。
* `multiply`：将顶层像素与底层相应像素相乘，结果是一幅更黑暗的图片。
* `screen`：像素被倒转、相乘、再倒转，结果是一幅更明亮的图片（与`multiply`相反）。
* `overlay`：`multiply`和`screen`的结合。原本暗的地方更暗，原本亮的地方更亮。
* `darken`：保留两个图层中最暗的像素。
* `lighten`：保留两个图层中最亮的像素。
* `color-dodge`：将底层除以顶层的反置。
* `color-burn`：将反置的底层除以顶层，然后将结果反过来。
* `hard-light`：类似于`overlay`，`multiply`和`screen`的结合，但上下图层互换了。
* `soft-light`：柔和版本的`hard-light`。纯黑或纯白不会导致纯黑或纯白。
* `difference`：从顶层减去底层（或反之亦然），始终得到正值。
* `exclusion`：与`difference`类似，但对比度较低。
* `hue`：保留底层的亮度（`luma`）和色度（`chroma`），同时采用顶层的色调（`hue`）。
* `saturation`：保留底层的亮度和色调，同时采用顶层的色度。
* `color`：保留了底层的亮度，同时采用了顶层的色调和色度。
* `luminosity`：保持底层的色调和色度，同时采用顶层的亮度。

**`globalCompositeOperation`示例**

```javascript
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.globalCompositeOperation = "xor";
ctx.fillStyle = "blue";
ctx.fillRect(10, 10, 100, 100);
ctx.fillStyle = "red";
ctx.fillRect(50, 50, 100, 100);
```

![3.3.43.png](assets/3.3/43.png)

##### 3.3.7.2 裁切路径

裁切路径和普通的`canvas`图形差不多，不同的是它的作用是遮罩，用来隐藏不需要的部分。如下图所示，红边五角星就是裁切路径，所有路径外的部分都不会绘制出来。

![3.3.44.png](assets/3.3/44.png)

裁切路径可以实现与`globalCompositeOperation`属性`source-in`和`source-atop`类似的效果。
**最重要的区别是裁切路径不会在`canvas`上绘制东西，而且它永远不受新图形的影响。**

**`clip`示例**

```javascript
// 用一个圆形的裁切路径来限制随机星星的绘制区域。
function draw() {
  const ctx = document.getElementById("canvas").getContext("2d");
  ctx.fillRect(0, 0, 150, 150);
  ctx.translate(75, 75);
  // 创建一个圆形的裁切路径
  ctx.beginPath();
  ctx.arc(0, 0, 60, 0, Math.PI * 2, true);
  ctx.clip();
  // 绘制线性渐变的星空背景
  const lingrad = ctx.createLinearGradient(0, -75, 0, 75);
  lingrad.addColorStop(0, "#232256");
  lingrad.addColorStop(1, "#143778");
  ctx.fillStyle = lingrad;
  ctx.fillRect(-75, -75, 150, 150);
  // 绘制星星
  for (let j = 1; j < 50; j++) {
    ctx.save();
    ctx.fillStyle = "#fff";
    ctx.translate(
            75 - Math.floor(Math.random() * 150),
            75 - Math.floor(Math.random() * 150),
    );
    drawStar(ctx, Math.floor(Math.random() * 4) + 2);
    ctx.restore();
  }
}

// 绘制星星
function drawStar(ctx, r) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(r, 0);
  for (let i = 0; i < 9; i++) {
    ctx.rotate(Math.PI / 5);
    if (i % 2 == 0) {
      ctx.lineTo((r / 0.525731) * 0.200811, 0);
    } else {
      ctx.lineTo(r, 0);
    }
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}
```

![3.3.45.png](assets/3.3/45.png)

#### 3.3.8 基本动画

`canvas`动画的最大限制就是图像一旦绘制出来，它就是一直保持那样了。如果需要移动它，需要对所有东西（包括之前的）进行重绘。重绘是相当费时的，而且性能很依赖于电脑的速度。

##### 3.3.8.1 动画的基本步骤

1、清空`canvas`。如果要绘制的内容不会完全充满`canvas`（例如背景图），那么需要清空画布。最简单的做法就是用`clearRect`方法。
2、保存`canvas`状态。如果会改变一些`canvas`状态的设置（样式，变形等），又需要在每画一帧之时都是原始状态的话，那么需要先保存一下状态。
3、绘制动画图形（`animated shapes`）。这一步才是重绘动画帧。
4、恢复`canvas`状态。如果已经保存了`canvas`的状态，可以先恢复它，然后重绘下一帧。

**清空`canvas`的必要性：**

* 避免重叠：每次更新动画时，如果不清空画布，新的图形会覆盖在旧的图形上，造成画面混乱。
* 流畅的动画效果：清空画布并重新绘制所有内容，确保动画平滑，避免视觉上的残影。

**不清空`canvas`的情况：**

* 如果动画不需要刷新背景或背景已经固定，并且只想在画布上绘制特定的元素（例如，静态背景+移动对象）。可以选择不清空画布，只清除或更新需要更新的区域。但是，这种做法较为复杂，需要精确控制绘制和清除的区域。

##### 3.3.8.2 操控动画

在`canvas`上绘制内容使用`canvas`提供/自定义的方法。通常，我们只有在脚本执行结束后才能看见结果，比如，在`for`循环里面做完成动画是不太可能的。

因此，为了实现动画，需要支持定时重绘的方法。`setInterval`、`setTimeout`和`requestAnimationFrame()`可以设置时间进行定时重绘。

```javascript
setInterval()
// 当设定好间隔时间后，function 会定期执行。
setTimeout()
// 在设定好的时间之后执行函数
requestAnimationFrame()
// 告诉浏览器你希望执行一个动画，并在重绘之前，请求浏览器执行一个特定的函数来更新动画。
```

如果不需要与用户互动，可以使用`setInterval()`方法，它可以定期执行指定代码。

如果需要与用户互动（例如：游戏等），可以使用键盘/鼠标事件搭配`setTimeout()`方法实现。通过设置事件监听，捕捉用户的交互并执行相应的动作。

**备注：`window.requestAnimationFrame()`可以更平缓地执行动画，当具备重绘条件时，才会绘制动画帧。一般每秒回调函数执行`60`
次，也有可能会被降低。**

##### 3.3.8.3 动画示例

* 太阳系动画，详见`animation-solar-system.html`
* 时钟动画，详见`animation-clock.html`
* 循环全景照片动画，详见`animation-photo.html`
* 鼠标追踪动画，详见`animation-track.html`

#### 3.3.9 高级动画

##### 3.3.9.1 绘制小球

为了画出小球，我们需要创建一个包含相关属性及`draw()`方法的`ball`对象完成绘制。

```javascript
// 完整代码详见animation-ball.html
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const ball = {
  x: 100,
  y: 100,
  vx: 5,
  vy: 3,
  radius: 25,
  color: "blue",
  draw: function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}
ball.draw();
```

##### 3.3.9.2 添加速率

使用`window.requestAnimationFrame()`控制动画。给小球添加速率矢量进行移动。每次重新绘制需要使用`clearRect`清理掉之前帧里的圆形。

```javascript
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ball.draw();
  ball.x += ball.vx;
  ball.y += ball.vy;
  raf = window.requestAnimationFrame(draw);
}

canvas.addEventListener("mouseover", function (e) {
  raf = window.requestAnimationFrame(draw);
});

canvas.addEventListener("mouseout", function (e) {
  window.cancelAnimationFrame(raf);
});
```

##### 3.3.9.3 边界

若不检测碰撞，小球很快就会超出画布。检查小球`x`和`y`是否超出画布的尺寸及是否需要将速度矢量反转。`draw`函数添加如下代码：

```javascript
if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
  ball.vy = -ball.vy;
}
if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
  ball.vx = -ball.vx;
}
```

##### 3.3.9.4 加速度

为了让小球运动更真实，可以对速度矢量进行如下处理。`draw`函数添加如下代码：

```javascript
// 小球会逐帧减少垂直方向的速度，所以小球最终将只会在地板上弹跳。
ball.vy *= 0.99;
ball.vy += 0.25;
```

##### 3.3.9.5 长尾效果

清除前一帧动画使用的是`clearRect`函数。为了实现长尾效果，可以改用一个半透明的`fillRect`函数。`draw`函数添加如下代码：

```javascript
ctx.fillStyle = "rgba(255,255,255,0.3)";
ctx.fillRect(0, 0, canvas.width, canvas.height);
```

##### 3.3.9.6 添加鼠标控制

为了更好地控制小球，可以用`mousemove`事件让小球跟随鼠标移动。`click`事件会释放小球，让小球重新跳起。

```javascript
canvas.addEventListener("mousemove", function (e) {
  if (!running) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ball.x = e.offsetX;
    ball.y = e.offsetY;
    ball.draw();
  }
})
canvas.addEventListener("click", function (e) {
  if (!running) {
    raf = window.requestAnimationFrame(draw);
    running = true;
  }
})
```

#### 3.3.10 像素操作

##### 3.3.10.1 ImageData对象

`ImageData`对象中存储着`canvas`对象真实像素数据，它包含以下几个只读属性：

* `width`：图片宽度，单位是像素。
* `height`：图片高度，单位是像素。
* `data`：`Uint8ClampedArray`类型的一维数组，包含着`RGBA`格式的整型数据，范围在`0`至`255`之间（包括`255`）。
* `Uint8ClampedArray`：包含`height`×`width`×`4`字节数据，索引值从`0`到(`height`×`width`×`4`)-`1`

`data`属性返回一个`Uint8ClampedArray`，它可以被使用作为查看初始像素数据。每个像素用`4`个`1bytes`
值（按照红，绿，蓝和透明值的顺序，即`RGBA`格式）来代表。每个颜色值区用`0`至`255`
来代表。颜色值区会分配到在数组内连续的索引，像素左上角的红色值区在数组的索引`0`位置。像素处理从左至右，从上到下，遍历整个数组。

根据行、列读取某像素点的`R/G/B/A`值的公式：

````javascript
imageData.data[行 * (imageData.width * 4) + 列 * 4 + 0 / 1 / 2 / 3];
````

读取像素数组的大小（以字节为单位）：

```javascript
const numBytes = imageData.data.length;
```

##### 3.3.10.2 创建ImageData对象

创建一个新的，空白的`ImageData`对象，需要使用`createImageData()`方法。有`2`种重载用法。

```javascript
const myImageData = ctx.createImageData(width, height);
// 创建一个 height × width 尺寸的新 ImageData 对象。所有像素被预设为透明黑。
const myImageData = ctx.createImageData(anotherImageData);
// 创建一个与 anotherImageData 对象相同像素的 ImageData 对象。这个新对象的所有像素被预设为透明黑。并非复制 anotherImageData 图片数据。
```

##### 3.3.10.3 获取场景像素数据

获取包含画布场景像素数据的`ImageData`对象，可以用`getImageData()`方法：

```javascript
const myImageData = ctx.getImageData(left, top, width, height);
// 这个方法会返回一个 ImageData 对象，它代表了画布区域的对象数据。此画布的区域为 (left, top) 到 (left + width, top + height) 的矩形。
```

**颜色选择器示例**

```javascript
// 详见imageData-getImageData.html文件
const img = new Image();
// 设置图片跨域资源共享
img.crossOrigin = "anonymous";
img.src = "https://mdn.github.io/shared-assets/images/examples/rhino.jpg";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const hoveredColor = document.getElementById("hoveredColor");
const selectedColor = document.getElementById("selectedColor");
img.onload = function () {
  ctx.drawImage(img, 0, 0);
  img.style.display = "none";
};

function pick(event, destination) {
  const x = event.layerX;
  const y = event.layerY;
  const pixel = ctx.getImageData(x, y, 1, 1);
  const data = pixel.data;
  const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
  destination.style.background = rgba;
  destination.textContent = rgba;
  return rgba;
}

canvas.addEventListener("mousemove", function (event) {
  pick(event, hoveredColor);
});
canvas.addEventListener("click", function (event) {
  pick(event, selectedColor);
});
```

##### 3.3.10.4 在场景中写入像素数据

使用`putImageData()`方法对场景进行像素数据的写入操作。

```javascript
ctx.putImageData(myImageData, dx, dy);
// dx 和 dy 表示像素数据在画布中绘制的起始水平，垂直坐标
```

**颜色选择器示例**

```javascript
// 详见imageData-putImageData.html文件
const img = new Image();
// 设置图片跨域资源共享
img.crossOrigin = "anonymous";
img.src = "https://mdn.github.io/shared-assets/images/examples/rhino.jpg";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
img.onload = function () {
  ctx.drawImage(img, 0, 0);
};

const original = function () {
  ctx.drawImage(img, 0, 0);
};

const grayscale = function () {
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg;
    data[i + 1] = avg;
    data[i + 2] = avg;
  }
  ctx.putImageData(imageData, 0, 0);
};

const invert = function () {
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 255 - data[i];
    data[i + 1] = 255 - data[i + 1];
    data[i + 2] = 255 - data[i + 2];
  }
  ctx.putImageData(imageData, 0, 0);
}

const sepia = function () {
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    data[i] = r * 0.393 + g * 0.769 + b * 0.189;
    data[i + 1] = r * 0.349 + g * 0.686 + b * 0.168;
    data[i + 2] = r * 0.272 + g * 0.534 + b * 0.131;
  }
  ctx.putImageData(imageData, 0, 0);
};

const inputs = document.querySelectorAll("[name=filter]");
for (const input of inputs) {
  input.addEventListener("change", function (e) {
    switch (e.target.value) {
      case "original":
        return original();
      case "grayscale":
        return grayscale();
      case "inverted":
        return invert();
      case "sepia":
        return sepia();
      default:
        return original();
    }
  });
}
```

##### 3.3.10.5 缩放和抗锯齿

通过设置`imageSmoothingEnabled`属性可以实现抗锯齿的效果（默认开启抗锯齿）。

**图片放大镜示例**

根据鼠标位置裁切指定大小的图片，将其复制到另一个画布并调整到期望的大小。本例为将`10×10`像素裁切为`200×200`像素。

```javascript
// 详见imageData-anti-aliasing.html文件
const img = new Image();
img.src = "https://mdn.github.io/shared-assets/images/examples/rhino.jpg";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
img.onload = function () {
  img.style.display = "none";
  draw(this);
};

function draw(img) {
  ctx.drawImage(img, 0, 0);
  const zoomCtx = document.getElementById("zoom").getContext("2d");
  const smoothBtn = document.getElementById("smoothButton");
  const toggleSmoothing = function (event) {
    zoomCtx.imageSmoothingEnabled = this.checked;
    zoomCtx.mozImageSmoothingEnabled = this.checked;
    zoomCtx.webkitImageSmoothingEnabled = this.checked;
    zoomCtx.msImageSmoothingEnabled = this.checked;
  };
  smoothBtn.addEventListener("change", toggleSmoothing);
  const zoom = function (event) {
    const x = event.layerX;
    const y = event.layerY;
    zoomCtx.drawImage(canvas, Math.abs(x - 5), Math.abs(y - 5), 10, 10, 0, 0, 200, 200);
  };
  canvas.addEventListener("mousemove", zoom);
}
```

##### 3.3.10.6 保存图片

`toDataURL()`返回一个包含图片展示的数据链接`data URI`。可以使用`type`指定其类型，默认为`PNG`格式。图片的分辨率为`96dpi`。

```javascript
toDataURL(type, encoderOptions)
// type：图片格式，默认为 image/png
// encoderOptions：在指定图片格式为 image/jpeg 或 image/webp 的情况下，可以从 0 到 1 的区间内选择图片的质量。
// 1 表示最好品质，0 基本不被辨析但有比较小的文件大小。如果超出取值范围，将会使用默认值 0.92。其他参数会被忽略。
```

* 如果画布的高度或宽度是`0`，那么会返回字符串`data:,`。
* 如果传入的类型非`image/png`，但是返回的值以`data:image/png`开头，那么该传入的类型是不支持的。
* `Chrome`支持`image/webp`类型。

**当在画布中生成了一个`data URI`，它可以用于任何`<image>`元素，或放在一个有`download`
属性的超链接里用于保存到本地。也可以用画布创建一个`Blob`对象。**

`toBlob()`创造`Blob`对象，用以展示`canvas`上的图片。这个图片文件可以被缓存或保存到本地（由用户代理自行决定）。

可以在调用时指定所需的文件格式和图像质量，若未指定文件格式（或不支持指定的文件格式），则默认导出`image/png`
类型。浏览器需要支持`image/png`，大多数浏览器还支持额外的图片格式，包括`image/jpeg`和`image/webp`。

对于支持以指定分辨率编码的图片格式，如不特别指明，图片的默认分辨率为`96dpi`。

```javascript
canvas.toBlob(callback, type, quality)
// callback：回调函数，可获得一个单独的 Blob 对象参数。如果图像未被成功创建，可能会获得 null 值。
// type：指定图片格式，默认格式（未指定或不支持）为 image/png。
// quality：值在 0 与 1 之间，当请求图片格式为 image/jpeg 或者 image/webp 时用来指定图片展示质量。
// 如果这个参数的值不在指定类型与范围之内，则使用默认值，其余参数将被忽略。
```

#### 3.3.11 canvas 的优化

参考：https://www.cnblogs.com/fangsmile/p/14721283.html

##### 3.3.11.1 在离屏Canvas上预渲染相似的图形或重复的对象

如果发现自己在每个动画帧上存在一些重复绘制操作，请考虑将其分流到屏幕外的画布上。然后，你可以根据需要将屏幕外的图像渲染到主画布上，而不必重复生成该图像的步骤。

```javascript
myEntity.offscreenCanvas = document.createElement("canvas");
myEntity.offscreenCanvas.width = myEntity.width;
myEntity.offscreenCanvas.height = myEntity.height;
myEntity.offscreenContext = myEntity.offscreenCanvas.getContext("2d");

myEntity.render(myEntity.offscreenContext);
```

##### 3.3.11.2 避免浮点数的坐标点，用整数取而代之

**当绘制存在浮点数坐标点的对象时会发生子像素渲染。**

浏览器为了达到抗锯齿的效果会做额外的运算。为了避免这种情况，请保证在调用`drawImage()`函数时，用`Math.floor()`函数对所有的坐标点取整。

##### 3.3.11.3 使用drawImage时不要缩放图像

在离屏`canvas`中缓存图片的不同尺寸，而不要用`drawImage()`去缩放它们。

##### 3.3.11.4 将复杂的场景分解为多层画布

项目可能会出现某些对象需要经常移动或更改，而其他对象则保持相对静态。在这种情况下，可以使用多个`<canvas>`元素对项目进行分层进行优化。

例如，假设你有一个游戏，其 UI 位于顶部，中间是游戏性动作，底部是静态背景。

```html
<!-- 在这种情况下，可以将游戏分成三个 canvas 层。UI 将仅在用户输入时发生变化，游戏层随每个新框架发生变化，背景层通常保持不变。 -->
<div id="stage">
  <canvas id="ui-layer" width="480" height="320"></canvas>
  <canvas id="game-layer" width="480" height="320"></canvas>
  <canvas id="background-layer" width="480" height="320"></canvas>
</div>
<style>
  #stage {
    width: 480px;
    height: 320px;
    position: relative;
    border: 2px solid black;
  }

  canvas {
    position: absolute;
  }

  #ui-layer {
    z-index: 3;
  }

  #game-layer {
    z-index: 2;
  }

  #background-layer {
    z-index: 1;
  }
</style>
```

##### 3.3.11.5 用CSS设置大的背景图

如大多数游戏那样，你有一张静态的背景图，用一个静态的`<div>`元素，结合`background`特性，以及将它置于画布元素之后。这么做可以避免在每一帧在画布上绘制背景图。

##### 3.3.11.6 用CSS变换特性缩放画布

`CSS`变换使用`GPU`，因此速度更快。最好的情况是不直接缩放画布，或具有较小的画布并按比例放大，而不是较大的画布并按比例缩小。

```javascript
const scaleX = window.innerWidth / canvas.width;
const scaleY = window.innerHeight / canvas.height;
const scaleToFit = Math.min(scaleX, scaleY);
const scaleToCover = Math.max(scaleX, scaleY);
// 从左上角开始缩放。等同于 transform-origin: left top;
stage.style.transformOrigin = "0 0";
stage.style.transform = "scale(" + scaleToFit + ")";
```

##### 3.3.11.7 关闭透明度

如果项目使用的画布且不需要透明。在`getContext()`创建一个绘图上下文时把`alpha`选项设置为`false`。这个选项可以帮助浏览器进行内部优化。

```javascript
const ctx = canvas.getContext("2d", {alpha: false});
```

##### 3.3.11.8 更多建议

* 合并绘制操作：将画布的函数调用集合到一起（例如，绘制一条折线，而不是分成多条直线进行绘制）。
* 减少状态变化：避免不必要的画布状态改变。
* 局部重绘：渲染画布中的差异点，而非重绘整个画布。
* 尽可能避免`shadowBlur`特性。
* 尽可能避免`text rendering`。
* 尝试不同的方法来清除画布（`clearRect()`，`fillRect()`，调整`canvas`大小）。
* 绘制动画使用`Window.requestAnimationFrame()`，而非`setInterval()`。
* 谨慎使用大型物理库

### 3.4 SVG学习

参考：https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial

#### 3.4.1 SVG基础

`SVG`是一种`XML`语言，类似`XHTML`，可以用来绘制如下图所示的矢量图形。`SVG`
可以定义线和形状来创建图形，也可以修改已有的位图，或结合两种方式来创建图形。可以对图形和其组成部分进行变形、合成、滤镜方式来改变外观。

![3.4.1png](assets/3.4/1.png)

`SVG`诞生于`1999`年，之前有几个相互竞争的格式规范提交到了`W3C`，但都没有获得批准。主流浏览器均支持`SVG`。加载慢是`SVG`
的一个缺点。但`SVG`也有自身的优点，比如它实现了`DOM`接口（比`Canvas`方便），不需要安装第三方扩展。

##### 3.4.1.1 基本要素

`HTML`提供了定义标题、段落、表格等内容的元素。同样的，`SVG`也提供了用于定义圆形、矩形、简单或复杂的曲线的元素。一个简单的`SVG`
文档由`<svg>`根元素和基本的形状元素构成。此外，`SVG`可以使用`g`元素将若干个基本形状编成一个组。

`SVG`可以实现复杂的场景。`SVG`支持渐变、旋转、动画、滤镜效果、与`JavaScript`交互等功能，但是这些额外的语言特性，都需要在一个定义好的图形区域内实现。

* `SVG`的元素和属性必须按标准格式书写，因为`XML`是区分大小写的（这一点和`HTML`不同）
* `SVG`里的属性值必须用引号引起来，就算是数值也必须这样做。

##### 3.4.1.2 SVG兼容性

兼容性列表：https://caniuse.com/svg

各种浏览器对`SVG`标准的支持程度不同。因此制作好的图形在某种浏览器调试正常后，但在另一种浏览器中无法正常显示。这是因为`SVG`
在各种浏览器中存在差异。另外，如果你将其他技术和`SVG`一起使用（比如`JavaScript`和`CSS`），也会出现类似的情况。

##### 3.4.1.3 SVG的种类

从`2003`年成为`W3C`推荐标准，最接近完整版的`SVG`版本是`1.1`版，它基于`1.0`版，并增加了很多便于实现的模块化内容，`SVG1.1`
的第二个版本在`2011`年成为推荐标准，完整版的`SVG1.2`原本是下一个标准版本，但它被`SVG2.0`取代。`SVG2.0`
正在制定当中，它采用了类似`CSS3`的制定方法，通过若干松散耦合的组件形成一套标准。

除了完整版的`SVG`推荐标准，`W3C`工作组还在`2003`年推出了`SVG Tiny`和`SVG Basic`。这两个配置文件主要瞄准移动设备。`SVG Tiny`
主要是为性能低的小设备生成图元，而`SVG Basic`实现了完整版`SVG`里的很多功能，只舍弃了难以实现的大型渲染（比如动画）。`2008`
年，`SVG Tiny1.2`成为`W3C`推荐标准。

另外还有一些关于`SVG`打印规格的项目，增加对多页面和颜色管理的支持，但是这项工作已经终止。

##### 3.4.1.4 SVG基础示例

**绘制流程（详见`demo.svg`文件）：**

1、从`<svg>`根元素开始：

* 舍弃来自`(X)HTML`的`doctype`声明，因为基于`DTD`的`SVG`验证导致的问题比它能解决的问题更多。
* `SVG 2.0`之前`version`属性和`baseProfile`属性用来供其他类型的验证识别`SVG`的版本。`SVG 2.0`已弃用`version`
  和`baseProfile`这两个属性。
* 作为`XML`的一种，`SVG`必须正确地绑定命名空间（在`xmlns`属性中绑定）。

2、绘制一个完全覆盖图像区域的矩形`<rect>`，把背景颜色设为红色。
3、一个半径`80px`的绿色圆圈`<circle>`绘制在红色矩形的正中央（向右偏移`150px`，向下偏移`100px`）。
4、绘制文字`SVG`。文字被填充为白色，通过设置居中的锚点把文字定位到期望的位置：在这种情况下，中心点应该对应于绿色圆圈的中点。可以精细调整字体大小和垂直位置，确保最后的样式是美观的。

##### 3.4.1.5 SVG基础属性

`SVG`元素的渲染顺序：全局有效的规则是后覆盖前，越后面的元素越可见。

`Web`上的`SVG`文件可以直接在浏览器上展示，或通过以下几种方法嵌入到`HTML`文件中：

* 如果`HTML`是`XHTML`并且声明类型为`application/xhtml+xml`，可以直接把`SVG`嵌入到`XML`源码中。
* `SVG`可以直接被嵌入到`HTML`中。
* 可以使用`img`元素。
* 可以使用`object`元素引用`SVG`文件。
* 可以使用`iframe`元素引用`SVG`文件。
* 可以使用`JavaScript`动态创建并注入到`HTML DOM`中。

```html
<!-- 使用 object 元素引用 SVG 文件 -->
<object data="./assets/3.4/demo.svg" type="image/svg+xml"></object>
<!-- 使用 iframe 元素引用 SVG 文件 -->
<iframe src="./assets/3.4/demo.svg"></iframe>
```

##### 3.4.1.6 SVG文件类型

`SVG`文件有两种形式。

* 普通`SVG`文件是包含`SVG`标记的简单文本文件。推荐使用`.svg`（全部小写）作为此类文件的扩展名。
* 由于在某些应用（比如地图应用等）中使用`SVG`时，文件可能会很大，`SVG`标准允许使用`gzip`压缩的`SVG`文件。推荐使用`.svgz`
  （全部小写）作为此类文件的扩展名。不幸的是，如果服务器是微软的`IIS`服务器，使`gzip`压缩的`SVG`文件在所有的使用`SVG`
  的用户代理上可靠地运行是相当困难的，而且`Firefox`不能在本地机器上加载`gzip`压缩的`SVG`
  文件。除非知道处理发布内容的`Web`服务器才可以正确的处理`gzip`，否则要避免使用`gzip`压缩的`SVG`。

##### 3.4.1.7 Web服务器使用SVG文件

将`SVG`文件上传到`Web`服务器。对于普通`SVG`文件，服务器应该会发送如下`HTTP`响应标头：

```http request
Content-Type: image/svg+xml
Vary: Accept-Encoding
```

对于`gzip`压缩的`SVG`文件，服务器应该会发送如下`HTTP`响应标头：

```http request
Content-Type: image/svg+xml
Content-Encoding: gzip
Vary: Accept-Encoding
```

利用网络监控面板来检查服务器是否给`SVG`文件发送正确的`HTTP`响应标头：

* 提交一个`SVG`文件的`URL`
* 查看`HTTP`响应标头。如果发现服务器没有发送上述响应标头，那么你应该联系网站托管服务商。

如果不能说服他们为`SVG`修正服务器配置，我们还有一些可以自行解决的办法。请阅读服务器配置页面的帮助文档。

帮助文档：https://www.w3.org/services/svg-server/

服务器配置错误是`SVG`加载失败的常见原因，所以一定要确保服务器配置正确。如果不能把服务器配置成给`SVG`
文件发送上述响应标头，`Firefox`很有可能把该文件的标记显示成文本或乱码，甚至会要求查看者选择打开文件的应用程序。

#### 3.4.2 使用SVG来绘制图形

##### 3.4.2.1 网格坐标定位

`SVG`使用的坐标系统/网格系统和`Canvas`用的差不多（所有计算机绘图都差不多）。坐标系统以页面的左上角为`(0,0)`
坐标点，坐标以像素为单位，`x`轴正方向是向右，`y`轴正方向是向下。如下图所示，蓝色方形左上角坐标为`(x,y)`。

![3.4.2.png](assets/3.4/2.png)

**矩形示例**

```html
<!-- 定义一个矩形，即从左上角开始，向右延展 100px，向下延展 100px，形成一个 100*100 大的矩形。 -->
<rect x="0" y="0" width="100" height="100"/>
```

在`SVG`文档中的`1`个像素对应输出设备（比如显示屏）上的`1`个像素。但是这种情况是可以改变的。如同`CSS`
可以定义字体的绝对大小和相对大小，`SVG`也可以定义绝对大小（比如使用`pt`或`cm`标识维度）同时`SVG`
也能使用相对大小，只需给出数字，不标明单位，输出时就会采用用户的单位。

**在没有进一步规范说明的情况下，`1`个用户单位等同于`1`个屏幕单位。**

要明确改变这种设定，`SVG`里有多种方法。

```html
<!-- 定义了一个 100*100px 的 SVG 画布，这里 1 用户单位等同于 1 屏幕单位。 -->
<svg width="100" height="100"></svg>
<!--
    定义的画布尺寸是 200*200px。但是 viewBox 属性定义了画布上可以显示的区域：从 (0,0) 点开始，100*100px 的区域。
    这个 100*100px 的区域，会放到 200*200px 的画布上显示。于是就形成了放大两倍的效果。
-->
<svg width="200" height="200" viewBox="0 0 100 100"></svg>
```

用户单位和屏幕单位的映射关系被称为**用户坐标系统**。除缩放外，坐标系统还可以旋转、倾斜、翻转。默认的用户坐标系统`1`
用户像素等于设备上的`1`像素（但设备可能会自己定义`1`像素到底是多大）。在定义了具体尺寸单位的`SVG`中，比如单位是`cm`或`in`
，最终图形会以实际大小的`1:1`比例呈现。

例如：假设在用户的设备环境里，`1px `等于`0.2822222`毫米（即分辨率是`90dpi`），那么所有的`SVG`内容都会按照这种比例处理：`1cm`
等于`35.43307px`（即`35.43307`用户单位）.

##### 3.4.2.2 绘制矩形

```xml
<!-- rect 元素会在屏幕上绘制一个矩形。可以通过设置 6 个基本属性来控制它在屏幕上的位置和形状。 -->
<rect x="60" y="10" rx="10" ry="10" width="30" height="30"/>
```

**参数**

* `x`：矩形左上角的`x`位置，默认值为`0`。
* `y`：矩形左上角的`y`位置，默认值为`0`。
* `width`：矩形的宽度。
* `height`：矩形的高度。
* `rx`：圆角的`x`方位的半径，默认值为`0`。
* `ry`：圆角的`y`方位的半径，默认值为`0`。

##### 3.4.2.3 绘制圆形

```xml
<!-- circle 元素会在屏幕上绘制一个圆形。可以通过设置 3 个基本属性来设置圆形。 -->
<circle cx="25" cy="75" r="20"/>
```

**参数**

* `r`：圆的半径。
* `cx`：圆心的`x`位置，默认值为`0`。
* `cy`：圆心的`y`位置，默认值为`0`。

##### 3.4.2.4 绘制椭圆

```xml
<!-- ellipse 是 circle 元素更通用的形式，你可以分别缩放圆的 x 半径和 y 半径（通常数学家称之为长轴半径和短轴半径）。 -->
<ellipse cx="75" cy="75" rx="20" ry="5"/>
```

**参数**

* `rx`：椭圆的`x`半径。当`rx`省略时，会和`ry`保持一致。若都省略则不绘制图形。
* `ry`：椭圆的`y`半径。当`ry`省略时，会和`rx`保持一致。若都省略则不绘制图形。
* `cx`：椭圆中心的`x`位置，默认值为`0`。
* `cy`：椭圆中心的`y`位置，默认值为`0`。

##### 3.4.2.5 绘制线条

```xml
<!-- line 元素会在屏幕上绘制直线。它取两个点的位置作为属性，指定这条线的起点和终点位置。 -->
<line x1="10" x2="50" y1="110" y2="150" stroke="black" stroke-width="5"/>
```

**参数**

* `x1`：起点的`x`位置，默认值为`0`。
* `y1`：起点的`y`位置，默认值为`0`。
* `x2`：终点的`x`位置，默认值为`0`。
* `y2`：终点的`y`位置，默认值为`0`。

##### 3.4.2.6 绘制折线

```xml
<!-- polyline 是一组连接在一起的直线。因为它可以有很多的点，折线的所有点位置都放在一个 points 属性中。 -->
<svg>
  <polyline points="60, 110 65, 120 70, 115 75, 130 80, 125 85, 140 90, 135 95, 150 100, 145"/>
</svg>
```

**参数**

* `points`：点集数列。每个数字用空白、逗号、终止命令符或换行符分隔开。每个点必须包含`2`个数字，一个是`x`坐标，一个是`y`
  坐标。所以点列表`(0,0)`,`(1,1)`和`(2,2)`可以写成这样：`0 0, 1 1, 2 2`。

##### 3.4.2.7 绘制多边形

```xml
<!-- 
    polygon 和折线很像，它们都是由连接一组点集的直线构成。不同的是，polygon 的路径在最后一个点处自动回到第一个点。
    需要注意的是，矩形也是一种多边形，如果需要更多灵活性的话，你也可以用多边形创建一个矩形。
-->
<polygon points="50, 160 55, 180 70, 180 60, 190 65, 205 50, 195 35, 205 40, 190 30, 180 45, 180"/>
```

**参数**

* `points`：点集数列。每个数字用空白、逗号、终止命令符或换行符分隔开。每个点必须包含`2`个数字，一个是`x`坐标，一个是`y`
  坐标。所以点列表`(0,0)`,`(1,1)`和`(2,2)`可以写成这样：`0 0, 1 1, 2 2`。路径绘制完后闭合图形，直线将从`(2,2)`连接到`(0,0)`。

##### 3.4.2.8 绘制路径

```xml
<!-- 
   path 可能是 SVG 中最常见的形状。你可以用 path 元素绘制矩形（直角矩形或者圆角矩形）、圆形、椭圆、折线形、多边形，以及一些其他的形状。
   例如贝塞尔曲线、2 次曲线等曲线。因为 path 很强大也很复杂，所以会在后续章进行详细介绍。这里只介绍一个定义路径形状的属性。
-->
<path d="M20,230 Q40,205 50,230 T90,230" fill="none" stroke="blue" stroke-width="5"/>
```

**参数**

* `d`：一个点集数列及如何绘制路径的信息，即“命令+参数”的序列。

#### 3.4.3 路径

`path`元素是`SVG`基本形状中最强大的一个。你可以用它创建线条，曲线，弧形等。

`path`只需要设定很少的点，就可以创建平滑流畅的线条（比如曲线）。虽然`polyline`
元素也能实现类似的效果，但需要设置大量的点（点越密集，越接近连续，看起来越平滑流畅），并且这种做法不支持放大（放大后，点的离散程度会变得更明显）。所以在绘制
`SVG`时，对路径的良好理解很重要。虽然不建议使用`XML`编辑器创建复杂的路径，但了解其工作方式有助于识别和修复`SVG`中的显示问题。

`path`元素的形状是通过属性`d`定义的，属性`d`的值是一个“命令+参数”的序列。

每种命令都用一个关键字母来表示。比如，字母`M`表示的是`Move to`命令，当解析器读到这个命令时，它就知道你是打算移动到某个点。跟在命令字母后面的数字，就是期望移动到的
`x`和`y`轴坐标。比如移动到`(10,10)`这个点的命令，应该写成`M 10 10`。这一段命令结束后，解析器就会去读下一段命令。

每种命令都有两种表示方式，一种是用大写字母，表示采用绝对定位。一种是用小写字母，表示采用相对定位（即以上一个点为基准/原点进行移动）。

因为属性`d`采用的是用户坐标系统，所以不需标明单位。

##### 3.4.3.1 直线命令

`path`元素有`5`种绘制直线的命令。直线命令就是在两个点之间绘制直线。

###### 3.4.3.1.1 `Move to`命令

`Move to`命令，`M`命令需要两个参数，分别是期望移动到的点的`x`轴和`y`轴的坐标。因为`M`命令仅是移动画笔，所以使用`M`
命令，只会移动画笔，并不会在两点之间画线。因此，`M`命令经常出现在路径的开始处，用来指明从何处开始绘制。

```text
M x y
大写字母，表示采用绝对定位
m dx dy
小写字母，表示采用相对定位（即以上一个点为基准/原点进行移动）
```

###### 3.4.3.1.2 `Line to`命令

能够真正绘制出线的命令有三个，最常用的是`Line to`命令，`L`命令需要两个参数，分别是期望移动的点的`x`轴和`y`轴坐标，`L`
命令将会在当前位置和新位置（`L`之前画笔所在的点）之间画一条线段。

```text
L x y
大写字母，表示采用绝对定位
l dx dy
小写字母，表示采用相对定位（即以上一个点为基准/原点进行移动）
```

###### 3.4.3.1.3 `Horizontal lineto`命令

`H`命令绘制水平线。只需要一个参数，标明在`x`轴期望移动到的位置，因为它只在坐标轴的水平方向上移动。

```text
H x
大写字母，表示采用绝对定位
h dx
小写字母，表示采用相对定位（即以上一个点为基准/原点进行移动）
```

###### 3.4.3.1.4 `Vertical lineto`命令

`V`命令绘制垂直线。只需要一个参数，标明在`y`轴期望移动到的位置，因为它只在坐标轴的水平方向上移动。

```text
V y
大写字母，表示采用绝对定位
v dy
小写字母，表示采用相对定位（即以上一个点为基准/原点进行移动）
```

###### 3.4.3.1.5 `Closepath`命令

`Z`命令会从当前点绘制一条到路径起点的直线，虽然并不总是需要闭合路径，但它经常被放到路径的最后。`Z`命令不区分大小写。

```text
Z
z
大小写效果一样
```

###### 3.4.3.1.6 矩形示例

```xml
<!-- 以下两个矩形是一致的 -->
<svg>
  <path d="M 10 10 H 90 V 90 H 10 Z" fill="transparent" stroke="black"/>
  <!-- 画笔移动到 (10,10) 点，由此开始，向右移动到 90 像素构成一条水平线，然后向下移动到 90 像素，然后向左移动到 10 像素，然后再回到起点。 -->
  <path d="M 10 10 h 80 v 80 h -80 Z" fill="transparent" stroke="black"/>
  <!-- 画笔移动到 (10,10) 点，由此开始，向右移动 80 像素构成一条水平线，然后向下移动 80 像素，然后向左移动 80 像素，然后再回到起点。 -->
</svg>
```

`polygon`和`polyline`可以绘制相同的图形。那么使用`path`命令的意义在何处？

如果只是画直线，`polygon`和`polyline`元素可能会更好用。但`path`命令可以实现更多效果。`path`是众多开发者在`SVG`
绘制中经常使用的。理论上，它们不存在性能上的优劣。但是通过脚本生成的`path`可能有所不同，因为`polygon`和`polyline`
只需要指明点，而`path`在这方面的语法会更复杂一些。

##### 3.4.3.2 曲线命令

`path`元素有`3`种绘制平滑曲线的命令。其中两种用于绘制贝塞尔曲线，另外一种用于绘制弧形/圆的一部分。贝塞尔曲线的类型有很多，但是在
`path`元素种，只存在两种贝塞尔曲线：三次贝塞尔曲线`C`和二次贝塞尔曲线`Q`。

###### 3.4.3.2.1 `Cubic Bezier Curve`命令

使用`C`命令创建的三次贝塞尔曲线，需要配置两控制点及终点三组坐标参数。前两组坐标是控制点，`(x1,y1)`是起点的控制点，`(x2,y2)`
是终点的控制点，最后一组坐标`(x,y)`是曲线的终点。控制点是描述曲线的起始点及各点的斜率，是从起点斜率到终点斜率的渐变过程。

```text
C x1 y1, x2 y2, x y
大写字母，表示采用绝对定位
c dx1 dy1, dx2 dy2, dx dy
小写字母，表示采用相对定位（即以上一个点为基准/原点进行移动）
```

```svg
<!--
    从左往右看，控制点在水平方向上逐渐分开。从上往下看，控制点和曲线坐标之间离得越来越远。
    曲线沿着起点到第一控制点的方向伸出，逐渐弯曲，然后沿着第二控制点到终点的方向结束。
-->
<svg version="1.1" baseProfile="full" width="190" height="160" xmlns="http://www.w3.org/2000/svg">
  <rect width="190" height="160" fill="white"/>
  <path d="M 10 10 C 20 20, 40 20, 50 10" stroke="black" fill="transparent"/>
  <path d="M 70 10 C 70 20, 110 20, 110 10" stroke="black" fill="transparent"/>
  <path d="M 130 10 C 120 20, 180 20, 170 10" stroke="black" fill="transparent"/>
  <path d="M 10 60 C 20 80, 40 80, 50 60" stroke="black" fill="transparent"/>
  <path d="M 70 60 C 70 80, 110 80, 110 60" stroke="black" fill="transparent"/>
  <path d="M 130 60 C 120 80, 180 80, 170 60" stroke="black" fill="transparent"/>
  <path d="M 10 110 C 20 140, 40 140, 50 110" stroke="black" fill="transparent"/>
  <path d="M 70 110 C 70 140, 110 140, 110 110" stroke="black" fill="transparent"/>
  <path d="M 130 110 C 120 140, 180 140, 170 110" stroke="black" fill="transparent"/>
</svg>
```

![3.4.3.png](assets/3.4/3.png)

使用`S`命令创建的三次贝塞尔曲线，它的第一控制点默认为第二控制点的轴对称点（保持斜率不变）。

```text
S x2 y2, x y
大写字母，表示采用绝对定位
s dx2 dy2, dx dy
小写字母，表示采用相对定位（即以上一个点为基准/原点进行移动）
```

如果`S`命令跟在`C`或`S`命令后面，则会将前命令第二控制点的中心对称点作为它的第一控制点。如果`S`命令单独使用，前面没有`C`
或`S`命令，那当前点将作为第一个控制点。

```svg
<!-- 图中左侧红色标记的点对应的控制点即为蓝色标记点 -->
<svg version="1.1" baseProfile="full" width="190" height="160" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="white"/>
  <path d="M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80" fill="transparent" stroke="black"/>
</svg>
```

![3.4.4.png](assets/3.4/4.png)

###### 3.4.3.2.2 二次贝塞尔曲线命令

使用`Q`命令创建的二次贝塞尔曲线，需要配置控制点及终点两组坐标参数。`(x1,y1)`是控制点，`(x,y)`
是曲线的终点。控制点是描述曲线的起始点及各点的斜率，是从起点斜率到终点斜率的渐变过程。

```text
Q x1 y1, x y
大写字母，表示采用绝对定位
q dx1 dy1, dx dy
小写字母，表示采用相对定位（即以上一个点为基准/原点进行移动）
```

```svg

<svg version="1.1" baseProfile="full" width="190" height="160" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="white"/>
  <path d="M 10 80 Q 95 10 180 80" stroke="black" fill="transparent"/>
</svg>
```

![3.4.5.png](assets/3.4/5.png)

如果`T`命令跟在`Q`或`T`命令后面，则会将前命令控制点的中心对称点被作为它的控制点。如果`T`命令单独使用，前面没有`Q`或`T`
命令，那么控制点就会被认为和终点是同一个点，所以画出来的将是一条直线。

```text
Q x1 y1, x y
大写字母，表示采用绝对定位
q dx1 dy1, dx dy
小写字母，表示采用相对定位（即以上一个点为基准/原点进行移动）
```

```svg
<!-- 图中左侧红色标记的点对应的控制点即为蓝色标记点。 -->
<svg version="1.1" baseProfile="full" width="190" height="160" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="white"/>
  <path d="M 10 80 Q 52.5 10, 95 80 T 180 80" stroke="black" fill="transparent"/>
</svg>
```

![3.4.6.png](assets/3.4/6.png)

###### 3.4.3.2.3 弧形命令

`A`命令绘制弧形。需要`7`个参数。

* `rx`：弧形对应椭圆`x`轴半径。
* `ry`：弧形对应椭圆`y`轴半径。
* `x-axis-rotation`：椭圆横轴相对于`x`轴的旋转角度。
* `large-arc-flag`：在前三个参数确定的情况下，满足当前点到弧形终点`(x,y)`位置条件的弧形会有`4`条。`large-arc-flag`
  决定弧线是否大于`180°`，取值为`0`表示绘制小角度弧形，取值为`1`表示绘制大角度弧形。
* `sweep-flag`：在前四个参数确定的情况下，满足当前点到弧形终点`(x,y)`位置条件的弧形会有`2`条。`sweep-flag`
  表示弧线的方向，取值为`0`表示绘制逆时针方向的弧形，取值为`1`表示绘制顺时针方向的弧形。
* `x`：弧形终点的`x`坐标。
* `y`：弧形终点的`y`坐标。

```text
A rx ry x-axis-rotation large-arc-flag sweep-flag x y
大写字母，表示采用绝对定位
a rx ry x-axis-rotation large-arc-flag sweep-flag dx dy
小写字母，表示采用相对定位（即以上一个点为基准/原点进行移动）
```

**`x-axis-rotation`示例**

```svg
<!--
    图中的两个椭圆弧(x 半径 30, y 半径 50)被对角线切开。第一个椭圆弧的 x-axis-rotation 是 0，所以弧形所在的椭圆是正置的（没有倾斜）。
    第二个椭圆弧的 x-axis-rotation 是 -45，所以这是一个旋转了 -45° 的椭圆，并以短轴为分割线，形成了两个对称的弧形。
-->
<svg version="1.1" baseProfile="full" width="320" height="320" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="white"/>
  <path d="M 10 315
           L 110 215
           A 30 50 0 0 1 162.55 162.45
           L 172.55 152.45
           A 30 50 -45 0 1 215.1 109.9
           L 315 10" stroke="black" fill="green" stroke-width="2" fill-opacity="0.5"/>
</svg>
```

![3.4.7.png](assets/3.4/7.png)

```svg
<!-- 上图没有旋转的椭圆，因为两点连线（即对角线）穿过了椭圆的中心，所以只有 2 种弧形可以选择。如下图所示为一般情况，会有两个椭圆，4 种弧。 -->
<svg version="1.1" baseProfile="full" width="320" height="320" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="white"/>
  <path d="M 10 315
           L 110 215
           A 36 60 0 0 1 150.71 170.29
           L 172.55 152.45
           A 30 50 -45 0 1 215.1 109.9
           L 315 10" stroke="black" fill="green" stroke-width="2" fill-opacity="0.5"/>
  <circle cx="150.71" cy="170.29" r="2" fill="red"/>
  <circle cx="110" cy="215" r="2" fill="red"/>
  <ellipse cx="144.931" cy="229.512" rx="36" ry="60" fill="transparent" stroke="blue"/>
  <ellipse cx="115.779" cy="155.778" rx="36" ry="60" fill="transparent" stroke="blue"/>
</svg>
```

![3.4.8.png](assets/3.4/8.png)

**`large-arc-flag`和`sweep-flag`示例**

```svg
<!--
    x-axis-rotation 示例的 4 种不同路径将由 large-arc-flag（角度大小）和 sweep-flag（弧线方向）这两个参数决定。
    large-arc-flag 决定弧线是大于还是小于 180 度，0 表示小角度弧，1 表示大角度弧。
    sweep-flag 表示弧线的方向，0 表示从起点到终点沿逆时针画弧，1 表示从起点到终点沿顺时针画弧。
-->
<svg version="1.1" baseProfile="full" width="350" height="350" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="white"/>
  <path d="M 80 80
           A 45 45, 0, 0, 0, 125 125
           L 125 80 Z" fill="green"/>
  <path d="M 230 80
           A 45 45, 0, 1, 0, 275 125
           L 275 80 Z" fill="red"/>
  <path d="M 80 230
           A 45 45, 0, 0, 1, 125 275
           L 125 230 Z" fill="purple"/>
  <path d="M 230 230
           A 45 45, 0, 1, 1, 275 275
           L 275 230 Z" fill="blue"/>
</svg>
```

![3.4.9.png](assets/3.4/9.png)

#### 3.4.4 填充和描边

可以使用几种方法来着色（包括指定对象的属性）使用内联`CSS`样式、内嵌`CSS`样式，或者使用外部`CSS`样式文件。大多数的`Web`网站的
`SVG`使用的是内联样式`CSS`，对于这些方法都有优缺点。

##### 3.4.4.1 填充

填充可以通过在元素上设置`fill`和`stroke`属性实现。`fill`设置对象内部的颜色，`stroke`设置对象的线条的颜色。可以使用`CSS`
颜色命名方案定义颜色，比如颜色名（`red`）、`rgb`值、十六进制值、`rgba`值等。

```svg
<!-- 绘制了一个背景为紫色，边框为蓝色的 100*100px 的矩形 -->
<svg version="1.1" baseProfile="full" width="120" height="120" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="white"/>
  <rect x="10" y="10" width="100" height="100" stroke="blue" fill="purple" fill-opacity="0.5" stroke-opacity="0.8"/>
</svg>
```

定义填充色和边框色的不透明度，属性`fill-opacity`控制填充色的不透明度，属性`stroke-opacity`控制描边的不透明度。

**备注：`FireFox 3+`支持`rgba`
值，并提供相同的效果，但为了在其他浏览器中保持兼容，最好和填充/描边的不透明度分开使用。如果同时指定了`rgba`
值和填充/描边不透明度，它们将都被调用。**

##### 3.4.4.2 描边

可以通过一系列属性来控制绘制描边的样式。

```text
stroke-width = value
// 设置描边宽度。
stroke-linecap = type
// 设置描边末端样式。
stroke-linejoin = type
// 设定描边与描边间接合处的样式。
stroke-miterlimit = value
// 限制当两条描边相交时交接处最大长度；所谓交接处长度（斜接长度）是指线条交接处内角顶点到外角顶点的长度。
stroke-dasharray = value
// 设置当前虚线样式。例如：stroke-dasharray="5,10,5"
stroke-dashoffset = value
// 设置虚线样式的起始偏移量。
fill-rule = type
// 定义了用来确定一个多边形内部区域的算法。
```

**`stroke-linecap`示例**

`stroke-linecap`决定了线段端点显示的样子。属性值如下：

* `butt`（默认值）：线条末端呈正方形。
* `round`：线条末端呈圆形，圆形的半径也是由`stroke-width`控制的。
* `square`：线条末端呈方形，通过添加一个宽与`stroke-width`相同且高为`stroke-width`一半的盒子实现。

```svg
<!-- stroke-linecap 的三种形式 -->
<svg version="1.1" baseProfile="full" width="160" height="120" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="white"/>
  <line x1="40" x2="120" y1="20" y2="20" stroke="black" stroke-width="20" stroke-linecap="butt"/>
  <line x1="40" x2="120" y1="60" y2="60" stroke="black" stroke-width="20" stroke-linecap="square"/>
  <line x1="40" x2="120" y1="100" y2="100" stroke="black" stroke-width="20" stroke-linecap="round"/>
</svg>
```

![3.4.10.png](assets/3.4/10.png)

**`stroke-linejoin`示例**

`stroke-linejoin`决定了两线段连接处所显示的样子。属性值如下：

* `miter`（默认值）：用尖角连接路径段。通过在路径段的切线处延伸笔触的外边缘直到它们相交，来形成拐角。受到`stroke-miterlimit`
  属性的影响。如果超出了`stroke-miterlimit`，则会呈现`bevel`的效果。
* `round`：使用圆角连接路径片段。圆角的半径是`stroke-width`。
* `bevel`：在相连部分的末端填充一个额外的以三角形为底的区域，每个部分都有各自独立的矩形拐角。

```svg
<!-- stroke-linejoin 的三种形式 -->
<svg version="1.1" baseProfile="full" width="160" height="280" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="white"/>
  <polyline points="40 60 80 20 120 60" stroke="black" stroke-width="20"
            stroke-linecap="butt" fill="none" stroke-linejoin="miter"/>

  <polyline points="40 140 80 100 120 140" stroke="black" stroke-width="20"
            stroke-linecap="round" fill="none" stroke-linejoin="round"/>

  <polyline points="40 220 80 180 120 220" stroke="black" stroke-width="20"
            stroke-linecap="square" fill="none" stroke-linejoin="bevel"/>
</svg>
```

![3.4.11.png](assets/3.4/11.png)

**`stroke-miterlimit`注意事项**

如果两条线交汇在一起形成一个尖角，且属性`stroke-linejoin`指定为`miter`，斜接有可能远远超过出路径轮廓的`stroke-width`
。属性`stroke-miterlimit`给斜接长度与`stroke-width`的比率加了一个极限。当到达极限时，交汇处由斜接变成倒角。

`stroke-miterlimit`是斜接长度（斜接的外尖角和内夹角之间的距离）与`stroke-width`的比率。`stroke-miterlimit`
与两条线之间的角度`θ`有如下关系：

* `stroke-miterlimit = miterLength / stroke-width = 1 / sin ( θ / 2 )`
* 斜接默认值为`4.0`，`θ`小于`29`度的斜接会转换成倒角（`sin(14.5°) ≈ 0.250380`）。
* 斜接限定值为`√2 ≈ 1.4142136`（四舍五入）时，将去除所有锐角的斜接，仅保留钝角或直角的斜接。
* `1.0` 是合法的斜接限定值，但这会去除所有斜接。
* 小于`1.0`的值不是合法的斜接限定值。

**虚线示例**

`stroke-dasharray`属性的参数，是一组用逗号分割的数字序列。`stroke-dashoffset`属性设置起始偏移量。

**注意，与`path`不同的是，这里的数字必须用逗号分割（空格会被忽略）。**

每一组数字，第一个用来表示填色区域的长度，第二个用来表示非填色区域的长度。在下例中，红色路径会先做`5`
像素单位的填色，紧接着是`5`个空白单位，然后又是`5`个单位的填色。如果你想要更复杂的虚线模式，你可以定义更多的数字。黑色路径指定了
`3`个数字，这种情况下，数字会循环两次，形成一个偶数的虚线模式。所以该路径依次渲染`5`个填色单位，`10`个空白单位，`5`
个填色单位。然后从头进行一次循环， **但这次依次渲染`5`个空白单位，`10`个填色单位，`5`个空白单位** 。通过两次循环得到偶数模式，并重复这个偶数模式。

```svg

<svg version="1.1" baseProfile="full" width="200" height="150" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="white"/>
  <path d="M 10 75 Q 50 10 100 75 T 190 75" stroke="black"
        stroke-linecap="round" stroke-dasharray="5,10,5" fill="none"/>
  <path d="M 10 75 L 190 75" stroke="red"
        stroke-linecap="round" stroke-width="1" stroke-dasharray="5,5" fill="none"/>
</svg>
```

![3.4.12.png](assets/3.4/12.png)

**`fill-rule`示例**

参考：https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/fill-rule

`fill-rule`是表现属性，它定义了用来确定一个多边形内部区域的算法。

`fill-rule`可以被应用于任何元素，但只会在`<path>`，`<polygon>`，`<polyline>`，`<text>`，`<textPath>`，`<tref>`，`<tspan>`中有效。

* `nonzero`（默认值）：非零规则`non-zero winding rule`。起始值为`0`，射线会和路径相交，形成一个转向的箭头。若为顺时针方向则`+1`
  ，若为逆时针方向则`-1`。若总计数值非`0`，则认为是路径内部（填充）；若总计数值为`0`，则认为是路径外部（不填充）。
* `evenodd`：奇偶规则`even-odd winding rule`。起始值为`0`，射线会和路径相交，每交叉一条路径，计数就`+1`
  。若总计数值为奇数，则认为是路径内部（填充）；若为偶数，则认为是路径外部（不填充）。

**注意：`nonzero`规则和`evenodd`规则统计的东西不一样，`nonzero`是计算顺时针逆时针数量，`evenodd`是交叉路径数量。**

**`nonzero`示例**

```svg

<svg version="1.1" baseProfile="full" width="320" height="120" viewBox="-10 -10 320 120"
     xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="white"/>
  <!-- nonzero 填充规则被用于路径段会相交的形状上的效果 -->
  <polygon
          fill-rule="nonzero"
          stroke="red"
          points="50,0 21,90 98,35 2,35 79,90"/>
  <!--
  nonzero 填充规则被用于一个形状在另一形状内部的效果
  这两个正方形的路径段方向相同（都是顺时针）
  -->
  <path
          fill-rule="nonzero"
          stroke="red"
          d="M110,0  h90 v90 h-90 z
    M130,20 h50 v50 h-50 z"/>
  <!--
  这个例子与第二个例子几乎相同，唯一的区别是：两个形状的路径段方向相反
  外面的正方形是顺时针，里面的正方形则是逆时针
  -->
  <path
          fill-rule="nonzero"
          stroke="red"
          d="M210,0  h90 v90 h-90 z
    M230,20 v50 h50 v-50 z"/>
</svg>
```

![3.4.13.png](assets/3.4/13.png)
**`evenodd`示例**

```svg

<svg version="1.1" baseProfile="full" width="320" height="120" viewBox="-10 -10 320 120"
     xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="white"/>
  <!-- evenodd 填充规则被用于路径段会相交的形状上的效果 -->
  <polygon
          fill-rule="evenodd"
          stroke="red"
          points="50,0 21,90 98,35 2,35 79,90"/>
  <!--
  evenodd 填充规则被用于一个形状在另一形状内部的效果
  这两个正方形的路径段方向相同（都是顺时针）
  -->
  <path
          fill-rule="evenodd"
          stroke="red"
          d="M110,0  h90 v90 h-90 z
    M130,20 h50 v50 h-50 z"/>
  <!--
  这个例子与第二个例子几乎相同，唯一的区别是：两个形状的路径段方向相反
  外面的正方形是顺时针，里面的正方形则是逆时针
  -->
  <path
          fill-rule="evenodd"
          stroke="red"
          d="M210,0  h90 v90 h-90 z
    M230,20 v50 h50 v-50 z"/>
</svg>
```

![3.4.14.png](assets/3.4/14.png)

##### 3.4.4.3 使用CSS设置样式

可以通过`CSS`来设置填充和描边。语法和`HTML`里使用`CSS`一样，只需要把`background-color`、`border`改成`fill`和`stroke`
。注意，不是所有的属性都能用`CSS`来设置。上色和填充的部分一般是可以用`CSS`来设置的，比如`fill`，`stroke`，`stroke-dasharray`
等，但是不包括渐变和图案等功能。另外，`width`、`height`，以及路径的命令等，都不能用`CSS`设置。

```svg

<svg version="1.1" baseProfile="full" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <!--
    <defs> 表示定义，这里面可以定义一些不会在 SVG 图形中出现、但是可以被其他元素使用的元素。
    可以使用hover这样的伪类来创建翻转之类的效果
    一些可以在 HTML 里使用的 CSS，在 svg 里可能无法正常工作，比如before和after伪类。
  -->
  <defs>
    <style>
      <![CDATA[
        #MyRect {
          stroke: black;
          fill: red;
        }
        #MyRect:hover {
          stroke: black;
          fill: blue;
        }
      ]]>
    </style>
  </defs>
  <rect width="100%" height="100%" fill="white"/>
  <rect x="10" y="10" width="180" height="180" id="MyRect"/>
  <!-- CSS 可以利用 style 属性插入到元素的行间 -->
  <rect x="10" y="10" width="180" height="180" style="stroke: black; fill: green;"/>
</svg>
```

![3.4.15.png](assets/3.4/15.png)

#### 3.4.5 渐变

##### 3.4.5.1 线性渐变

线性渐变沿着直线改变颜色。线性渐变需要在`SVG`文件的`defs`元素内部，创建一个`<linearGradient>`元素。

线性渐变内部有几个`stop`结点，这些结点通过指定位置的`offset`（偏移）和`stop-color`
（颜色中值）来说明在渐变的特定位置上应该是什么颜色；可以直接指定这两个属性值，也可以通过`CSS`
来指定他们的值，该例子中混合使用了这两种方法。你可以根据需求按照自己的喜好插入很多中间颜色，但是偏移量应该始终从`0%`
开始（或`0`，百分号可省略），到`100%`（或`1`）结束。如果`stop`设置的位置有重合，将使用`XML`
树中较晚设置的值。类似于填充和描边，通过指定属性`stop-opacity`来设置某个位置的半透明度。

详见`linearGradient.svg`文件。

##### 3.4.5.2 径向渐变

径向渐变与线性渐变相似，只是它是从一个点开始发散绘制渐变。径向渐变需要在`SVG`文件的`defs`中创建一个`<radialGradient>`元素。

详见`radialGradient.svg`文件。

`spreadMethod`属性定义了当渐变到达边缘时的行为，但此时该对象尚未被填充颜色。

* `pad`（默认值）：衬垫效果。当渐变到达终点时，最终的偏移颜色被用于填充对象剩下的空间。
* `reflect`：反射效果。会让渐变一直持续下去，效果是与渐变本身是相反的，以`100%`偏移位置的颜色开始，渐变到`0%`
  位置的颜色，然后再渐变`100%`位置的颜色。
* `repeat`：重复效果。会让渐变一直持续下去，效果是与渐变本身是相同的，它会跳回到最初的颜色然后继续渐变。

线性和径向渐变都有`gradientUnits`（渐变单元）属性，它定义了用来描述渐变的大小和方向的单元系统。

* `objectBoundingBox`（默认值）：表示使用渐变元素的矩形百分比指定位置大小。设置`0`到`1`的坐标值，渐变单元就会自动缩放到渐变元素对应大小。
* `userSpaceOnUse`：表示几何属性的所有坐标都是应用时定义的用户坐标系。

详见`radialGradient-spreadMethod.svg`文件。

#### 3.4.6 图案

##### 3.4.6.1 图案

图案`patterns`是`SVG`中用到的最让人混淆的填充类型之一。`<pattern>`需要定义在`SVG`文件的`<defs>`内。在`patterns`
元素可以包含任何之前包含的其他基本形状，并且每个形状都可以使用之前学习过（包括渐变和半透明）的任何样式。

详见`pattern.svg`文件。

`patterns`元素上定义了`width`和`height`属性，用于描述图案容器的标准宽高（绘制一份图案）。可以使用`x`和`y`属性添加初始偏移。

`patterns`的`patternsUnits`（图案单元）属性，它定义了用来描述图案容器（绘制一份图案）的大小和方向的单元系统。

* `objectBoundingBox`（默认值）：表示使用图案元素的矩形百分比指定位置大小。设置`0`到`1`的坐标值，图案单元就会自动缩放到图案元素对应大小。
* `userSpaceOnUse`：表示几何属性的所有坐标都是应用时定义的用户坐标系。

`patterns`的`patternsContentUnits`（图案内容单元）属性，用于描述`patterns`元素基于基本图形使用的单元系统。

* `objectBoundingBox`：表示使用图案元素的矩形百分比指定位置大小。设置`0`到`1`的坐标值，图案内容单元就会自动缩放到图案元素对应大小。
* `userSpaceOnUse`（默认值）：表示几何属性的所有坐标都是应用时定义的用户坐标系。

**需要指定`patternsContentUnits`和`patternsUnits`中的一个，否则`patterns`中绘制的图形和`patterns`元素使用的坐标系不同。**

如果图案改变了大小，`patterns`会自适应其大小，但是图案里的图形不会自适应。

* `patternContentUnits`设置为`objectBoundingBox`时，`pattern`会自动缩放以保证`pattern`内部的图形数目和重复不变。
* `patternUnits`设置为`userSpaceOnUse`时，`pattern`本身会保持不变，只是重复更多次去填充。

`objectBoundingBox`如果在`Gecko`绘制半径设小于`0.075`圆，绘制可能会出现问题。应尽量避免在`objectBoundingBox`单元绘制图形。

详见`pattern-compare.svg`文件。

##### 3.4.6.2 嵌入光栅图像

`SVG`的`<image>`元素允许在一个`SVG`对象内部添加光栅图像（`<image>`元素至少需要支持`PNG`、`JPG`和`SVG`格式文件）。

嵌入的图像变成一个普通的`SVG`元素。可以在其内容上用剪切、遮罩、滤镜、旋转以及其他`SVG`工具。

```svg

<svg version="1.1" baseProfile="full" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <image x="90" y="-65" width="128" height="146" transform="rotate(45)"
         xlink:href="https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/image/mdn_logo_only_color.png"/>
</svg>
```

**注意事项：**

* 如果没有设置`x`或`y`属性，会自动设置为`0`。
* 如果没有设置`width`或`height`属性，会自动设置为`0`。
* 如果`width`或`height`等于`0`，则不会绘制这个图像。

##### 3.4.6.3 嵌入XML

参考：https://www.cnblogs.com/fangsmile/p/11649683.html
https://developer.mozilla.org/zh-CN/docs/Web/MathML/Authoring

`SVG`是一个`XML`应用，所以可以在`SVG`文档的任何位置嵌入任意`XML`。通常不会定义其他`SVG`对此`SVG`的影响。`foreignObject`
元素可以在其内部使用具有其它`XML`命名空间的`XML`元素。即借助`foreignObject`标签，可以直接在`SVG`内部嵌入`XHTML`元素。`HTML`
布局比`SVG text`元素更适合长文本。另一个常用的案例是用`MathML`写方程式。`foreignObject`是一个`SVG`
元素，所以可以使用任何`SVG`的方法对其内容进行操作。

**备注：`foreignObject`元素的内容是能被浏览器加工的。一个独立的`SVG`浏览器不太可能呈现`HTML`或`MathML`。**

#### 3.4.7 文本

`SVG`两种文本模式：一种是写在图像中的文本，另一种是`SVG`字体。

##### 3.4.7.1 text元素

`text`元素定义了一个由文字组成的图形。

**注意：`text`上可以使用渐变、图案、剪切路径、遮罩或滤镜。**

* `x`和`y`属性设置文本在视口中显示的位置。
* `text-anchor`属性用来描述该文本与所给点的对齐方式：`start`（开头对齐）、`middle`（中间对齐）、`end`（末尾对齐）或`inherit`（继承）。
* `fill`属性设置文本填充颜色。
* `stroke`属性设置文本描边颜色，可以使用渐变或图案。
* `font-family`：允许通过给定一个有先后顺序的，由字体名或字体族名组成的列表来为选定的元素设置字体。
* `font-style`：字体中选择`normal`（正常）、`italic`（斜体）或`oblique`（斜体，可加角度）的字体外观。
* `font-weight`：设置字体的粗细程度。一些字体只提供`normal`（正常）和`bold`（加粗）两种值。
* `font-variant`：用于设置文本的字体变体。主要用于控制小型大写字母（`small-caps`）的显示，即所有的小写字母都会被转换为大写字母，但是字体大小会比正常的大写字母小。
* `font-stretch`：字体中选择`normal`（正常）、`semi-condensed、condensed、extra-condensed、ultra-condensed`
  （紧凑）或`semi-expanded、expanded、extra-expanded、ultra-expanded`（扩展）的字体外观。
* `font-size`：设置字体大小。
* `font-size-adjust`：定义字体大小应取决于小写字母，而不是大写字母。在字体较小时，字体的可读性主要由小写字母的大小决定，通过此选项即可进行调整。
* `letter-spacing`：用于设置文本字符的间距表现。
* `word-spacing`：设置标签、单词之间的空格长度。
* `text-decoration`：设置文本上的装饰性线条的外观。比如下划线。

##### 3.4.7.2 tspan元素

`tspan`元素用来标记文本的子部分，它必须是一个`text`元素或别的`tspan`元素的子元素。一个典型的用法是把句子中的一个词变成粗体红色。

* `x`：为容器设置一个新绝对`x`坐标。它覆盖了默认的当前的文本位置。可以接收一个数列，将逐个应用到`tspan`元素内的每一个字符。
* `y`：为容器设置一个新绝对`y`坐标。它覆盖了默认的当前的文本位置。可以接收一个数列，将逐个应用到`tspan`元素内的每一个字符。
* `dx`：从当前位置，用一个水平偏移开始绘制文本。可以接收一个数列，将逐个应用到`tspan`元素内的每一个字符并累计偏移。
* `dy`：从当前位置，用一个垂直偏移开始绘制文本。可以接收一个数列，将逐个应用到`tspan`元素内的每一个字符并累计偏移。
* `rotate`：把所有的字符旋转一个角度。可以接收一个数列，则使每个字符旋转分别旋转到那个值，剩下的字符根据最后一个值旋转。
* `textLength`：这是一个很模糊的属性，给出字符串的计算长度。如果度量的文字和长度不满足`textLength`，则允许渲染引擎精细调整字型的位置。

##### 3.4.7.3 textPath元素

`textPath`元素将文本放置在其内部，并通过`xlink:href`属性值引用`<path>`元素，就可以让文字块呈现在`<path>`元素给定的路径上了。

详见`text.svg`文件。

##### 3.4.7.4 SVG字体

制定`SVG`时，并未在浏览器支持`Web`字体。访问字体文件让字体正确呈现是具有稳定性的。因此，通过字体描述技术实现`SVG`
文字。而不是为了和其他（`PostScript`，`OTF`）格式兼容，仅是为了将字形信息嵌入`SVG`进行呈现。

**备注：`SVG`字体当前只在`Safari`和`Android`浏览器中受支持。`Chrome 38`（`Opera 25`）移除了这个功能，`Firefox`
已经无限期推迟实施它以专注于实现`WOFF`。`Batik`和部分`Inkscape`支持`SVG` 字体嵌入。**

因为该功能已经移除，不做过多赘述。

#### 3.4.8 基础变形

利用`<g>`元素，可以把属性赋给一整个元素集合。这是`<g>`元素唯一的用途。

##### 3.4.8.1 平移

`translate(x,y)`能把元素移动一段距离，甚至你可以根据相应的属性定位它。如果没有指定`y`，则默认值为`0`。

##### 3.4.8.2 旋转

`rotate(a)`能把元素旋转`a`度。

##### 3.4.8.3 斜切

参考：https://juejin.cn/post/7145014612713766948

`skewX(a)`，`skewY(b)`都可以将元素倾斜一定角度并按照斜切方向移动一定距离。不支持`skew(x,y)`。

##### 3.4.8.4 缩放

`scale(x,y)`可以改变元素的尺寸。`0.5`表示收缩到`50%`。如果`y`缺省，则默认赋值为`x`。

##### 3.4.8.5 矩阵操作

参考：https://www.cnblogs.com/bbcfive/p/11155824.html
https://www.cnblogs.com/fangsmile/p/9324194.html

上述所有变形可以使用一个`2x3`的变形矩阵替代实现。使用`matrix(a, b, c, d, e, f)`设置变形矩阵。它将上一个坐标系统的坐标映射到新的坐标系统：

x<sub>new</sub> = ax<sub>prev</sub> + cy<sub>prev</sub> + e

y<sub>new</sub> = bx<sub>prev</sub> + dy<sub>prev</sub> + f

详见`transform.svg`文件

##### 3.4.8.6 坐标系统上的变形

如果使用了变形，会在元素内部建立一个应用了这些变形的新坐标系统，你为该元素和它的子元素指定的单位可能不是`1:1`
像素映射。但是依然会根据这个变形进行平移、旋转、斜切、缩放操作。

```svg

<g transform="scale(2)">
  <rect width="50" height="50"/>
</g>
```

##### 3.4.8.7 SVG嵌套变形

`SVG`允许嵌入别的`<svg>`元素。可以利用内部`<svg>`元素的`viewBox`、`width`和`height`属性创建一个新的坐标系统。

```svg

<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <svg width="100" height="100" viewBox="0 0 50 50">
    <rect width="50" height="50"/>
  </svg>
</svg>
```

#### 3.4.9 裁切和遮罩

##### 3.4.9.1 裁切

`clip-path`用于移除在其他元素的部分内容。不支持任何半透明效果，只能显示或不显示。

**`clip-path`示例**

```svg
<!-- 经过裁切，得到一个四分之三圆 -->
<svg version="1.1" baseProfile="full" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- <clipPath> 裁切元素通常定义在 <defs> 中 -->
    <clipPath id="cut-off-bottom">
      <!-- 用于确定画布填充范围，它并不会被绘制 -->
      <rect x="0" y="0" width="200" height="150"/>
    </clipPath>
  </defs>
  <rect width="100%" height="100%" fill="white"/>
  <!-- clip-path 引用 <clipPath> 裁切元素 -->
  <circle cx="100" cy="100" r="100" fill="red" clip-path="url(#cut-off-bottom)"/>
</svg>
```

![3.4.16.png](assets/3.4/16.png)

##### 3.4.9.2 遮罩

`mask`用于实现具有透明度和灰度值遮罩的渐变边缘。

**`mask`示例**

```svg
<!-- 遮罩可以实现元素淡出的效果 -->
<svg version="1.1" baseProfile="full" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="Gradient">
      <stop offset="0" stop-color="white" stop-opacity="0"/>
      <stop offset="1" stop-color="white" stop-opacity="1"/>
    </linearGradient>
    <mask id="Mask">
      <!-- 填充了一个透明到白色的渐变 -->
      <rect x="0" y="0" width="200" height="200" fill="url(#Gradient)"/>
    </mask>
  </defs>
  <rect x="0" y="0" width="200" height="200" fill="green"/>
  <!-- mask 引用 <mask> 遮罩元素。红色矩形继承遮罩的 alpha 值（透明度） -->
  <rect x="0" y="0" width="200" height="200" fill="red" mask="url(#Mask)"/>
</svg>
```

![3.4.17.png](assets/3.4/17.png)

##### 3.4.9.3 透明度

可以用`opacity`为整个元素设置透明度。填充和描边分别有`fill-opacity`和`stroke-opacity`属性，用来控制填充和描边的不透明度。

**注意：描边在填充的图层上面。如果在一个元素上设置了描边透明度，同时设有填充，则描边的一半应用填充色，另一半将应用背景色。**

**`opacity`示例**

```svg
<!-- 红色的圆形在绿色的背景上，黄色描边设置为 50% 不透明度，达到双色描边的效果 -->
<svg version="1.1" baseProfile="full" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="200" height="200" fill="green"/>
  <circle cx="100" cy="100" r="50" stroke="yellow" stroke-width="40" stroke-opacity="0.5" fill="red"/>
</svg>
```

![3.4.18.png](assets/3.4/18.png)

#### 3.4.10 滤镜效果

某些情况下，基本的`SVG`图形不能实现某种想要的效果。比如阴影效果不能通过渐变类元素实现。

滤镜就是`SVG`用于创建复杂效果的一种机制。滤镜使用`<filter>`元素在`<defs>`中定义。`<filter>`元素提供一系列图元（`primitives`
），以及在前一个基本变换操作上添加另一个操作。只需要为`SVG`元素设置`filter`属性即可应用所创建的滤镜效果。

**滤镜示例**

实现一个带光照效果的`SVG`的名牌。

1. 创建图形阴影：设置`<feGaussianBlur>`中的`in`属性为`SourceAlpha`（源图像的透明度`alpha`通道），设置模糊度为`4`并把`result`
   保存在了一个名为`blur`的缓冲区中。
2. 设置阴影偏移：设置`<feOffset>`中的`in`属性为`blur`，即上一步保存`result`的缓冲区。然后设置相对坐标，向右偏移`4`
   ，向下偏移`4`。最后把结果`result`保存到名为`offsetBlur`的缓冲区中。
3. 设置光照效果：设置`<feSpecularLighting>`中的`in`属性为`blur`，将会生成一个光照效果，并将结果`result`保存在`specOut`中。
4. 组合光照效果：设置`<feComposite>`中的`in`属性为`specOut`及`in2`属性为`SourceAlpha`，将`specOut`
   的效果遮盖掉，使得最后的结果不会大于`SourceAlpha`（源图像），组合结果`result`保存到`specOut`。
5. 组合光照效果：设置`<feComposite>`中的`in`属性为`SourceGraphic`及`in2`属性为`specOut`，使用`arithmetic`
   组合模式，在`SourceGraphic`上添加`specOut`的效果，组合结果`result`保存到`litPaint`。
6. 合并元素：使用`<feMerge>`元素合并了阴影效果`offsetBlur`和源图像的光照效果`litPaint`。

详见`filter.svg`文件

### 3.5 Blob及File学习

参考：https://juejin.cn/post/7424414729857400870

#### 3.5.1 Blob对象

`Blob`对象表示一个不可变、原始数据的类文件对象。它的数据可以按文本或二进制的格式进行读取，也可以转换成`ReadableStream`
来用于数据操作。`Blob`提供了一种高效的方式来操作数据文件，而不需要将数据全部加载到内存中(比如流式读取、文件切片`slice()`
方法)，这在处理大型文件或二进制数据时非常有用。

`Blob`表示的不一定是`JavaScript`原生格式的数据。`File`接口基于`Blob`，继承了`Blob`的功能并将其扩展以支持用户系统上的文件。

##### 3.5.1.1 语法

要从其他非`Blob`对象和数据构造一个`Blob`，请使用`Blob()`构造函数。要创建一个`Blob`数据的子集`blob`，请使用`slice()`方法。

```javascript
new Blob(blobParts)
new Blob(blobParts, options)
// Blob() 构造函数返回一个新的 Blob 对象。blob 的内容由参数 blobParts 中给出的值串联而成。
```

* `blobParts`（可选）：一个可迭代对象，比如`Array`，包含`ArrayBuffer`、`TypedArray`、`DataView`、`Blob`
  、字符串或者任意这些元素的组合，这些元素将会被放入`Blob`中。字符串应该是格式良好的`Unicode`，而单独代理项（`lone surrogate`
  ）会使用和`String.prototype.toWellFormed()`相同的算法进行清理。
* `options`（可选）：一个可以指定以下任意属性的对象：
  * `type`（可选）：将会被存储到`Blob`中的数据的`MIME`类型。默认值是空字符（`""`）。
  * `endings`（可选、非标准）：如果数据是文本，那么如何解释其中的换行符（`\n`）。默认值`transparent`会将换行符复制到`Blob`
    中而不会改变它们。要将换行符转换为主机系统的本地约定，请指定值`native`。

##### 3.5.1.2 属性

```javascript
Blob.size
// 只读，Blob 对象中所包含数据的大小（字节）。
Blob.type
// 只读，一个字符串，表明该 Blob 对象所包含数据的 MIME 类型。如果类型未知，则该值为空字符串。
```

##### 3.5.1.3 实例方法

```javascript
Blob.arrayBuffer()
// 返回一个 promise，其会兑现一个包含 Blob 所有内容的二进制格式的 ArrayBuffer。适合处理二进制数据。
Blob.bytes()
// 返回一个 promise，其会兑现一个包含 Blob 内容的 Uint8Array。
Blob.slice(start, end)
// 返回一个新的 Blob 对象，其中包含调用它的 Blob 的指定字节范围内的数据。
Blob.stream()
// 返回一个能读取 Blob 内容的 ReadableStream。允许你以流的方式处理数据，适合处理大文件。
Blob.text()
// 返回一个 promise，其会兑现一个包含 Blob 所有内容的 UTF-8 格式的字符串。
```

##### 3.5.1.4 使用场景

**从Blob中提取数据**

```javascript
const reader = new FileReader();
reader.addEventListener("loadend", () => {
  // reader.result 包含被转化为类型化数组的 blob 中的内容
});
reader.readAsArrayBuffer(blob);
// 读取指定的 Blob 对象，并将文件内容读为 ArrayBuffer。
reader.readAsBinaryString(blob);
// 读取指定的 Blob 对象，并将文件内容读为二进制字符串。
reader.readAsDataURL(blob);
// 读取指定的 Blob 对象，并将文件内容读为 Data URL（Base64 编码的字符串）。
reader.readAsText(blob);
// 读取指定的 Blob 对象，并将文件内容读为文本字符串，默认使用 UTF-8 编码。

const text = new Response(blob).text();
// 将 Blob 中的内容读取为文本

const text = blob.text();
// 将 Blob 中的内容读取为文本
```

**生成文件下载**

```javascript
// 可以通过 Blob 创建文件并生成下载链接供用户下载文件
const blob = new Blob(["This is a test file."], {type: "text/plain"});
const url = URL.createObjectURL(blob); // 创建一个 Blob URL
const a = document.createElement("a");
a.href = url;
a.download = "test.txt";
a.click();
URL.revokeObjectURL(url); // 释放 URL 对象
```

**上传文件**

```javascript
// Blob 常用于上传文件到服务器，尤其是在使用 FormData API 时
const formData = new FormData();
// 做过上传文件功能的小伙伴，肯定都遇到过将 File 对象传入到 formData 中上传
// 其实 File 对象就是继承了 Blob 对象，只不过加上了一些文件信息。
formData.append("file", blob, "example.txt");

fetch("/upload", {
  method: "POST",
  body: formData,
}).then((response) => {
  console.log("File uploaded successfully");
});
```

**图像处理**

通过`FileReader`可以将`Blob`对象读取为不同的数据格式。详见`blob-demo.html`文件。

#### 3.5.2 File对象

`File`提供有关文件的信息，允许`JavaScript`访问其内容。

`File`继承自`Blob`对象，包含文件的元数据（如文件名、文件大小、类型等）。可以在`Blob`可使用的上下文中使用。

`Blob`是纯粹的二进制数据，它可以存储任何类型的数据，但不具有文件的元数据（如文件名、最后修改时间等）。

`File`是`Blob`的子类，除了继承`Blob`的所有属性和方法之外，还包含文件的元数据。你可以将`File`
对象看作是带有文件信息的`Blob`。`Blob`更加通用，而`File`更专注于与文件系统的交互。

##### 3.5.2.1 语法

```javascript
new File(fileBits, fileName)
new File(fileBits, fileName, options)
// File() 构造函数创建新的 File 对象实例。
```

* `fileBits`：一个可迭代对象，例如一个具有`ArrayBuffer`、`TypedArray`、`DataView`、`Blob`、字符串或任何此类元素的组合的数组，将被放入
  `File`内。**注意：这里的字符串被编码为`UTF-8`，与通常的`JavaScript UTF-16`字符串不同。**
* `fileName`：表示文件名或文件路径的字符串。
* `options`（可选）：包含文件可选属性的选项对象。可用选项如下：
  * `type`（可选）：表示将放入文件的内容的`MIME`类型的字符串。默认值为`""`。
  * `endings`（可选）：如果数据是文本，那么如何解释其中的换行符（`\n`）。默认值`transparent`会将换行符复制到`Blob`
    中而不会改变它们。要将换行符转换为主机系统的本地约定，请指定值`native`。
  * `lastModified`（可选）：一个数字，表示`Unix`时间纪元与文件上次修改时间之间的毫秒数。默认值为调用`Date.now()`返回的值。

##### 3.5.2.2 属性

```javascript
// File 接口还继承了 Blob 接口的属性。
File.lastModified
// 只读，返回文件的最后修改时间，以 UNIX 纪元（1970 年 1 月 1 日午夜）以来的毫秒为单位。
File.lastModifiedDate
// 已弃用 只读 非标准，返回 File 对象引用的文件的最后修改时间的 Date。
File.name
// 只读，返回 File 对象引用的文件的名称。
File.webkitRelativePath
// 只读，返回 File 对象相对于 URL 的路径。
```

##### 3.5.2.3 实例方法

```javascript
// File 接口还继承了 Blob 接口的方法。
File.arrayBuffer()
// 返回一个 promise，其会兑现一个包含 File 所有内容的二进制格式的 ArrayBuffer。适合处理二进制数据。
File.bytes()
// 返回一个 promise，其会兑现一个包含 File 内容的 Uint8Array。
File.slice(start, end)
// 返回一个新的 File 对象，其中包含调用它的 File 的指定字节范围内的数据。
File.stream()
// 返回一个能读取 File 内容的 ReadableStream。允许你以流的方式处理数据，适合处理大文件。
File.text()
// 返回一个 promise，其会兑现一个包含 File 所有内容的 UTF-8 格式的字符串。
```

##### 3.5.2.4 获取方式

1. `File`对象通常从用户使用`<input>`元素选择文件返回的`FileList`对象中检索。
2. 拖放操作返回的`DataTransfer`对象中检索。
3. 使用`File`构造函数手动创建。

```javascript
<input type="file" id="fileInput"/>
// 获取用户上传的
document.getElementById("fileInput").addEventListener("change", (event) => {
  const file = event.target.files[0];
  console.log("文件名:", file.name, "文件类型:", file.type, "文件大小:", file.size);
});

// 手动创建 File
const file = new File(["Hello, world!"], "hello-world.txt", {
  type: "text/plain",
});
console.log(file);
```

##### 3.5.2.5 支持Blob和File对象的API

以下`API`都接受`Blob`对象和`File`对象：

1. `FileReader`
2. `URL.createObjectURL() `
3. `Window.createImageBitmap()`和`WorkerGlobalScope.createImageBitmap()`
4. `fetch()`方法的`body`选项
5. `XMLHttpRequest.send()`

#### 3.5.3 FileReader对象

`FileReader`接口允许`Web`应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用`File`或`Blob`
对象指定要读取的文件或数据。

文件对象可以从用户使用`<input type="file">元素选择文件而返回的`FileList`对象中获取，或者从拖放操作的`DataTransfer`对象中获取。

`FileReader`只能访问用户明确选择的文件内容（`input`或拖放）。它不能用于从用户的文件系统中按路径名读取文件。要按路径名读取客户端文件系统上的文件，请使用文件系统访问
`API`。要读取服务器端文件，请使用`fetch()`，如果跨源读取，则需要`CORS`权限。

##### 3.5.3.1 语法

```javascript
new FileReader()

// FileReader() 构造函数创建一个新的 FileReader 对象。

function printFile(file) {
  // 使用 FileReader() 构造函数创建 FileReader 对象，和该对象的后续使用。
  const reader = new FileReader();
  reader.onload = (evt) => {
    console.log(evt.target.result);
  };
  reader.readAsText(file);
}
```

##### 3.5.3.2 属性

```javascript
FileReader.error
// 只读，一个表示在读取文件时发生的错误的 DOMException。
FileReader.readyState
// 只读，表示FileReader状态的数字。取值如下：
// 常量名	值	描述
// EMPTY	0	还没有加载任何数据。
// LOADING	1	数据正在被加载。
// DONE	    2	已完成全部的读取请求。
FileReader.result
// 只读，文件的内容。该属性仅在读取操作完成后才有效，数据的格式取决于使用哪个方法来启动读取操作。
```

##### 3.5.3.3 实例方法

```javascript
FileReader.abort()
// 中止读取操作。在返回时，readyState 属性为 DONE。
FileReader.readAsArrayBuffer()
// 开始读取指定的 Blob 中的内容，一旦完成，result 属性中将包含一个表示文件数据的 ArrayBuffer 对象。
FileReader.readAsBinaryString()
// 已弃用。开始读取指定的 Blob 中的内容。一旦完成，result 属性中将包含一个表示文件中的原始二进制数据的字符串。
FileReader.readAsDataURL()
// 开始读取指定的 Blob 中的内容。一旦完成，result 属性中将包含一个表示文件数据的 data: URL（Base64 编码的字符串）。
FileReader.readAsText()
// 开始读取指定的 Blob 中的内容。一旦完成，result 属性中将包含一个表示所读取的文件内容的字符串。可以指定可选的编码名称。
```

##### 3.5.3.4 事件

使用`addEventListener()`方法或通过将事件侦听器分配给此接口的`oneventname`属性来侦听这些事件。一旦不再使用`FileReader`
，请使用`removeEventListener()`删除事件侦听器，以避免内存泄漏。

```javascript
abort
// 当读取被中止时触发，例如因为程序调用了 FileReader.abort() 方法。
error
// 当读取由于错误而失败时触发。
load
// 读取成功完成时触发。
loadend
// 读取完成时触发，无论成功与否（包括被中止）。
loadstart
// 读取开始时触发。
progress
// 读取数据时定期触发。
```

#### 3.5.4 Base64编码

`Base64`是一种二进制到文本的编码规则，让二进制数据在解释成`64`进制的表现形式后能够用`ASCII`字符串的格式表示出来。`Base64`
出自一种特定的`MIME`内容传输编码。常用于需要通过文本数据传输二进制数据的场景，例如在`URL`、电子邮件以及`JSON`数据中嵌入图像或文件。

当单独使用术语`Base64`指代特定算法时，通常指的是`RFC 4648`第`4`节中概述的`Base64`版本。

##### 3.5.4.1 Base64编码原理

* 基本字符集：`Base64`使用`64`个可打印字符来表示二进制数据。这些字符包括：
  * 大写字母`A-Z`（`26`个字符）
  * 小写字母`a-z`（`26`个字符）
  * 数字`0-9`（`10`个字符）
  * 加号`+`和斜杠`/`（`2`个字符）
* 数据分组：`Base64`将输入的二进制数据分成`24`位（`3`字节）一组，然后将这`24`位分为`4`个`6`位的块。每个`6`
  位的块被转换为一个`Base64`字符。
* 填充字符：如果原始数据的字节数不是`3`的倍数，`Base64`编码会在末尾添加一个或两个等号`=`作为填充，以确保输出字符数是`4`的倍数。

**编码后大小增加：**

每个`Base64`位代表`6`位数据。输入字符串/二进制文件的三个`8`位字节（`3×8 = 24`位）可以用四个`6`位`Base64`位（`4×6 = 24`
位）表示。因此，字符串或文件的`Base64`版本通常比原来的内容多大约三分之一（受字符串的绝对长度、模`3`的余数、是否使用填充字符影响）。

##### 3.5.4.2 Base64编码转换

浏览器原生提供了两个`JavaScript`函数，用于解码和编码`Base64`字符串：

`Window.btoa()`（在`worker`中可用）：从二进制数据字符串创建一个`Base64`编码的`ASCII`字符串（`btoa`应看作“从二进制到`ASCII`）
`Window.atob()`（在`worker`中可用）：解码通过`Base64`编码的字符串数据（`atob`应看作“从`ASCII`到二进制）

注意：`Base64`是一种二进制编码，而不是文本编码，但是在`Web`平台支持二进制数据类型之前，`btoa`和`atob`
被添加到了其中。因此，这两个函数使用字符串来表示二进制数据，其中每个字符的码位表示每个字节的值。这导致了一个普遍的误解，即
`btoa`可以用来编码任意文本数据，例如创建文本或`HTML`文档的`Base64 data: URL`。

然而，字节到码位的对应关系只能可靠地适用于最高为`0x7f`的码位。此外，超过`0xff`的码位将导致`btoa`抛出错误，因为超过了`1`
字节的最大值。

**任意`Unicode`文本进行`Base64`编码解决方案**

由于`btoa`将其输入字符串的码位解释为字节值，因此如果字符的码位超过`0xff`，调用`btoa`将导致`Character Out Of Range`
异常。对于需要编码任意`Unicode`文本的用例，需要首先将字符串转换为其`UTF-8`的组成字节，然后再对这些字节进行编码。

最简单的解决方案是使用`TextEncoder`和`TextDecoder`在`UTF-8`和字符串的单字节表示之间进行转换：

```javascript
function base64ToBytes(base64) {
  const binString = atob(base64);
  return Uint8Array.from(binString, (m) => m.codePointAt(0));
}

function bytesToBase64(bytes) {
  const binString = Array.from(bytes, (byte) =>
          String.fromCodePoint(byte),
  ).join("");
  return btoa(binString);
}

// 用法
bytesToBase64(new TextEncoder().encode("a Ā 𐀀 文 🦄")); // "YSDEgCDwkICAIOaWhyDwn6aE"
new TextDecoder().decode(base64ToBytes("YSDEgCDwkICAIOaWhyDwn6aE")); // "a Ā 𐀀 文 🦄"
```

`bytesToBase64`和`base64ToBytes`函数可以直接用于在`Base64`字符串和`Uint8Array`之间进行转换。

为了获得更好的性能，可以通过`FileReader`和`fetch`进行基于`Base64`数据`URL`的异步转换：

```javascript
async function bytesToBase64DataUrl(bytes, type = "application/octet-stream") {
  return await new Promise((resolve, reject) => {
    const reader = Object.assign(new FileReader(), {
      onload: () => resolve(reader.result),
      onerror: () => reject(reader.error),
    });
    reader.readAsDataURL(new File([bytes], "", {type}));
  });
}

async function dataUrlToBytes(dataUrl) {
  const res = await fetch(dataUrl);
  return new Uint8Array(await res.arrayBuffer());
}

// 用法
await bytesToBase64DataUrl(new Uint8Array([0, 1, 2])); // "data:application/octet-stream;base64,AAEC"
await dataUrlToBytes("data:application/octet-stream;base64,AAEC"); // Uint8Array [0, 1, 2]
```

#### 3.5.5 URL.createObjectURL()静态方法

`URL`接口的`createObjectURL()`静态方法创建一个用于表示参数中给出的对象的`URL`的字符串。`URL`代表指定的`MediaSource`
（基本被废弃）、`File`或`Blob`对象。允许开发者通过`URL`引用本地的文件或数据，而不需要将其上传到服务器。

`URL`的生命周期与其创建时所在窗口的`document`绑定在一起，浏览器会在卸载文档时自动释放对象`URL`
。但为了优化性能和内存使用，若在安全时间内可以明确卸载，就应该卸载，需要手动调用`revokeObjectURL()`。

**注意：此特性在`Service Worker`中不可用，因为它有可能导致内存泄漏。**

##### 3.5.4.1 语法

要从其他非`Blob`对象和数据构造一个`Blob`，请使用`Blob()`构造函数。要创建一个`Blob`数据的子集`blob`，请使用`slice()`方法。

```javascript
URL.createObjectURL(object)
// createObjectURL() 静态方法创建一个用于表示参数中给出的对象的 URL 的字符串。
```

* `object`：用于创建`URL`的`File`、`Blob`或`MediaSource`对象。

##### 3.5.4.2 内存管理

每次调用`createObjectURL()`时，都会创建一个新的对象`URL`，即使已经为同一个对象创建了一个`URL`
。当不再需要这些对象时，必须通过调用`URL.revokeObjectURL()`来释放它们。

浏览器会在卸载文档时自动释放对象`URL`；然而，为了优化性能和内存使用，如果在安全时间内可以明确卸载，就应该卸载。

使用对象`URL`进行媒体流处理：在较早版本的媒体源规范中，需要为`MediaStream`创建一个对象`URL`才能将流附加到`<video>`
元素。这已不再必要，浏览器正在逐步取消对此的支持。

##### 3.5.5.3 使用场景

* 预览文件：用户上传文件后，可以使用`createObjectURL()`生成一个`URL`来在浏览器中预览图像、视频或音频。
* 动态生成内容：在不需要持久化存储的情况下，使用`Blob`对象动态生成内容并通过`URL`引用。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Image Preview</title>
</head>
<body>
<h1>Upload and Preview Image</h1>
<input type="file" id="fileInput" accept="image/*">
<div id="preview" style="margin-top: 20px;">
  <img id="imagePreview" src="" alt="Image Preview" style="max-width: 100%; display: none;">
</div>

<script>
  document.getElementById('fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    // 生成一个 URL 用于引用文件
    const imageUrl = URL.createObjectURL(file);
    // 显示图像预览
    const img = document.getElementById('imagePreview');
    img.src = imageUrl;
    img.style.display = 'block';

    img.onload = function () {
      URL.revokeObjectURL(imageUrl);
    };
  });
</script>
</body>
</html>
```

### 3.6 WebSocket学习

参考：https://cloud.tencent.com/developer/article/1887095
https://www.cnblogs.com/mq0036/p/18643983
https://blog.csdn.net/guoqi_666/article/details/137260613

`WebSocket`对象提供了用于创建和管理`WebSocket`连接，以及可以通过该连接发送和接收数据的`API`。

`WebSocket`协议是一种基于`TCP`的协议，用于在客户端和服务器之间建立持久连接，并且可以在这个连接上实时地交换数据。`WebSocket`
协议有自己的握手协议，用于建立连接，也有自己的数据传输格式。

当客户端发送`WebSocket`请求时，服务器将发送一个协议响应以确认请求。在握手期间，客户端和服务器将协商使用的协议版本、支持的子协议、支持的扩展选项等。
握手完成后，连接将保持打开状态，客户端和服务器就可以在连接上实时地传递数据。

`WebSocket`协议使用的是双向数据传输，即客户端和服务器都可以在任意时间向对方发送数据，而不需要等待对方的请求。它支持二进制数据和文本数据，可以自由地在它们之间进行转换。

`WebSocket`协议是一种可靠的、高效的、双向的、持久的通信协议，它适用于需要实时通信的`Web`应用程序，如在线游戏、实时聊天等。

#### 3.6.1 WebSocket的生命周期

`WebSocket`生命周期描述了`WebSocket`连接从创建到关闭的过程。一个`WebSocket`连接包含以下四个主要阶段：

* 连接建立阶段（`Connection Establishment`）：客户端和服务器之间的`WebSocket`连接被建立。客户端发送一个`WebSocket`
  握手请求，服务器响应一个握手响应，然后连接就被建立了。
* 连接开放阶段（`Connection Open`）：`WebSocket`连接已经建立并开放，客户端和服务器可以在连接上互相发送数据。
* 连接关闭阶段（`Connection Closing`）：`WebSocket`连接即将被关闭。它可以被客户端或服务器发起，通过发送一个关闭帧来关闭连接。
* 连接关闭完成阶段（`Connection Closed`）：`WebSocket`连接已经完全关闭。客户端和服务器之间的任何交互都将无效。

**注意：`WebSocket`连接在任何时候都可能关闭，例如网络故障、服务器崩溃等情况都可能导致连接关闭。因此，需要及时处理`WebSocket`
连接关闭的事件，以确保应用程序的可靠性和稳定性。**

![3.6.1.png](assets/3.6/1.png)

#### 3.6.2 数据帧格式

在`WebSocket`协议中，三个月还有是通过一系列数据帧来进行传输的。

为了避免由于网络中介（如拦截代理）或一些安全问题，客户端必须在它发送到服务器的所有帧中添加掩码。服务端收到没有添加掩码的数据帧以后，必须立即关闭连接。

统一格式详见`data-frame.text`文件

![3.6.2.png](assets/3.6/2.png)

针对前面的格式概览图进行逐个字段解释：

* `FIN`：`1`个比特。
  * `1`：表示这是消息`message`的最后一个分片`fragment`。
  * `0`，表示不是消息`message`的最后一个分片`fragment`。
* `RSV1`,`RSV2`,`RSV3`：各占`1`个比特。一般情况下全为`0`。当客户端、服务端协商采用`WebSocket`扩展时，这三个标志位可以非`0`
  ，且值的含义由扩展进行定义。如果出现非零的值，且并没有采用`WebSocket`扩展，连接出错。
* `Opcode`：`4`个比特。操作代码，`Opcode`的值决定了应该如何解析后续的数据载荷（`data payload`
  ）。如果操作代码是不认识的，那么接收端应该断开连接。可选的操作代码如下：
  * `0x0`：表示一个延续帧。当`Opcode`为`0`时，表示本次数据传输采用了数据分片，当前收到的数据帧为其中一个数据分片。
  * `0x1`：表示这是一个文本帧（`frame`）。
  * `0x2`：表示这是一个二进制帧（`frame`）。
  * `0x3-7`：保留的操作代码，用于后续定义的非控制帧。
  * `0x8`：表示连接断开。
  * `0x9`：表示这是一个`ping`操作。
  * `0xA`：表示这是一个`pong`操作。
  * `0xB-F`：保留的操作代码，用于后续定义的控制帧。
* `Mask`: `1`个比特。表示是否要对数据载荷进行掩码操作。从客户端向服务端发送数据时，需要对数据进行掩码操作；从服务端向客户端发送数据时，不需要对数据进行掩码操作。
  如果服务端接收到的数据没有进行过掩码操作，服务端需要断开连接。若`Mask`为`1`，则会在`Masking-key`
  中会定义一个掩码键，并用掩码键对数据载荷进行反掩码。所有客户端发送到服务端的数据帧`Mask`都是`1`。
* `Payload length`：载荷数据的长度，单位是字节。为`7`位、`7+16`位或`1+64`位。如果`Payload length`
  占用了多个字节的话，`Payload length`的二进制表达采用网络序（`big endian`，重要的位在前）。
  * 假设数`Payload length = x`，则有：
  * `x`为`0~126`：数据的长度为`x`字节。
  * `x`为`126`：后续`2`个字节代表一个`16`位的无符号整数，该无符号整数的值作为载荷数据的长度。
  * `x`为`127`：后续`8`个字节代表一个`64`位的无符号整数（最高位为`0`），该无符号整数的值作为载荷数据的长度。
* `Masking-key`：`0`或`4`字节（`32`位）。所有从客户端传送到服务端的数据帧，数据载荷都进行了掩码操作，`Mask`为`1`，且携带了`4`
  字节的`Masking-key`。如果`Mask`为`0`，则没有`Masking-key`。 **备注：载荷数据的长度不包括`Masking-key`长度。**
* `Payload data`：载荷数据，`x+y`字节。
  * 载荷数据：包括了扩展数据、应用数据。其中，扩展数据`x`字节，应用数据`y`字节。
  * 扩展数据：如果没有协商使用扩展的话，扩展数据数据为`0`字节。所有的扩展都必须声明扩展数据的长度，或可以如何计算出扩展数据的长度。
    如何使用扩展必须在握手阶段就协商好。如果扩展数据存在，那么载荷数据长度必须将扩展数据的长度包含在内。
  * 应用数据：任意的应用数据，在扩展数据之后（如果存在扩展数据），占据了数据帧剩余的位置。载荷数据长度减去扩展数据长度，就得到应用数据的长度。

#### 3.6.3 WebSocket的API

`WebSocket API`是用于在`Web`应用程序中创建和管理`WebSocket`连接的接口集合。`WebSocket API`由浏览器原生支持，可直接使用。

`WebSocket`内置了一些常量：

* `WebSocket.CONNECTING`:`0`
* `WebSocket.OPEN`:`1`
* `WebSocket.CLOSING`:`2`
* `WebSocket.CLOSED`:`3`

##### 3.6.3.1 语法

```javascript
WebSocket(url, protocols)
// 返回一个 WebSocket 对象。
```

* `url`：要连接的`URL`；这应该是`WebSocket`服务器将响应的`URL`。
* `protocols`（可选）：一个协议字符串或一个包含协议字符串的数组。字符串用于指定子协议，这样单个服务器可以实现多个`WebSocket`
  子协议（例如，期望一台服务器能够根据指定的协议（`protocol`）处理不同类型的交互）。如果不指定协议字符串，则假定为空字符串。

##### 3.6.3.2 属性

```javascript
WebSocket.binaryType
// 使用二进制的数据类型连接。
WebSocket.bufferedAmount
// 只读，未发送至服务器的字节数。
WebSocket.extensions
// 只读，服务器选择的扩展。
WebSocket.onclose
// 用于指定连接关闭后的回调函数。
WebSocket.onerror
// 用于指定连接失败后的回调函数。
WebSocket.onmessage
// 用于指定当从服务器接受到信息时的回调函数。
WebSocket.onopen
// 用于指定连接成功后的回调函数。
WebSocket.protocol
// 只读，服务器选择的下属协议。
WebSocket.readyState
// 只读，当前的链接状态。
WebSocket.url
// 只读，WebSocket 的绝对路径。
```

##### 3.6.3.3 实例方法

```javascript
WebSocket.close(code, reason)
// 关闭当前链接。
// code（可选）：一个数字状态码，它解释了连接关闭的原因。如果没有传这个参数，默认使用 1005。CloseEvent的允许的状态码见状态码列表 。
// reason（可选）：一个人类可读的字符串，它解释了连接关闭的原因。这个 UTF-8 编码的字符串不能超过 123 个字节。
WebSocket.send(data)
// 对要传输的数据进行排队。
// data：用于传输至服务器的数据。它必须是以下类型之一：
// USVString 文本字符串。字符串将以 UTF-8 格式添加到缓冲区，并且 bufferedAmount 将加上该字符串以 UTF-8 格式编码时的字节数的值。
// ArrayBuffer 你可以使用类型化数组对象发送底层二进制数据；其二进制数据内存将被缓存于缓冲区，bufferedAmount 将加上所需字节数的值。
// Blob 该类型将队列 Blob 中的原始数据以二进制中传输。 bufferedAmount 将加上原始数据的字节数的值。
// ArrayBufferView 你可以以二进制帧的形式发送任何 JavaScript 类数组对象 ；其二进制数据内容将被队列于缓冲区中。值 bufferedAmount 将加上必要字节数的值。
```

##### 3.6.3.4 事件

使用`addEventListener()`或将一个事件监听器赋值给本接口的`oneventname`属性，来监听下面的事件。

```javascript
close
// 当一个 WebSocket 连接被关闭时触发。 也可以通过 onclose 属性来设置。
error
// 当一个 WebSocket 连接因错误而关闭时触发，例如无法发送数据时。 也可以通过 onerror 属性来设置。
message
// 当通过 WebSocket 收到数据时触发。 也可以通过 onmessage 属性来设置。
open
// 当一个 WebSocket 连接成功时触发。 也可以通过 onopen 属性来设置。
```

##### 3.6.3.5 示例

```javascript
// 创建 WebSocket 连接
const socket = new WebSocket("ws://localhost:8080");

// 连接开发
socket.addEventListener("open", function (event) {
  socket.send("Hello Server!");
});

// 监听消息
socket.addEventListener("message", function (event) {
  console.log("Message from server ", event.data);
});
```

#### 3.6.4 数据传递

当`WebSocket`客户端、服务端建立连接后，后续操作都是基于数据帧的传递。`WebSocket`根据`Opcode`来区分操作的类型。比如`0x8`
表示断开连接，`0x0-0x2`表示数据交互。

##### 3.6.4.1 数据分片

`WebSocket`的每条消息可能被切分成多个数据帧。当`WebSocket`的接收方收到一个数据帧时，会根据`FIN`的值来判断，是否已经收到消息的最后一个数据帧。

`FIN=1`表示当前数据帧为消息的最后一个数据帧，此时接收方已经收到完整的消息，可以对消息进行处理。`FIN=0`，则接收方还需要继续监听接收其余的数据帧。

此外，`Opcode`在数据交换的场景下，表示的是数据的类型。`0x01`表示文本，`0x02`表示二进制。而`0x00`
比较特殊，表示延续帧（`continuation frame`），顾名思义，就是完整消息对应的数据帧还没接收完。

##### 3.6.4.2 数据分片例子

**单个帧中发送消息示例：**

`FIN=1`, 表示是当前消息的最后一个数据帧。服务端收到当前数据帧后，可以处理消息。`Opcode=0x1`，表示客户端发送的是文本类型。
`Client: FIN=1, Opcode=0x1, msg="hello"`
`Server: (process complete message immediately) Hi.`

**跨三个帧发送消息示例：**

`FIN=0，Opcode=0x1`，表示发送的是文本类型，且消息还没发送完成，还有后续的数据帧。
`Client: FIN=0, Opcode=0x1, msg="and a"`
`Server: (listening, new message containing text started)`

`FIN=0，Opcode=0x0`，表示消息还没发送完成，还有后续的数据帧，当前的数据帧需要接在上一条数据帧之后。
`Client: FIN=0, Opcode=0x0, msg="happy new"`
`Server: (listening, payload concatenated to previous message)`

`FIN=1，Opcode=0x0`，表示消息已经发送完成，没有后续的数据帧，当前的数据帧需要接在上一条数据帧之后。服务端可以将关联的数据帧组装成完整的消息。
`Client: FIN=1, Opcode=0x0, msg="year!"`
`Server: (process complete message) Happy new year to you too!`

#### 3.6.5 保持连接

`WebSocket`为了保持客户端、服务端的实时双向通信，需要确保客户端、服务端之间的`TCP`
通道保持连接。如果长时间没有数据往来，但仍然长时间保持连接，会浪费连接资源。

##### 3.6.5.1 实现方式

在经过握手之后的任意时刻里，无论客户端还是服务端都可以选择发送一个`ping`消息给另一方。当收到`ping`消息的时候，接受的一方必须尽快回复一个
`pong`消息。例如，可以使用这种方式来确保客户端还是连接状态。

一个`ping`或`pong`都只是一个常规的帧，只是这个帧是一个控制帧。`ping`消息的`Opcode`值为`0x9`，`pong`消息的`Opcode`值为
`0xA`。当你获取到一个`ping`消息的时候，回复一个跟`ping`消息有相同载荷数据的`pong`消息 (`ping`和`pong`
的最大载荷长度位是`125`)。有可能在没有发送`ping`消息的情况下接收到`pong`消息，忽略该消息即可。

##### 3.6.5.2 心跳

某些场景下，虽然客户端、服务端长时间没有数据往来，但仍需要保持连接。这种需求可以采用心跳来实现。

所谓**心跳**就是定时发送一个自定义的结构体（心跳包或心跳帧），让对方知道自己**在线**，以确保链接的有效性。

心跳包就是客户端定时发送简单的信息给服务器端告诉它**我还在**而已。

代码实现就是每隔一段（根据需求需求设置）发送一个固定信息给服务端，服务端收到后回复一个固定信息。如果服务端几分钟内没有收到客户端信息，则认为客户端断开。

#### 3.6.6 WebSocket性能

##### 3.6.6.1 WebSocket的优势和劣势

**`WebSocket`优势**

* 实时性：`WebSocket`的持久化连接可以实现实时的数据传输，避免了`Web`应用程序需要不断地发送请求以获取最新数据的情况。
* 双向通信：`WebSocket`协议支持双向通信，这意味着服务器可以主动向客户端发送数据，而不需要客户端发送请求。
* 减少网络负载：由于`WebSocket`的持久化连接，它可以减少`HTTP`请求的数量，从而减少了网络负载。

**`WebSocket`劣势**

* 浏览器和服务器的支持度：`WebSocket`是一种相对新的技术，需要浏览器和服务器都支持。旧的浏览器和服务器可能不支持`WebSocket`。
* 额外的开销：`WebSocket`需要在服务器上维护长时间的连接，这需要额外的开销，包括内存和`CPU`。
* 安全问题：由于`WebSocket`允许服务器主动向客户端发送数据，可能会存在安全问题。服务器必须保证只向合法的客户端发送数据。

##### 3.6.6.2 WebSocket与传统HTTP请求/响应模型比较

* 双向通信性能更好：`WebSocket`协议使用单一的`TCP`连接，允许客户端和服务器在同一个连接上进行双向通信。这种实时的双向通信可以更快地传输数据，
  而不需要建立多个`HTTP`请求/响应连接。
* 更小的网络流量：`WebSocket`不需要在每个请求/响应交换中发送头部信息，因此保持`WebSocket`连接的网络流量比`HTTP`协议要少。
* 更低的延迟：`WebSocket`协议允许服务器主动向客户端推送消息，而不需要客户端先发送请求。这种实时通信可以减少响应延迟，并提高应用程序的性能。
* 更好的服务器资源管理：由于`WebSocket`连接可以保持活动状态，服务器可以更好地管理客户端连接，减少服务器开销和处理时间。

`WebSocket`协议的性能比传统的`HTTP`请求/响应模型更好，特别是在实时通信和低延迟方面。`WebSocket`
协议适用于需要实时通信和实时数据更新的应用程序，如在线聊天、多人游戏、实时监控等。

##### 3.6.6.3 WebSocket性能优化

* 减少消息大小：`WebSocket`传输的数据大小对性能有很大影响。尽量减少消息的大小，可以降低网络带宽和服务器负载。例如，可以使用二进制传输协议来代替文本传输，或使用压缩算法对消息进行压缩。
* 使用`CDN`加速：使用`CDN`（内容分发网络）可以将静态资源缓存到离用户更近的节点上，提高传输速度和性能。`CDN`
  可以缓存`Websocket`的初始握手请求，避免不必要的网络延迟。
* 使用负载均衡：`WebSocket`服务可以使用负载均衡来分配并平衡多个服务器的负载。负载均衡可以避免单个服务器被过载，并提高整个服务的可伸缩性。
* 优化服务端代码：`WebSocket`服务端代码的性能也是关键因素。使用高效的框架和算法，避免使用过多的内存和`CPU`
  资源，可以提高服务端的性能和响应速度。
* 避免网络阻塞：`WebSocket`的性能也会受到网络阻塞的影响。当有太多的连接同时请求数据时，服务器的性能会下降。
  使用合适的线程池和异步`IO`操作可以避免网络阻塞，提高`WebSocket`服务的并发性能。

## 4、VUE2相关

## 5、VUE3相关

### 5.1 子组件修改父组件props值

`vue3`使用 `v-model`的形式代替`.sync`修饰符, 实现子组件修改父组件`props`值。

```vue
<!-- 父组件 -->
<template>
  <div class="container">
    {{ cnt }}
    <child v-model:count="cnt"></child>
  </div>
</template>

<script setup>
  import child from "./child.vue"

  const cnt = ref(0)
</script>

<style scoped lang="stylus">
</style>
```

```vue
<!-- 子组件 -->
<template>
  <button @click="addCount">点击改变父组件props值</button>
</template>

<script setup>
  import {defineProps} from 'vue'

  const props = defineProps({
    count: {type: Number, required: true}
  })
  const emit = defineEmits(['update:count'])
  const addCount = () => {
    emit('update:count', props.count + 1)
  }
</script>

<style scoped lang="stylus">
</style>
```

### 5.2 自定义Hooks

参考：https://juejin.cn/post/7418397103909470248

`Vue`的自定义`Hooks`是一种封装可重用逻辑的方式。它允许你将复杂的逻辑提取出来，形成独立的函数，然后在不同的组件中复用。这样可以避免在多个组件中重复编写相同的逻辑，提高代码的可读性和可维护性。

通俗易懂来说就是：

1. 将可复用的功能逻辑放到一个`js`文件里面，并通过`export`导出。
2. 定义`Hooks`的时候，`js`的文件名和方法名通常以`use`开头，例如`useAddOrder`、`useChangeData`。
3. 通过`import`导入相关的`js`文件，引用时通过解构显示相关的变量和方法。

示例`1`：计数器`Hooks`

```javascript
// useCounter.js 文件
import {ref} from "vue";

export function useCounter() {
  // 定义响应式变量
  const count = ref(0)
  // 定义增加方法
  const increment = () => {
    count.value++
  }
  // 定义增加减少方法
  const decrement = () => {
    count.value--
  }
  return {count, increment, decrement}
}
```

```vue
<!-- 调用 useCounter 的 vue 文件 -->
<template>
  <div>
    <p>count:{{ count }}</p>
    <el-divider></el-divider>
    <el-button type="primary" @click="increment">增加</el-button>
    <el-button type="success" @click="decrement">减少</el-button>
  </div>
</template>

<script setup>
  // 导入 hooks
  import {useCounter} from "@/hooks/useCounter";
  // 解构引入
  const {count, increment, decrement} = useCounter();
</script>

<style scoped>

</style>
```

示例`2`：监听浏览器窗口大小变化的`Hooks`

```javascript
// useWindowResize.js 文件
import {onMounted, onUnmounted, ref} from "vue";

export function useWindowResize() {
  // 浏览器窗口宽度
  const width = ref(window.innerWidth)
  // 浏览器窗口高度
  const height = ref(window.innerHeight)
  // 定义浏览器尺寸变化处理方法
  const handleResize = () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }
  onMounted(() => {
    window.addEventListener("resize", handleResize)
  })
  onUnmounted(() => {
    window.removeEventListener("resize", handleResize)
  })
  return {width, height}
}
```

```vue
<!-- 调用 useWindowResize 的 vue 文件 -->
<template>
  <div>
    <p>浏览器窗口宽度: {{ width }}</p>
    <p>浏览器窗口高度: {{ height }}</p>
  </div>
</template>

<script setup>
  // 导入 hooks
  import {useWindowResize} from "@/hooks/useWindowResize";
  // 解构引入
  const {width, height} = useWindowResize();
</script>

<style scoped>

</style>
```

### 5.3 computed计算属性传参

参考：https://blog.csdn.net/qq_42231156/article/details/124506627

```vue
<!-- computed计算属性传参 -->
<template>
  <div v-for="item in list">
    <div v-if="show(item)">{{ item }}</div>
  </div>
</template>

<script setup>
  import {computed, ref} from "vue";

  const list = ref(["a", "b"])
  const show = computed(() => (item) => {
    return item === "a"
  })
</script>

<style scoped>

</style>
```

### 5.4 useId的使用

参考：https://juejin.cn/post/7429411484307161127

#### 5.4.1 useId概念

`Vue 3.5`中新增的`useId`函数主要用于生成唯一的`ID`，这个`ID`在同一个`Vue`应用中是唯一的，并且每次调用`useId`
都会生成不同的`ID`。这个功能在处理列表渲染、表单元素和无障碍属性时非常有用，因为它可以确保每个元素都有一个唯一的标识符。

`useId`的实现原理相对简单。它通过访问`Vue`实例的`ids`属性来生成`ID`，`ids`包含用于生成`ID`
的前缀和自增数字。每次调用`useId`，都会取出当前的数字值进行自增操作。所以在同一页面上的多个`Vue`
应用实例可以通过配置`app.config.idPrefix`来避免`ID`冲突，因为每个应用实例都会维护自己的`ID`生成序列。

#### 5.4.2 实现原理

```typescript
export function useId(): string {
  const i = getCurrentInstance()
  if (i) {
    return (i.appContext.config.idPrefix || 'v') + '-' + i.ids[0] + i.ids[1]++
  } else if (__DEV__) {
    warn(`useId() is called when there is no active component ` + `instance to be associated with.`,)
  }
  return ''
}
```

* `i.appContext.config.idPrefix`：这是从当前组件实例中获取的一个配置属性，用于定义生成`ID`
  的前缀。如果这个前缀存在，它将被使用；如果不存在，默认使用`v`。
* `i.ids[0]`：这是当前组件实例上的`ids`数组的第一个元素，它是一个字符串，通常为空字符串，用于生成`ID`的一部分。
* `i.ids[1]++`：这是`ids`数组的第二个元素，它是一个数字，用于生成`ID`的自增部分。这里使用了后置自增运算符`++`
  ，这意味着它会返回当前值然后自增。每次调用`useId`时，这个数字都会增加，确保生成的`ID`是唯一的。

```javascript
// 设置 ID 的 Vue 实例前缀
import {createApp} from 'vue'
import App from './App.vue'

const app = createApp(App)
app.config.idPrefix = "customize"
```

```javascript
// 设置 ID 前缀和自增数字
import {getCurrentInstance} from 'vue';

const ins = getCurrentInstance()
ins.ids = ["index", 123]
```

#### 5.4.3 使用场景

##### 5.4.3.1 表单元素的唯一标识

在表单中，`label`标签需要通过`for`属性与对应的`input`标签的`id`属性相匹配，以实现点击标签时输入框获得焦点的功能。

```html
<!-- 使用 useId 为每个 input 元素生成一个唯一的 id -->
<label :for="id">表单</label>
<input type="checkbox" :id="id"/>
<script>
  const id = useId()
</script>
```

##### 5.4.3.2 列表渲染中的唯一键

在渲染列表时，每一项通常需要一个唯一的键`key`，以帮助`Vue`追踪每个节点的身份，从而进行高效的`DOM`更新。`useId`
可以为列表中的每个项目生成一个唯一的键。

```vue

<template>
  <div>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.text }}（{{ item.id }}）
      </li>
    </ul>
  </div>
</template>

<script setup>
  import {useId} from "vue";

  const items = Array.from({length: 10}, (v, k) => {
    return {
      text: `Text ${k}`,
      id: useId()
    }
  })
</script>

<style scoped>

</style>
```

##### 5.4.3.3 服务端渲染（SSR）中避免ID冲突

在服务端渲染（`SSR`）的应用中，页面的`HTML`内容是在服务器上生成的，然后发送给客户端浏览器。在客户端，浏览器会接收到这些`HTML`
内容，并将其转换成一个可交互的页面。如果服务器端和客户端生成的`HTML`中存在相同的`ID`，当客户端激活`hydrate`
时可能会出现问题。因为客户端可能会尝试操作一个由服务器端渲染的`DOM`元素，导致潜在的冲突或错误。使用`useId`可以避免`ID`冲突。

```javascript
// 服务端代码 server.js
import {createSSRApp} from 'vue';
import {renderToString} from '@vue/server-renderer';
import App from './App.vue';

const app = createSSRApp(App);

renderToString(app).then(html => {
  // 将服务端渲染的 HTML 发送给客户端
  sendToClient(html);
});
```

```javascript
// 客户端代码 client.js
import {createSSRApp} from 'vue';
import App from './App.vue';

const app = createSSRApp(App);

// 客户端激活，将服务端渲染的 HTML 转换成可交互的页面
hydrateApp(app);
```

无论是服务端还是客户端，我们都使用了`createSSRApp(App)`来创建应用实例。如果我们在`App.vue`中使用了`useId`来生成`ID`
，那么这些`ID`将在服务端渲染时生成一次，并在客户端激活时再次使用相同的`ID`。

```vue

<template>
  <div>
    <input :id="inputId" type="text"/>
    <label :for="inputId">Enter text:</label>
  </div>
</template>

<script setup>
  import {useId} from 'vue';

  const inputId = useId();
</script>

<style scoped>

</style>
```

`App.vue`组件使用`useId`为`input`元素生成一个唯一的`ID`。这个`ID`在服务端渲染时生成，并包含在发送给客户端的`HTML`
中。当客户端接收到这个`HTML`并开始激活过程时，由于`useId`生成的`ID`在服务端和客户端是相同的，所以客户端可以正确地将`label`
元素关联到`input`元素，而不会出现`ID`冲突的问题。若非使用`useId`，而是使用了`Math.random()`或`Date.now()`来生成`ID`
，则服务端和客户端可能会生成不同的`ID`，从而导致客户端在激活时无法正确地将`label`和`input`关联起来（因为它们的`ID`
不同）。这可能会导致表单元素的行为异常，例如点击`label`时，`input`无法获得焦点。

##### 5.4.3.4 组件库中的ID生成

在使用`Element Plus`等组件库进行`SSR`开发时，为了避免`hydration`错误，需要确保服务器端和客户端生成相同的`ID`。通过在`Vue`
中注入`ID_injection_key`，可以确保`Element Plus`生成的`ID`在`SSR`中是唯一的。

```javascript
// src/main.js
import {createApp} from 'vue'
import {ID_INJECTION_KEY} from 'element-plus'
import App from './App.vue'

const app = createApp(App)
app.provide(ID_INJECTION_KEY, {
  prefix: 1024,
  current: 0,
})
```

### 5.5 ref和reactive的区别

参考：https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html
https://cloud.tencent.com/developer/article/2397580

在组合式`API`中，推荐使用`ref()`函数来声明响应式状态。

#### 5.5.1 ref函数

##### 5.5.1.1 ref使用

`ref()`接收参数，并将其包裹在一个带有`.value`属性的`ref`对象中返回。

```javascript
import {ref} from 'vue'

const count = ref(0)
console.log(count) // { value: 0 }
console.log(count.value) // 0
count.value++
console.log(count.value) // 1
```

##### 5.5.1.2 ref在模板中的使用

在模板中使用`ref`时，不需要附加`.value`。为了方便起见，当在模板中使用时，`ref`会自动解包。

```vue

<script setup>
  import {ref} from 'vue'

  const count = ref(0)

  function increment() {
    count.value++
  }
</script>

<template>
  <button @click="increment">
    {{ count }}
  </button>
</template>
```

##### 5.5.1.3 为什么要使用ref

为什么使用带有`.value`的`ref`，而不是普通的变量？为了解释这一点，我们需要简单地讨论一下`Vue`的响应式系统是如何工作的。

当你在模板中使用了一个`ref`，然后改变了这个`ref`的值时，`Vue`会自动检测到这个变化，并且相应地更新`DOM`
。这是通过一个基于依赖追踪的响应式系统实现的。当一个组件首次渲染时，`Vue`会追踪在渲染过程中使用的每一个`ref`
。然后，当一个`ref`被修改时，它会触发追踪它的组件的一次重新渲染。

在标准的`JavaScript`中，检测普通变量的访问或修改是行不通的。然而，我们可以通过`getter`和`setter`
方法来拦截对象属性的`get`和`set`操作。

该`.value`属性给予了`Vue`一个机会来检测`ref`何时被访问或修改。在其内部，`Vue`在它的`getter`中执行追踪，在它的`setter`
中执行触发。从概念上讲，你可以将`ref`看作是一个像这样的对象：

```javascript
// 伪代码
const myRef = {
  _value: 0,
  get value() {
    track()
    return this._value
  },
  set value(newValue) {
    this._value = newValue
    trigger()
  }
}
```

`ref`的另一个好处是，与普通变量不同，你可以将`ref`传递给函数，同时保留对最新值和响应式连接的访问。当将复杂的逻辑重构为可重用的代码时，这将非常有用。

##### 5.5.1.4 深层响应性

`ref`可以持有任何类型的值，包括深层嵌套的对象、数组或`JavaScript`内置的数据结构，比如`Map`。

`ref`会使它的值具有深层响应性。这意味着即使改变嵌套对象或数组时，变化也会被检测到.

```javascript
import {ref} from 'vue'

const obj = ref({
  nested: {count: 0},
  arr: ['foo', 'bar']
})

function mutateDeeply() {
  // 以下都会按照期望工作
  obj.value.nested.count++
  obj.value.arr.push('baz')
}
```

非原始值将通过`reactive()`转换为响应式代理，该函数将在后面讨论。

可以通过`shallow ref`来放弃深层响应性。对于浅层`ref`，只有`.value`的访问会被追踪。浅层`ref`
可以用于避免对大型数据的响应性开销来优化性能、或者有外部库管理其内部状态的情况。

##### 5.5.1.5 DOM 更新时机

当你修改了响应式状态时，`DOM`会被自动更新。但是需要注意的是，`DOM`更新不是同步的。`Vue`会在`next tick`
更新周期中缓冲所有状态的修改，以确保不管你进行了多少次状态修改，每个组件都只会被更新一次。

要等待`DOM`更新完成后再执行额外的代码，可以使用`nextTick()`全局`API`。

```javascript
import {nextTick} from 'vue'

async function increment() {
  count.value++
  await nextTick()
  // 现在 DOM 已经更新了
}
```

#### 5.5.2 reactive函数

##### 5.5.2.1 reactive使用

另一种声明响应式状态的方式是使用`reactive`。与将内部值包装在特殊对象中的`ref`不同，`reactive`将使对象本身具有响应性。

```javascript
import {reactive} from 'vue'

const state = reactive({count: 0})
```

##### 5.5.2.2 reactive在模板中的使用

```vue

<button @click="state.count++">
  {{ state.count }}
</button>
```

响应式对象是`JavaScript`代理，其行为就和普通对象一样。不同的是，`Vue`能够拦截对响应式对象所有属性的访问和修改，以便进行依赖追踪和触发更新。

`reactive()`将深层地转换对象：当访问嵌套对象时，它们也会被`reactive()`包装。当`ref`的值是一个对象时，`ref()`
也会在内部调用它。与浅层`ref`类似，`reactive()`也有一个`shallowReactive()`可以选择退出深层响应性。

##### 5.5.2.3 reactive的代理对象与原始对象的区别

`reactive()`返回的是一个原始对象的`Proxy`，它和原始对象是不同的。

```javascript
const raw = {}
const proxy = reactive(raw)

// 代理对象和原始对象不是全等的
console.log(proxy === raw) // false
```

只有代理对象是响应式的，更改原始对象不会触发更新。因此，使用`Vue`的响应式系统的最佳实践是仅使用你声明对象的代理版本。

为保证访问代理的一致性，对同一个原始对象调用`reactive()`会总是返回同样的代理对象，而对一个已存在的代理对象调用`reactive()`
会返回其本身。

```javascript
// 在同一个对象上调用 reactive() 会返回相同的代理
console.log(reactive(raw) === proxy) // true

// 在一个代理上调用 reactive() 会返回它自己
console.log(reactive(proxy) === proxy) // true
```

这个规则对嵌套对象也适用。依靠深层响应性，响应式对象内的嵌套对象依然是代理。

```javascript
const proxy = reactive({})

const raw = {}
proxy.nested = raw

console.log(proxy.nested === raw) // false
```

#### 5.5.3 reactive的局限性

##### 5.5.3.1 有限的值类型

它只适用于对象类型（对象、数组和`Map`、`Set`这样的集合类型）。它不能持有`string`、`number`或`boolean`这样的原始类型。

##### 5.5.3.2 不能替换整个对象

由于`Vue`的响应式跟踪是通过属性访问实现的，因此我们必须始终保持对响应式对象的相同引用。这意味着我们不能轻易地“替换”响应式对象，因为这样的话与第一个引用的响应性连接将丢失。

```javascript
let state = reactive({count: 0})
// 上面的 ({ count: 0 }) 引用将不再被追踪
// (响应性连接已丢失！)
state = reactive({count: 1})
```

**解决方案：**

1、不要直接整个对象替换，一个属性一个属性赋值。

```javascript
let state = reactive({count: 0})
// state = reactive({count: 1})
state.count = 1
```

2、使用`Object.assign`合并对象

```javascript
let state = reactive({count: 0})
// state = reactive({count: 1})
state = Object.assign(state, {count: 1})
```

3、使用`ref`定义对象

```javascript
let state = ref({count: 0})
state.value = {count: 1}
```

此外，`reactive`对象的属性赋值给变量（断开连接/深拷贝）

```javascript
let state = reactive({count: 0})
// 赋值给 n，n 和 state.count 不再共享响应性连接
let n = state.count
// 不影响原始的 state
n++
console.log(state.count) // 0
```

解决方案：避免将`reactive`对象的属性赋值给变量。

##### 5.5.3.3 对解构操作不友好

当我们将响应式对象的原始类型属性解构为本地变量时，或者将该属性传递给函数时，我们将丢失响应性连接。

```javascript
const state = reactive({count: 0})
// 当解构时，count 已经与 state.count 断开连接
let {count} = state
// 不会影响原始的 state
count++ // state.count 值依旧是 0
// 该函数接收到的是一个普通的数字
// 并且无法追踪 state.count 的变化
// 我们必须传入整个对象以保持响应性
callSomeFunction(state.count)
```

**解决方案：**

使用`toRefs`解构，解构后的属性是`ref`的响应式变量。

```javascript
const state = reactive({count: 0})
// 使用 toRefs 解构，后的属性为 ref 的响应式变量
let {count} = toRefs(state)
count.value++ // state.count 值改变为 1
```

因为`reactive()`的这些局限性，所以推荐使用`ref`而不是`reactive`。

#### 5.5.4 reactive与ref对比图

![5.5.1.png](assets/5.5/1.png)

### 5.6 useTemplateRef使用

参考：https://juejin.cn/post/7410259203175088138

#### 5.6.1 useTemplateRef是什么

`Vue 3`中`DOM`和子组件可以使用`ref`进行模版引用。但`ref`存在有一些让人迷惑的地方。比如定义的`ref`到底是响应式数据还是`DOM`
元素？还有`template`中`ref`属性的值明明是一个字符串，比如`ref="inputEl"`，怎么就和`script`中同名的`inputEl`
变量绑到一块了呢？所以`Vue 3.5`推出了`useTemplateRef`函数，完美地解决了这些问题。

#### 5.6.2 ref模版引用的问题

`ref`属性接收的不是一个`ref`变量，而是`ref`变量的名称。

```vue

<template>
  <div>
    <!-- <input type="text" :ref="inputEl"/> -->
    <!-- 上面的写法是错误的，但是并不会报错。因为 ref 属性接收的不是一个 ref 变量，而是 ref 变量的名称 -->
    <input type="text" ref="inputEl"/>
  </div>
</template>

<script setup>
  import {ref} from "vue";

  const inputEl = ref();
</script>

<style scoped>

</style>
```

如果将`ref`模版引用相关的逻辑抽成`hooks`后，则需要在`vue`组件中定义`ref`属性对应的`ref`变量。

```javascript
// useInput.js
import {ref} from "vue";

export default function useRef() {
  const inputEl = ref();

  function setInputValue(text) {
    if (inputEl.value) {
      inputEl.value.value = text;
    }
  }

  return {
    inputEl,
    setInputValue,
  };
}
```

虽然在`vue`组件中不会使用`inputEl`变量，但是还是需要从`hooks`中导入`useInput`变量。

```vue

<template>
  <div>
    <input type="text" ref="inputEl"/>
    <button @click="setInputValue('123')">给input赋值</button>
  </div>
</template>

<script setup>
  import useInput from "./useInput.js";
  // 如果不从 hooks 中导入 inputEl 变量，那么 inputEl 变量就不能绑定上 input 输入框了。
  const {setInputValue, inputEl} = useInput();
</script>

<style scoped>

</style>
```

#### 5.6.3 useTemplateRef函数

`useTemplateRef`函数的用法：只接收一个字符串参数`key`。返回值是一个`ref`变量。其中参数`key`字符串的值应该等于`template`
中`ref`属性的值。返回值是一个`ref`变量，变量的值指向模版引用的`DOM`元素或者子组件。

```vue
<!-- 将之前的示例改为使用 useTemplateRef 函数 -->
<template>
  <div>
    <input type="text" ref="inputRef"/>
    <button @click="setInputValue('123')">给input赋值</button>
  </div>
</template>

<script setup>
  import {useTemplateRef} from "vue";
  // useTemplateRef 函数的返回值就是指向 input 输入框的 ref 变量
  const inputEl = useTemplateRef("inputRef");

  function setInputValue(text) {
    if (inputEl.value) {
      inputEl.value.value = text;
    }
  }
</script>

<style scoped>

</style>
```

#### 5.6.4 hooks中使用useTemplateRef函数

```javascript
// useInput.js
import {useTemplateRef} from "vue";

export default function useRef(key) {
  const inputEl = useTemplateRef(key);

  function setInputValue(text) {
    if (inputEl.value) {
      inputEl.value.value = text;
    }
  }

  return {
    setInputValue,
  };
}
```

现在`hooks`中就不需要导出变量`inputEl`了，因为`inputEl`变量只在`hooks`内部使用。

```vue

<template>
  <div>
    <input type="text" ref="inputEl"/>
    <button @click="setInputValue('123')">给input赋值</button>
  </div>
</template>

<script setup>
  import useInput from "./useInput.js";
  // 此时只需要引入 setInputValue 函数即可
  const {setInputValue} = useInput("inputEl");
</script>

<style scoped>

</style>
```

#### 5.6.5 useTemplateRef源码

```typescript
import {type ShallowRef, readonly, shallowRef} from '@vue/reactivity'
import {getCurrentInstance} from '../component'
import {warn} from '../warning'
import {EMPTY_OBJ} from '@vue/shared'

export const knownTemplateRefs: WeakSet<ShallowRef> = new WeakSet()

export function useTemplateRef<T = unknown, Keys extends string = string>(
        key: Keys,
): Readonly<ShallowRef<T | null>> {
  const i = getCurrentInstance()
  const r = shallowRef(null)
  if (i) {
    const refs = i.refs === EMPTY_OBJ ? (i.refs = {}) : i.refs
    let desc: PropertyDescriptor | undefined
    if (
            __DEV__ &&
            (desc = Object.getOwnPropertyDescriptor(refs, key)) &&
            !desc.configurable
    ) {
      warn(`useTemplateRef('${key}') already exists.`)
    } else {
      Object.defineProperty(refs, key, {
        enumerable: true,
        get: () => r.value,
        set: val => (r.value = val),
      })
    }
  } else if (__DEV__) {
    warn(
            `useTemplateRef() is called when there is no active component ` +
            `instance to be associated with.`,
    )
  }
  const ret = __DEV__ ? readonly(r) : r
  if (__DEV__) {
    knownTemplateRefs.add(ret)
  }
  return ret
}
```

## 6、Git相关

## 7、GitHub相关

## 8、NPM相关

## 9、项目相关

### 9.1 更新打包后文件内容

在使用一些插件进行打包时，可能会出现文件路径错误的问题。有一些情况可以通过打包工具或插件配置进行调整。但也有一些情况只能通过手动修改。以下介绍的是手动修改的方案。

思路为在打包后手动触发更新文件。更新文件的逻辑为根据打包后的文件路径对文件进行读取并使用正则匹配定位并进行内容修改。

以下示例为使用`updateHtml.js`文件对打包后的`index.html`文件中`id`为`vite-legacy-polyfill`和`vite-legacy-entry`的`script`
分别进行`src`和`data-src`调整。

`package.json`文件中的`build tools`添加`node tool/updateHtml.js`手动触发更新文件。

```json
// package.json 文件
{
  "name": "demo",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev tools": "vite",
    "build tools": "vite build --config build.js & node tool/updateHtml.js"
  },
  "dependencies": {
    "@vitejs/plugin-legacy": "^6.0.0",
    "axios": "^1.6.7",
    "crypto-js": "^4.2.0",
    "pinia": "^2.1.7",
    "vue": "^3.4.21",
    "vue-router": "^4.3.0"
  }
}
```

`updateHtml.js`文件中对`index.html`文件内容进行替换。

```javascript
// updateHtml.js 文件
import fs from 'fs';

// 打包后的 HTML 文件路径
const htmlPath = './dist/index.html';
const prefix = '/ofd/business'; // 替换为你的前缀

// 读取 HTML 文件内容
const htmlText = fs.readFileSync(htmlPath, 'utf8');

// 定义正则表达式，匹配 id 为 vite-legacy-polyfill 或 vite-legacy-entry 的 script 标签
const regex = /<script[^>]+id=["'](?:vite-legacy-polyfill|vite-legacy-entry)["'][^>]*>/g;

// 替换匹配到的 script 标签的 src 和 data-src 属性
const updatedHtml = htmlText.replace(regex, (match) => {
  // 匹配并替换 data-src 属性
  const dataSrcMatch = match.match(/data-src=["']([^"']+)["']/);
  if (dataSrcMatch) {
    match = match.replace(dataSrcMatch[1], `${prefix}/${dataSrcMatch[1]}`);
  } else {
    // 匹配并替换 src 属性
    const srcMatch = match.match(/src=["']([^"']+)["']/);
    if (srcMatch) {
      match = match.replace(srcMatch[1], `${prefix}/${srcMatch[1]}`);
    }
  }
  return match;
});

// 将修改后的内容写回 HTML 文件
fs.writeFileSync(htmlPath, updatedHtml, 'utf8');

console.log('HTML 文件已更新');
```

## 10、性能优化相关

## 11、Visual Studio Code配置相关

## 12、WebStorm配置相关

## 13、webpack相关

## 14、Vite相关

### 14.1 Vite常用配置

参考：https://cn.vitejs.dev/guide/
https://juejin.cn/post/7441241705537355828
https://juejin.cn/post/7241057752070799416

如官网所说，`Vite`是一种新型前端构建工具，能够显著提升前端开发体验，它主要由两部分组成：

* 一个开发服务器，它基于原生`ES`模块提供了丰富的内建功能，如速度快到惊人的模块热替换（`HMR`）。
* 一套构建指令，它使用`Rollup`打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源。

项目根目录下有一个`vite.config.js`或`vite.config.ts`文件，这是`Vite`的配置文件。

#### 14.1.1 配置别名

配置`resolve.alias`，使用`@`符号代表`src`目录。

```typescript
import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import {resolve} from "path";

// https://cn.vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
```

按需导入：

```typescript
import {defineConfig} from 'vite'
import type {UserConfig, ConfigEnv} from "vite";
import vue from "@vitejs/plugin-vue";
import {resolve} from "path";

// https://cn.vitejs.dev/config/
export default ({mode}: ConfigEnv): UserConfig => {
  // 获取当前工作目录的路径
  const root: string = process.cwd();
  const pathResolve = (dir: string): string => {
    return resolve(root, ".", dir);
  };

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        "@": pathResolve("src"),
      },
    },
  };
};
```

如果使用了`TypeScript`的话，需要在`tsconfig.json`中配置：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    //使用相对路径，当前根目录
    "paths": {
      "@/*": [
        "src/*"
      ]
    }
  }
}
```

#### 14.1.2 省略拓展名列表

不建议忽略自定义导入类型的扩展名`.vue`，会影响`IDE`和类型支持

```typescript
import {defineConfig} from "vite";

export default defineConfig({
  resolve: {
    //导入文件时省略的扩展名列表
    extensions: [
      ".mjs",
      ".js",
      ".ts",
      ".jsx",
      ".tsx",
      ".json",
    ],
  },
});
```

#### 14.1.3 常用插件

在`plugins`中可以添加你的插件，它是一个数组。

* `@vitejs/plugin-vue-jsx`：`JSX`、`TSX`语法支持
* `vite-plugin-mock`：`Mock`支持
* `vite-plugin-svg-icons`：`svg`图标
* `unplugin-auto-import/vite`：按需自动导入
* `unplugin-vue-components/vite`：按需组件自动导入
* `unocss/vite`：原子化`css`

官方插件：https://cn.vitejs.dev/plugins/

社区插件：https://github.com/vitejs/awesome-vite#plugins

##### 14.1.3.1 gzip压缩打包

`GitHub`地址：https://github.com/vbenjs/vite-plugin-compression

```shell
npm i vite-plugin-compression -D
```

```typescript
//vite.config.ts
import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    vue(),
    //默认压缩gzip，生产.gz文件
    viteCompression({
      deleteOriginFile: false, //压缩后是否删除源文件
    }),
  ],
});
```

一般来说，真正想使用`gzip`压缩来优化项目，还需要在`nginx`中开启`gzip`并进行相关配置，这一步交给后端来处理。

##### 14.1.3.2 打包分析可视化

`GitHub`地址：https://github.com/btd/rollup-plugin-visualizer

```shell
npm i rollup-plugin-visualizer -D
```

```typescript
//vite.config.ts
import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import {visualizer} from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      open: true, //build后，是否自动打开分析页面，默认false
      gzipSize: true, //是否分析gzip大小
      brotliSize: true, //是否分析brotli大小
      //filename: 'stats.html'//分析文件命名
    }),
  ],
});
```

`npm build`后，分析图`html`文件会在根目录下生成，默认命名为`stats.html`。

##### 14.1.3.3 集成按需引入配置

```shell
npm i -D unplugin-vue-components unplugin-auto-import
```

以`ElementPlus`组件库为例子，在`vite.config.ts`中配置如下：

```typescript
import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import {
  AntDesignVueResolver,
  ElementPlusResolver,
} from "unplugin-vue-components/resolvers";
import AutoImport from "unplugin-auto-import/vite";

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        //AntDesignVueResolver({ importStyle: "less" }),
        ElementPlusResolver({importStyle: "sass"}),
      ],
      dts: "src/typings/components.d.ts", //自定义生成 components.d.ts 路径
    }),
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        //一些全局注册的hook等，无需局部引入
        {
          // "@/hooks/useMessage": ["useMessage"],
        },
      ],
      resolvers: [ElementPlusResolver()], //AntDesignVueResolver()
      dts: "src/typings/auto-imports.d.ts", //自定义生成 auto-imports.d.ts 路径
    }),
  ],
});
```

`unplugin-vue-components`会在`src/typings`文件夹下生成`components.d.ts`类型文件。

`unplugin-auto-import`会在`src/typings`文件夹下生成`auto-imports.d.ts`类型文件。

`unplugin-vue-components`插件会自动引入`UI`组件及`src`文件夹下的`components`组件，规则是`src/components/*.{vue}`。

请确保你的项目中拥有`src/typings`文件夹，或更改上述配置项的`dts`路径。

如果使用了`TypeScript`的话，需要在`tsconfig.json`中引入组件库的类型声明文件：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "types": [
      "node",
      "vite/client",
      "element-plus/global"
    ]
  }
}
```

#### 14.1.4 环境变量

##### 14.1.4.1 基础配置

环境变量。顾名思义，在不同环境下呈现不同的变量值

`Vite`在一个特殊的`import.meta.env`对象上暴露环境变量，这些变量在构建时会被静态地替换掉。这里有一些在所有情况下都可以使用的内建变量：

* `import.meta.env.MODE`（`string`）：应用运行的模式。`development`表示开发环境，`production`表示生产环境。
* `import.meta.env.BASE_URL`（`string`）：部署应用时的基本`URL`。他由`base`配置项决定，默认为`/`。
* `import.meta.env.PROD`（`boolean`）：应用是否运行在生产环境（使用`NODE_ENV='production'`
  运行开发服务器或构建应用时使用`NODE_ENV='production'`）。
* `import.meta.env.DEV`（`boolean`）：应用是否运行在开发环境（永远与`import.meta.env.PROD`相反）。
* `import.meta.env.SSR`（`boolean`）：应用是否运行在`server`上。

##### 14.1.4.2 配置文件

在`Vite`中，只有以`VITE_`为前缀的变量才会交给`Vite`来处理，比如

```typescript
VITE_KEY = 123;
```

如果要改前缀的话，在`vite.config.ts`中设置`envPrefix` ，它可以是一个字符串或者字符串数组

定义环境变量，首先先创建几个环境变量存放的文件，一般是放在根目录下：

`Vite`也提供了`envDir`用来自定义环境文件存放目录

* 新建`.env`文件，表示通用的环境变量，优先级较低，会被其他环境文件覆盖
* 新建`.env.development`文件，表示开发环境下的环境变量
* 新建`.env.production`文件，表示生产环境下的环境变量

需要的话，你可以加入更多的环境，比如预发布环境`.env.staging`(它的配置一般与生产环境无异，只是`url`变化)
和测试环境`.env.testing`。

`.env`文件：

```env
// 网站标题
VITE_GLOB_APP_TITLE = clean Admin

// 在本地打开时的端口号
VITE_PROT = 8888
```

`.env.development`文件：

```env
// 本地环境

// API 请求URL
VITE_API_URL = ""
```

`.env.production`文件：

```env
// 生产环境

// API 请求URL
VITE_API_URL = ""
```

在默认情况下，运行的脚本`npm dev`命令是会加载`.env.development`中的环境变量，而脚本`build`命令是加载`.env.production`
中的环境变量。

了解更多请参阅：https://cn.vitejs.dev/guide/env-and-mode#modes

最常见的业务场景就是，前端与后端的接口联调，本地开发环境与线上环境用的接口地址不同，这时只需要定义不同环境文件的相同变量即可
也可以通过在`package.json`中改写脚本命令来自定义加载你想要的环境文件，关键词是`--mode`

```json
//package.json
{
  "scripts": {
    "dev": "vite --mode production"
    "build": "vue-tsc -b && vite build",
    "build:dev": "vue-tsc -b && vite build --mode development"
  }
}
```

如果使用了`TypeScript`的话，可以为环境变量提供智能提示。在`src/typings`目录下新建一个`env.d.ts`，写入以下内容：

```typescript
// 环境变量-类型提示
interface ImportMetaEnv {
  /** 全局标题 */
  readonly VITE_APP_TITLE: string;
  /** 本地开发-端口号 */
  readonly VITE_DEV_PORT: number;
  // 加入更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

记得在`tsconfig`文件中配置`include`引入类型声明文件，`typings`代表你的类型文件目录名称

```json
{
  // "compilerOptions": {},
  "include": [
    "typings/**/*.d.ts",
    "typings/**/*.ts"
  ]
}
```

##### 14.1.4.3 在配置中使用环境变量

环境变量通常可以从`process.env`获得。

注意`Vite`默认是不加载`.env`文件的，因为这些文件需要在执行完`Vite`配置后才能确定加载哪一个，举个例子，`root`和`envDir`
选项会影响加载行为。不过当你的确需要时，你可以使用`Vite`导出的`loadEnv`函数来加载指定的`.env`文件。

```typescript
import {defineConfig, loadEnv} from 'vite'

export default defineConfig(({mode}) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // vite 配置
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
  }
})
```

`loadEnv`函数是用来加载`envDir`中的`.env`文件（一般是放在根目录下）。

* `mode`：当前环境模式，开发环境、生产环境等。
* `envDir`：`env`文件目录地址。
* `prefixes`：环境变量前缀，默认是`VITE_`。

此时加载的`env`文件内容为字符串，需要对内容进行处理（详见`processEnv.js`文件）。

#### 14.1.5 CSS配置

参考：https://cn.vitejs.dev/config/shared-options#css-preprocessoroptions

以`scss`为例。手写确保你已经安装了`sass`。

```shell
npm install sass
```

创建`scss`文件。

```scss
// src/styles/variables.scss
$primary-color: #4e6ef2;
```

在`vite.config.js`中配置`preprocessorOptions`和`additionalData`：

```javascript
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  }
});
```

在`Vue`组件中使用全局变量时，不需要手动导入`variables.scss`，因为`additionalData`已经在每个`SCSS`文件中注入了这些变量。例如：

```vue
<!-- 注意：使用全局变量的组件，必须有 scss 的样式块，否则不会注入全局变量 -->
<template>
  <div class="container">
    <h1>Hello, Vite and SCSS!</h1>
  </div>
</template>

<script>
  export default {
    name: 'App'
  };
</script>

<style scoped lang="scss">
  .container {
    color: $primary-color;
  }
</style>
```

#### 14.1.6 依赖预构建配置

参考：https://cn.vitejs.dev/config/dep-optimization-options
https://cn.vitejs.dev/guide/dep-pre-bundling.html

在`Vite`中，依赖预构建是指将第三方依赖预先编译和优化，以便在开发过程中更快地构建和加载这些依赖。

这种预构建的方式有助于减少开发服务器在启动和重新加载时的延迟，并且可以利用现代浏览器的`ES`模块支持来更高效地加载模块。

预构建的优势：

* 更快地开发启动时间
* 更快的热更新
* 现代浏览器的`ES`模块支持

##### 14.1.6.1 预构建的目的

1、**`CommonJS`和`UMD`兼容性：** 在开发阶段中，`Vite`的开发服务器将所有代码视为原生`ES`模块。因此，`Vite`必须先将以`CommonJS`
或`UMD`形式提供的依赖项转换为`ES`模块。

在转换`CommonJS`依赖项时，`Vite`会进行智能导入分析，这样即使模块的导出是动态分配的（例如`React`），具名导入（`named imports`
）也能正常工作：

```javascript
// 符合预期
import React, {useState} from 'react'
```

2、**性能：** 为了提高后续页面的加载性能，`Vite`将那些具有许多内部模块的`ESM`依赖项转换为单个模块。

有些包将它们的`ES`模块构建为许多单独的文件，彼此导入。例如，`lodash-es`有超过`600`
个内置模块！当我们执行`import { debounce } from 'lodash-es'`时，浏览器同时发出`600`多个`HTTP`
请求。即使服务器能够轻松处理它们，但大量请求会导致浏览器端的网络拥塞，使页面加载变得明显缓慢。

通过将`lodash-es`预构建成单个模块，现在我们只需要一个`HTTP`请求。

**注意：依赖预构建仅适用于开发模式，并使用`esbuild`将依赖项转换为`ES`模块。在生产构建中，将使用`@rollup/plugin-commonjs`。**

##### 14.1.6.2 自定义行为

有时默认的依赖启发式算法`discovery heuristics`可能并不总是理想的。如果您想要明确地包含或排除依赖项，可以使用
[optimizeDeps](https://cn.vitejs.dev/config/dep-optimization-options#dep-optimization-options)配置项来进行设置。

* `optimizeDeps.include`：强制预构建链接的包。
* `optimizeDeps.exclude`：在预构建中强制排除的依赖项。

`optimizeDeps.include`或`optimizeDeps.exclude`的一个典型使用场景，是当`Vite`在源码中无法直接发现`import`
的时候。例如，`import`可能是插件转换的结果。这意味着`Vite`无法在初始扫描时发现`import`
。只有文件在浏览器请求加载并转换后才会发现。这将导致服务器在启动后立即重新打包。

`include`和`exclude`都可以用来处理这个问题。如果依赖项很大（包含很多内部模块）或是`CommonJS`
，那么你应该包含它；如果依赖项很小，并且已经是有效的`ESM`，则可以排除它，让浏览器直接加载它。

你可以通过`optimizeDeps.esbuildOptions`选项进一步自定义`esbuild`。例如，添加一个`esbuild`
插件来处理依赖项中的特殊文件，或者更改[build target](https://esbuild.github.io/api/#target)。

示例：

```javascript
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: [
      "qs",
      "echarts",
      "@vueuse/core",
      "nprogress",
      "lodash-es",
      "dayjs",
    ],
    exclude: [],
  },
});
```

##### 14.1.6.3 缓存

1、文件系统缓存

`Vite`将预构建的依赖项缓存到`node_modules/.vite`中。它会基于以下来源来决定是否需要重新运行预构建步骤：

* 包管理器的锁文件内容，例如`package-lock.json`，`yarn.lock`，`pnpm-lock.yaml`，或者`bun.lockb`。
* 补丁文件夹的修改时间。
* `vite.config.js`中的相关字段。
* `NODE_ENV`的值。

只有在上述其中一项发生更改时，才需要重新运行预构建。

如果出于某些原因（比如自己手写的依赖包进行了更新且重新下载依赖后，依赖缓存仍为旧依赖包）需要强制`Vite`
重新构建依赖项，你可以在启动开发服务器时指定`--force`选项，或手动删除`node_modules/.vite`缓存目录。

2、浏览器缓存

已预构建的依赖请求使用`HTTP`头`max-age=31536000`,`immutable`
进行强缓存，以提高开发工作时页面重新加载的性能。一旦被缓存，这些请求将永远不会再次访问开发服务器。如果安装了不同版本的依赖项（这反映在包管理器的`lockfile`
中），则会通过附加版本查询自动失效。如果你想通过本地编辑来调试依赖项，您可以：

1. 通过浏览器开发工具的`Network`选项卡暂时禁用缓存。
2. 重启`Vite`开发服务器指定`--force`选项，来重新构建依赖项。
3. 重新载入页面。

#### 14.1.7 打包配置

生产环境去除`console.log`、`debugger`（`esbuild`模式）

```javascript
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  esbuild: {
    drop: ["debugger"],
    pure: ["console.log"],
  },
});
```

#### 14.1.8 分包策略

分包策略是指将一个大型项目或应用按照一定的规则和逻辑拆分成多个独立的模块或包。这些模块可以是功能模块、业务模块、技术模块等。通过分包，可以实现代码的解耦、提高编译效率、优化资源加载速度、提升用户体验。

##### 14.1.8.1 分包的作用

分包是一种优化程序加载速度，性能的策略和操作

安装了很多依赖包的项目进行打包时，代码都打包成一个`js`文件。只修改其中的一些文件重新打包上线，浏览器会重新加载这个`js`
文件。但你只修改了项目其中一部分，却要把整个文件都重新加载一边，是否合理呢？特别是当项目越来越大时，你就会发现页面的加载速度越来越慢
所以，分包策略的作用在于：

* 减少代码体积和加载时间：当你的项目包含多个模块或者依赖项时，将它们分割成多个包可以减少单个包的体积。并且只重新加载修改的文件，减少加载时间。
* 提高缓存利用率：处理部分包而不是全部，分包可以提高浏览器的缓存命中率，从而减少不必要的网络请求，加快页面加载速度。
* 优化资源结构：对于大型项目或者复杂的应用程序，通过合理划分功能模块和依赖项，有利于管理项目的整理结构和维护。

##### 14.1.8.2 常见分包策略

分包策略根据项目不同，会呈现出不同的策略，这里提供一些通用的思路

1、按功能模块分包

将应用按照功能模块划分，如用户管理模块、订单管理模块等。例如，在一个电商应用中，可以将用户界面`UI`、数据模型、网络请求等分别分包。

2、按技术层分包

按照`MVC`、`MVVM`等设计模式分层，如`UI`层、业务逻辑层、数据层

3、按业务领域分包

适用于复杂业务场景，如订单管理、库存管理等

4、优化第三方库的加载

将第三方库（如`React`、`Vue`）单独打包并进行长期缓存，减少加载成本

5、利用浏览器缓存：

将不常变化的代码（如三方库、框架代码）与常变化的业务代码分离，前者可以长期缓存

**注意事项：**
分包的平衡性：避免分包过小导致过多`HTTP`请求，或分包过大导致加载时间过长。
避免过度分包：过度分包可能导致包数量过多，反而影响性能。

##### 14.1.8.3 Vite分包示例

分包需要一定的前端工程化及性能优化知识，参阅[Rollup](https://www.rollupjs.com/)

在`vite.config.js`中的简单分包：

```javascript
// manualChunks.js 文件
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(() => {
  /**
   * 根据依赖项详细信息进行分包
   * @param id 依赖项详细信息
   * @returns {string} 分包名
   */
  const manualChunks = (id) => {
    if (id.includes('node_modules')) {
      if (id.includes('lodash-es')) {
        return 'lodash-vendor'; // 将包含 lodash-es 的代码打包到 lodash-vendor chunk
      }
      if (id.includes('element-plus')) {
        return 'el-vendor'; // 将包含 element-plus 的代码打包到 el-vendor chunk
      }
      if (id.includes('@vue') || id.includes('vue')) {
        return 'vue-vendor'; // 将包含 @vue 和 vue 的代码打包到 vue-vendor chunk
      }
      return 'vendor'; // 其余内容打包到 vendor chunk
    }
  };

  return {
    plugins: [vue()],
    build: {
      chunkSizeWarningLimit: 1500, // 超出 chunk 大小警告阈值，默认500kb
      // Rollup 打包配置
      rollupOptions: {
        output: {
          entryFileNames: "assets/js/[name]-[hash:8].js", // 入口文件输出的文件的命名规则
          chunkFileNames: "assets/js/[name]-[hash:8].js", // 代码分割生成的 chunk 文件的命名规则
          assetFileNames: "assets/[ext]/[name]-[hash:8][extname]", // 静态资源的文件名和存放路径
          manualChunks, // 代码分割策略
        },
      },
    },
  }
});
```

## 15、实用工具

