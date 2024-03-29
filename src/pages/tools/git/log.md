# 提交记录

使用`git log`命令可以查看提交历史，也能看当前自己所处的版本位置

```shell
# 显示详细的提交记录，如果有多条的话按回车可以继续显示，按q键可以退出
git log
# 显示单行的提交记录，比较常用。它是这个属性的简写 --pretty=oneline
git log --oneline
# 以图形的方式显示合并记录
git log --graph
# 查看最近2条的详细信息，这里包括了diff信息
git log -p -2
```
