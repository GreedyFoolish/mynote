# myNote

## 实用工具

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
    var currentHeight = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
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

### 1.4.2 scrollTo函数

控制滚动条回到指定位置，第一个参数是距离页面左端的距离，第二个参数是距离页面顶部的距离。

```html
<a href="javascript:scrollTo(0, 0)">回到顶部</a>
```

### 1.4.3 scrollTop函数

控制滚动条垂直偏移。

```javascript
<a onclick="byScrollTop()">回到顶部</a>

function byScrollTop() {
    document.documentElement.scrollTop = 0;
    window.pageYOffset = 0; // 兼容ios
    document.body.scrollTop = 0; // 兼容低版本ie
}
```

### 1.4.4 scrollBy函数

该方法可把内容滚动指定的像素数。第一个参数指向右滚动的像素，第二个参数指向下滚动的参数，负数可使方向相反。

```javascript
<a onclick="byScrollBy()">回到顶部</a>

function byScrollBy() {
    var topHeight = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    scrollBy(0, -topHeight);
}
```

### 1.4.4 间接回到顶部

定时器实现滚动动画。通过定时器实现固定速度的自动滚动动画效果。但是这样会有个问题，就是当页面内容十分多的时候，这个时候离顶部已经有很长一段距离了。如果还是一个固定速度的话，可能会长达10秒钟，这对用户体验来说是不友好的。

```javascript
<a onclick="scrollToTop()">回到顶部</a>

function scrollToTop() {
    var topHeight = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
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
    var topHeight = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    var speed = topHeight / 10 > 100 ? topHeight / 10 : 100;
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

1. 自动换行：

```vue

<style lang="scss">
  * {
    word-break: normal;
    word-wrap: break-word;
  }
</style>
```

2. 强制换行：

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

* 注意：单词换行需要父盒子为块级元素

3. 强制不换行：

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

![1.8.png](img/1.8/1.png)

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

![1.10.1.png](img/1.10/1.png)

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

![1.10.2.png](img/1.10/2.png)

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

![1.10.3.png](img/1.10/3.png)

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

![1.10.4.png](img/1.10/4.png)

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

![1.10.5.png](img/1.10/5.png)

#### 1.10.6 align-content属性

lign-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

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

![1.10.6.png](img/1.10/6.png)

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

![1.10.7.png](img/1.10/7.png)

#### 1.10.8 flex-grow属性

flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

```css
.item {
    flex-grow: 0;
}
```

![1.10.8.png](img/1.10/8.png)

#### 1.10.9  flex-shrink属性

flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。
负值对该属性无效。

```css
.item {
    flex-shrink: 1;
}
```

![1.10.9.png](img/1.10/9.png)

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

![1.10.10.png](img/1.10/10.png)

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

### 1.11.4 重新运行项目，触发配置文件生效

## 2、JavaScript相关

### 2.1 获取图片实际宽高

```javascript
var img_url = '13643608813441.jpg'
var img = new Image()
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

## 3、HTML5相关

## 4、VUE2相关

## 5、VUE3相关

## 6、Git相关

## 7、GitHub相关

## 8、NPM相关

## 9、项目相关

## 10、性能优化相关

## 11、Visual Studio Code配置相关

## 12、WebStorm配置相关

## 13、webpack相关

## 14、Vite相关
