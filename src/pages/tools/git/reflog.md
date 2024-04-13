# 恢复

只要是提交过的文件，不小心误操作删除了，可以用`git reflog`从提交记录中找回

## git reflog

查找历史提交记录，这里需要记住要恢复记录的hash值

```shell
git reflog
```


## git cherry-pick 

这个命令会把当前工作区的文件恢复到对应状态，不会删除当前未保存的文件

```shell
# 后面跟上要恢复记录的hash值
git cherry-pick 34489f0
```
