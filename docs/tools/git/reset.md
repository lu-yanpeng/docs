# 撤销操作

TODO 待完善

```sh
git reset --soft HEAD~1
git reset --hard HEAD~1
```



本地提交了一条记录但是发现有文件忘记上传了，可以直接添加文件，不用撤销

```sh
git add 要添加的文件
# 会弹出一个窗口让你修改提交信息 :wq 保存并退出
git commit --amend
```

这样可以把这些文件加到这次的提交里面