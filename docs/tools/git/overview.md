# git常用操作

这里演示从一个新建的仓库提交代码合并分支的一些基本操作。

## 第一步

克隆仓库`git clone`

```shell
git clone "https://gitee.com/ly3566/git-hands-practice.git"
```

设置用户信息，这里必须要正确设置，否则提交代码可能不会计算贡献，也就是个人首页的日历图上没有提交记录

```shell
# 全局设置
git config --global user.email '邮箱'
git config --global user.name '用户名'
# 为这个仓库单独设置
git config user.email '邮箱'
git config user.name '用户名'
```

手动创建`README.md`文件文件并提交

```shell
# 查看当前仓库状态
git status
# 跟踪一个文件，把它添加到暂存区
git add "README.md"
# 提交文件并设置备注，这里是提交到本地仓库，没有上传到服务器
git commit -m "首次提交"
```

推送到远程仓库，推送前应该确保本地环境和远程一致，也就是先执行`git pull`

```shell
# 查看提交记录
git log
# 关联的远程仓库
git remote -v
# 查看当前分支
git branch
# 把数据推送到origin远程的master分支
git push origin master
```


## 分支

先`Fork`项目，然后`clone`到本地开发。注意：这里需要先fork项目

```shell
# 创建分支 test
git branck test
# 切换到test分支
git checkout test
# 修改文件后提交到test分支
git add -am "测试提交"
# 推送到自己的fork的远程仓库
git push origin test
```

推送到自己仓库的`test`分支后，点击`pull requests`标签发起一个PR，请求合并`test`分支到主项目的`master`分支

![Pull Requests](../../../static-img/tools/git/Snipaste_2023-07-09_23-49-07.png)


然后仓库的管理员再根据提交的PR决定是否合并到项目中


## 示例

初始化一个新仓库

```shell
echo "# ly-space" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin 你的仓库地址
git push -u origin main
```
