# Pull Requests

这个功能是github这类远程仓库提供的功能，它可以很方便的进行多人开发，提交PR之后由管理员决定要不要合并代码，降低了随意合并的危险性

要提交PR需要先`Fork`仓库，也就是复刻一个仓库到自己的账号下，然后可以`clone`自己账号下的这个仓库到本地开发，
开发好之后就可以提交PR给源项目的管理员审核了。这样做的好处是本地有一个完整的项目可以随意开发，并且提交后由管理员统一审核避免错误


设置上游地址，设置后可以用`git pull upstream master`将本地项目和源项目同步

```shell
git remote add upstream '仓库地址'
# 设置后可以查看到上游的地址
git remote -v
```

拉取上游的更新，只会拉取提交日志，不会更新代码，需要自己手动合并代码

```shell
git fetch upstream
```

同步上游代码，将本地代码和源仓库代码进行同步，需要先设置上游才行

```shell
git pull upstream master
```
