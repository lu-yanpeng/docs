# 分支

`HEAD`指针所指向的版本就是当前正在操作的版本。切换分支的时候`HEAD`也会跟着切换。

## 创建分支

`git branch 分支名`创建一个新分支，但是它并不会自动切换过去。

```shell
# 创建test分支
git branch test
# 查看所有分支
git branch
```

## 切换分支

如果

```shell
# 切换到test分支
git checkout test
# 创建并切换到test分支
git checkout -b test
```

## 已合并

```shell
# 已合并的分支
git branch --merged
# 未合并的分支
git branch --no-merged
```

## 删除分支

注意：无法删除一个已修改但是没有合并的分支，可以用`--merged`参数查看已合并的分支

```shell
# 删除test分支
git branch -d test
```
