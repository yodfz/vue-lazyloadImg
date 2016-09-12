# 如何使用?

## 安装插件
```javascript
npm install --save vue-lazyloadimg
```

## 引用插件
导入插件 `vue-lazyloadimg`.

并且使用 vue.use 引用它.
```javascript
import vueLazyImg from 'vue-lazyloadimg';
import vue from 'vue';
vue.use(vueLazyImg);
```

## 在模版中如何使用?
在绑定插件之后,插件会读取当前页面上的class标示为`lazyimg`的节点.然后缓存在系统中.
并且在页面节点出现变化的时候会重新缓存 `lazyimg` 节点.
``` html
<img src="{{'1x1 transform png'}}" :data-src="{{need load img url}}" class="lazyimg" alt="">
```

# build script
use babel.