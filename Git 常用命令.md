## 一、fork的项目

### 1、克隆

`git clone [fork用户的sshURL]`

### 2、设置线上主分支为upstream

`git remote add upstream [被fork用户的sshURL]`

### 3、检查分支

`git remote -v`

如果输出的是：
```
orgin：为本地分支的
upstream：为远程分支
```
表明主分支设置成功

## 二、自己本地的项目

### 查看用户信息

`git config --list`

1、`git config --global user.name "438198602"`

2、`git config --global user.email "438198602@qq.com"`

3、`git init`

4、`git add ./`

5、`git commit -m "改动注释"`

6、关联远程仓库

`git remote add origin 需要上传到远程服务器的项目的sshURL`

7、如果上一步报错，试试这个

`git pull 需要上传到远程服务器的项目的HTTPS`

8、将本地的内容同步到远程仓库中

`git push -u origin master`

> notes: git pull 提示 fatal: refusing to merge unrelated histories
解决方法 `git pull --allow-unrelated-histories`

## 三、git提交更改

1、`git add ./`

2.1、`git commit -m "改动注释"`

2.2、`git commit --amend -m [message]	使用一次新的commit，替代上一次提交`

3、将远程分支同步到本地

`git fetch upstream`

4、合并分支

`git merge upstream/master`

如果有冲突，用`git diff`来查看，然后在本地解决冲突文件，之后重复1、2、3、4的步骤。

5、提交

`git push origin`

6、登录github：进入我的最新提交master分支，点击`pull Request`提交到主分支

7、若提示代码无冲突则合并，点击按钮`pull Request`

## 四、其它git命令

### git版本回退

`git reset --hard HEAD^`

HEAD表示当前的版本，HEAD^ 表示上一个版本，上上个版本就是HEAD^^了，以此类推。HEAD~50即回退50个版本。

### gitk（git的图形化工具）

`gitk`

### git 切换分支工作

新建新分支

`git checkout -b 分支名`

相当于
```
新建分支
git branch 分支名
切换分支
git checkout 分支名
```

### 切换回原分支

`git checkout master`

### 合并分支

`git merge 分支名`

### 删除分支

`git branch -d 分支名`

### 切换分支前储藏当前分支的修改（不add和commit）

`git stash`

### 拉取储藏的修改

`git stash apply`  或者先运行`git stash list`查看所有的储藏列表，在运行`git stash apply @XXX`来拉取某个指定的储藏修改

### 删除储藏
`git stash drop`  使用方法同上

### 查看git历史

1、git log：查看当前分支的存在提交历史记录，不包括诸如删除的或被合并的提交；

2、git reflog：查看当前分支所有操作历史，诸如历史提交记录，撤销，合并提交等详细历史记录；


