# 选择元素

## querySelector()

查找第一个符合选择器条件的元素，返回`Element`对象，参数必须是正确的选择器字符串，否则报错

```js
// 查找id为app的元素
document.querySelector('#app')
```

## querySelectorAll()

用法和上面一样，但是返回一个符合条件的列表。

```js
// 查找#app下的所有div元素
document.querySelectorAll('#app > div')
```