# 删除

git删除文件或文件夹，[参考](https://zhuanlan.zhihu.com/p/465863655)

## git rm

删除本地文件并且同步到远程仓库

```shell
git rm file
git commit -m "deleted file"
git push origin master
```

只删除远程的文件，本地文件保留。加上`--cached`选项就可以只删除远程的文件

```shell
git rm --cached file
```

删除文件夹，加上 `-r` 选项

```shell
git rm -r folder
```

## claen

删除所有未提交和跟踪的文件

```shell
git clean -fd
```