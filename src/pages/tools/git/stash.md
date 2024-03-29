# 临时存储

`git stash`可以临时保存当前工作区的修改，这样你的工作区是干净的，就可以切换分支去处理其他事。
默认只能保存已跟踪的文件，也就是被`git add`的文件，想要报错所有文件可以用`git stash save -u`

```shell
# 将当前修改临时保存
git stash
# 所有文件包括文件夹都保存
git stash save -u
# 查看已保存的修改
git stash list
# 还原修改
git stash apply
# 还原修改并且删除这个临时存储
git stash pop
```

