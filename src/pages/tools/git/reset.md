# 撤销操作

`git reset`命令可以进行版本回退，也可以取消暂存区保存的文件，因为这个命令可能会导致文件永久消失，所以用的时候要小心

单纯的`reset`会取消当前暂存区的文件，让他们都回复到未保存的状态，如果不小心添加了一些不想上传的文件，可以用这个命令取消

```sh
git reset
# 相当于软回退到最新版本
git reset --soft HEAD
git reset --hard HEAD~1
```

指定要回退的版本，因为默认用的是`--soft`软回退，所以那些新文件并不会被删除

```shell
git reset 版本号
# 也可以用HEAD~表示上一个版本
git reset HEAD~
```

回退并且还原工作区，加上`--hard`表示硬回退，它会删除新文件，让所有文件都还原到上个版本的状态。这个命令一定要小心使用
因为删掉的文件真的无法恢复了

```shell
git reset --hard 版本号
```


本地提交了一条记录但是发现有文件忘记上传了，可以直接添加文件，不用撤销

```sh
git add 要添加的文件
# 会弹出一个窗口让你修改提交信息 :wq 保存并退出
git commit --amend
```

这样可以把这些文件加到这次的提交里面