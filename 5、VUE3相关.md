# 5、VUE3相关

## 5.1 子组件修改父组件props值

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

## 5.2 自定义Hooks

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

## 5.3 computed计算属性传参

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

## 5.4 useId的使用

参考：https://juejin.cn/post/7429411484307161127

### 5.4.1 useId概念

`Vue 3.5`中新增的`useId`函数主要用于生成唯一的`ID`，这个`ID`在同一个`Vue`应用中是唯一的，并且每次调用`useId`
都会生成不同的`ID`。这个功能在处理列表渲染、表单元素和无障碍属性时非常有用，因为它可以确保每个元素都有一个唯一的标识符。

`useId`的实现原理相对简单。它通过访问`Vue`实例的`ids`属性来生成`ID`，`ids`包含用于生成`ID`
的前缀和自增数字。每次调用`useId`，都会取出当前的数字值进行自增操作。所以在同一页面上的多个`Vue`
应用实例可以通过配置`app.config.idPrefix`来避免`ID`冲突，因为每个应用实例都会维护自己的`ID`生成序列。

### 5.4.2 实现原理

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

### 5.4.3 使用场景

#### 5.4.3.1 表单元素的唯一标识

在表单中，`label`标签需要通过`for`属性与对应的`input`标签的`id`属性相匹配，以实现点击标签时输入框获得焦点的功能。

```html
<!-- 使用 useId 为每个 input 元素生成一个唯一的 id -->
<label :for="id">表单</label>
<input type="checkbox" :id="id"/>
<script>
  const id = useId()
</script>
```

#### 5.4.3.2 列表渲染中的唯一键

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

#### 5.4.3.3 服务端渲染（SSR）中避免ID冲突

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

#### 5.4.3.4 组件库中的ID生成

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

## 5.5 ref和reactive的区别

参考：https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html
https://cloud.tencent.com/developer/article/2397580

在组合式`API`中，推荐使用`ref()`函数来声明响应式状态。

### 5.5.1 ref函数

#### 5.5.1.1 ref使用

`ref()`接收参数，并将其包裹在一个带有`.value`属性的`ref`对象中返回。

```javascript
import {ref} from 'vue'

const count = ref(0)
console.log(count) // { value: 0 }
console.log(count.value) // 0
count.value++
console.log(count.value) // 1
```

#### 5.5.1.2 ref在模板中的使用

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

#### 5.5.1.3 为什么要使用ref

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

#### 5.5.1.4 深层响应性

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

#### 5.5.1.5 DOM 更新时机

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

### 5.5.2 reactive函数

#### 5.5.2.1 reactive使用

另一种声明响应式状态的方式是使用`reactive`。与将内部值包装在特殊对象中的`ref`不同，`reactive`将使对象本身具有响应性。

```javascript
import {reactive} from 'vue'

const state = reactive({count: 0})
```

#### 5.5.2.2 reactive在模板中的使用

```vue

<button @click="state.count++">
  {{ state.count }}
</button>
```

响应式对象是`JavaScript`代理，其行为就和普通对象一样。不同的是，`Vue`能够拦截对响应式对象所有属性的访问和修改，以便进行依赖追踪和触发更新。

`reactive()`将深层地转换对象：当访问嵌套对象时，它们也会被`reactive()`包装。当`ref`的值是一个对象时，`ref()`
也会在内部调用它。与浅层`ref`类似，`reactive()`也有一个`shallowReactive()`可以选择退出深层响应性。

#### 5.5.2.3 reactive的代理对象与原始对象的区别

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

### 5.5.3 reactive的局限性

#### 5.5.3.1 有限的值类型

它只适用于对象类型（对象、数组和`Map`、`Set`这样的集合类型）。它不能持有`string`、`number`或`boolean`这样的原始类型。

#### 5.5.3.2 不能替换整个对象

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

#### 5.5.3.3 对解构操作不友好

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

### 5.5.4 reactive与ref对比图

![5.5.1.png](assets/5.5/1.png)

## 5.6 useTemplateRef使用

参考：https://juejin.cn/post/7410259203175088138

### 5.6.1 useTemplateRef是什么

`Vue 3`中`DOM`和子组件可以使用`ref`进行模版引用。但`ref`存在有一些让人迷惑的地方。比如定义的`ref`到底是响应式数据还是`DOM`
元素？还有`template`中`ref`属性的值明明是一个字符串，比如`ref="inputEl"`，怎么就和`script`中同名的`inputEl`
变量绑到一块了呢？所以`Vue 3.5`推出了`useTemplateRef`函数，完美地解决了这些问题。

### 5.6.2 ref模版引用的问题

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

### 5.6.3 useTemplateRef函数

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

### 5.6.4 hooks中使用useTemplateRef函数

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

### 5.6.5 useTemplateRef源码

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