# 临时存储

`git stash`可以临时保存当前工作区的修改，这样你的工作区是干净的，就可以切换分支去处理其他事。

```shell
# 将当前修改临时保存
git stash
# 查看已保存的修改
git stash list
# 还原修改
git stash apply
# 还原修改并且删除这个临时存储
git stash pop
```

