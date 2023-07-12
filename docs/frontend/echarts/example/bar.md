# 柱状图 bar

一个基础柱状图。柱状图必须设置`xAxis`、`yAxis`和`series`，可以通过`grid`调整图形大小。柱状图一个轴是分类轴用来显示类目，
一个轴是数值轴显示具体数据，只需要指定其中一个轴，另一个轴会自动设置类型。

<script setup>
import BarBase from '../../../../components/frontend/echarts/example/bar/bar-base.vue';
import BarMore from '../../../../components/frontend/echarts/example/bar/bar-more.vue';
</script>

<bar-base />

::: details option
```js
const option = {
  xAxis: {type: 'category'},
  yAxis: {},
  dataset: {
    source: [
      ['科目', '张三'],
      ['语文', 100],
      ['数学', 80],
      ['英语', 90],
    ]
  },
  grid: {
    top: '20%',
    bottom: '20%'
  },
  series: [
    {type: 'bar'}
  ]
}
```
:::



## 多系列

每一个分类上有多个系列，只需要设置多个`series`就行了

<bar-more />

::: details option
```js
const option = {
  xAxis: {type: 'category'},
  yAxis: {},
  dataset: {
    source: [
      ['科目', '张三', '李四', '王五'],
      ['语文', 100, 80, 72],
      ['数学', 92, 60, 62],
      ['英语', 77, 92, 88],
    ]
  },
  series: [
    {type: 'bar'},
    {type: 'bar'},
    {type: 'bar'},
  ]
}
```
:::

多系列的`dataset`看起来像这样，第一列是分类轴的数据，后面每一列是一个系列的数据

```js
const option = {
  dataset: {
    source: [
      ['科目', '张三', '李四', '王五'],
      ['语文', 100, 80, 72],
      ['数学', 92, 60, 62],
      ['英语', 77, 92, 88],
    ]
}
}
```

如果用普通的写法就是这样

```js
const option = {
  xAxis: {
    type: 'category',
    data: ['语文', '数学', '英语']
  },
  series: [
    {type: 'bar', name: '张三', data: [100, 92, 77]},
    {type: 'bar', name: '李四', data: [80, 60, 92]},
    {type: 'bar', name: '王五', data: [72, 62, 88]},
  ]
}
```
