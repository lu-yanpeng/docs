# 签出

这个命令可以切换分支，也可以把一个文件的所有修改都撤销

## 切换分支

```shell
# 切换到test分支
git checkout test
# 创建test2并切换到test2分支
git checkout -b test2
```

## 撤销修改

可以删除对一个文件做的修改，让他恢复之前的状态。注意：对一个文件使用撤销操作就真的无法恢复了，使用前一定要考虑清楚。

```shell
git checkout -- 文件名
```
