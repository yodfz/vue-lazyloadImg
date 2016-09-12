# How do use?

## step 1 install
```javascript
npm install --save vue-lazyloadimg
```

## step 2 use vue

```javascript
import vueLazyImg from 'vue-lazyImg';
import vue from 'vue';
vue.use(vueLazyImg);
```

## step 3 .vue use

``` html
<img src="{{'1x1 transform png'}}" :data-src="{{need load img url}}" class="lazyimg" alt="">
```

# build script
run:
``` javascript
webpack --display-error-details
```