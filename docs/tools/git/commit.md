# 提交

把当前工作区的修改提交到本地仓库，同步到远程仓库你需要`git push`

```shell
# 提交修改并写上备注，这是最常用的命令
git commit -m "备注信息"
# 打开自带的编辑器写备注
git commit
```

## 修改提交信息

如果备注写错了还没有`push`到远程的话是可以修改的。如果要修改远程仓库的提交信息需要强制更新比较麻烦，所以建议只修改本地的commit信息

```shell
# 会打开自带的编辑器修改备注信息，退出的时候按回车可以保存
git commit --amend
```

如果有文件忘记`add`了，也可以用这个命令加上

```shell
# 把需要的文件添加到暂存区
git add test.txt
# 把暂存区的文件一起合并保存到最新的这次提交里面
git commit --amend
# 可以查看最新的这次提交
git log -p -1
```
