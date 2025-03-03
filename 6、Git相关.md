# 6、Git相关

## 6.1 Git常用命令

### 6.1.1 配置用户信息

```shell
# 设置用户名 
git config --global user.name "your name"
# 设置用户名
git config --global user.email "your email"
# 注意：--global 参数是全局应用，不加 --global，则只对当前仓库/项目有效
```

### 6.1.2 初始化仓库

```shell
# 初始化本地仓库
git init
```

### 6.1.3 克隆远程仓库

```shell
# 克隆远程仓库到本地（https://github.com/your-name/your-repo.git 为示例远程仓库地址）
git clone https://github.com/your-name/your-repo.git
```

### 6.1.4 查看状态

```shell
# 查看当前仓库状态
git status
```

### 6.1.5 添加文件到暂存区

```shell
# 添加单个文件（filename 为示例文件名）
git add filename
# 添加多个文件（filename1、filename2、filename3 为示例文件名）
git add filename1 filename2 filename3
# 添加所有文件
git add .
```

### 6.1.6 提交更改

```shell
# 提交更改并添加注释（your comment 为示例注释）
git commit -m "your comment"
```

### 6.1.7 查看提交历史

```shell
# 查看提交历史记录
git log
```

### 6.1.8 拉取远程更新

```shell
# 拉取远程仓库的最新更改
git pull
```

### 6.1.9 推送更改到远程仓库

```shell
# 推送本地更改到远程仓库
git push
```

### 6.1.10 创建分支

```shell
# 使用 branch-name 表示分支名
# 创建新分支
git branch branch-name
# 切换分支
git checkout branch-name
# 创建并切换到新分支
git checkout -b branch-name
```

### 6.1.11 合并分支

```shell
# 合并指定分支到当前分支
git merge branch-name
```

### 6.1.12 删除分支

```shell
# 删除本地分支
git branch -d branch-name
# 删除远程分支
git push origin --delete branch-name
```

### 6.1.13 应用提交

`git cherry-pick`是一个非常有用的命令，它允许你将某个特定的提交`commit`应用到当前分支。

这对于在不同分支之间应用单个或多个提交非常有用，而不需要合并整个分支。

```shell
# 应用单个提交（commit-hash 为提交哈希值）
git cherry-pick commit-hash
# 应用连续提交（start-commit 为起始提交哈希值，end-commit 为结束提交哈希值）
git cherry-pick <start-commit>^..<end-commit>
# 应用连续提交（start-commit 为起始提交哈希值，end-commit 为结束提交哈希值）
git cherry-pick <start-commit>..<end-commit>
# 应用多个不连续提交（commit-hash1、commit-hash2、commit-hash3 为连续提交的哈希值）
git cherry-pick commit-hash1 commit-hash2 commit-hash3
# 查看提交历史以找到 commit hash
git log --oneline
# 如果 cherry-pick 的提交与当前分支有冲突，Git 会提示你解决这些冲突。解决冲突后，继续 cherry-pick
git add <conflicted-files>
git cherry-pick --continue
# 如果不想继续，可以放弃 cherry-pick
git cherry-pick --abort

# 假设你在 feature 分支上有一个重要的修复提交，但这个修复也需要应用到 main 分支上
git checkout main
# 获取 feature 分支上的提交哈希
git log feature --oneline
# 使用 cherry-pick 将特定提交应用到 main 分支
git cherry-pick <commit-hash>
```

* 不要滥用：频繁使用`cherry-pick`可能会导致代码库的历史记录变得混乱。尽量通过合理的分支管理和合并来维护清晰的历史记录。
* 重复提交：`cherry-pick`会在目标分支上创建一个新提交，即使源分支和目标分支上的提交内容完全相同，它们也会有不同的哈希值。

### 6.1.14 撤销提交

```shell
# 撤销最近一次提交（保留更改）
git reset HEAD~1
# 撤销最近一次提交（不保留更改）
git reset --hard HEAD~1
# 撤销特定提交（commit-hash 为提交哈希值）
git revert commit-hash
# 撤销尚未推送的多个提交（start-commit 为起始提交哈希值，end-commit 为结束提交哈希值）
git revert --no-commit <start-commit>^..<end-commit>
# 使用 rebase 命令撤销尚未推送的多个提交（n 为提交数量）
git rebase -i HEAD~n
# 撤销已推送的提交
# 如果你已经将提交推送到远程仓库，并且需要撤销这些提交，建议使用 git revert 来创建新的提交
# 以撤销更改，而不是直接修改提交历史，因为直接修改历史可能会导致其他开发者出现问题。
# 恢复到某个特定的提交（commit-hash 为提交哈希值）注意：此操作会丢失该提交之后的所有更改，请谨慎使用
git reset --hard commit-hash

# 如果已经将提交推送到远程仓库，并且需要撤销这些提交，建议使用 git revert 来创建新的提交
# 假设你在 main 分支上有一个错误的提交，想要撤销它
git checkout main
# 获取 main 分支上的提交哈希
git log main --oneline
# 使用 revert 将特定提交应用到 main 分支
git revert commit-hash
# 推送撤销后的更改（如果已经推送过）
# --force-with-lease：在强制推送之前，Git 会检查远程分支的最新状态。如果远程分支自
# 你上次拉取以来没有被其他人更新过，则允许强制推送；否则，推送会被拒绝。
git push origin main --force-with-lease
```

## 6.2 Git配置多用户

参考：https://zhuanlan.zhihu.com/p/379982981
https://www.cnblogs.com/songjilong/p/15293449.html

为了根据项目类型使用不同的用户名和邮箱进行提交，可以通过`Git`的配置文件和条件化配置来实现。

`Git`的配置文件的存放位置在`C:\Users\用户名\.gitconfig`。

* `user`：`Git`的基本配置，包括用户名、邮箱等。
* `includeIf`： `Git`的条件化配置。
* `gitdir`: `Git`的条件化配置中用于指定文件的路径。
* `path`：`Git`的配置文件的路径。

以下是一个示例配置文件，其中包含两个条件化配置，分别用于个人目录和工作目录。

```ini
# .gitconfig 文件
# 全局配置，此配置必须在指定目录配置之前，否则会覆盖指定目录的配置
[user]
	name = global-name
	email = global@163.com

# 个人目录
[includeIf "gitdir:D:/workspce/self/"]
    path = ~/.gitconfig_self

# 工作目录
[includeIf "gitdir:D:/workspce/work/"]
    path = ~/.gitconfig_work
```

```ini
# .gitconfig_self 文件
[user]
	name = self-name
	password = self-password
	email = self@163.com
```

```ini
# .gitconfig_work 文件
[user]
	name = work-name
	password = work-password
	email = work@163.com
```

在配置完成后，我们可以通过以下步骤来检验配置是否生效。

1、在`cmd`命令行中，切换到需要测试的目录。以测试个人目录为例。

```shell
# 如果不在 D 盘，则需要先切换到 D 盘
D:
# 切换到个人目录
cd D:/workspce/self/
```

2、执行`git init`命令，初始化一个空的`Git`仓库。如果不初始化仓库，则无法使用条件化配置。

```shell
git init
# 命令行会提示 Initialized empty Git repository in D:/workspce/self/.git/
```

2、执行`git config --list --show-origin`命令，查看当前目录的配置信息。

可以查看到`.gitconfig_self`文件中配置的`user`信息。如果没有`.gitconfig_self`文件相关的配置信息，则需要检查配置文件的路径是否正确。

3、执行`git config user.name`命令，查看当前用户名。

```shell
git config user.name
# 命令行会返回 self-name，证明配置生效
```

## 6.3 配置Git文件忽略规则

参考：https://github.com/onlynight/ReadmeDemo/tree/master/Readmes/GitIgnore
https://www.jianshu.com/p/a09a9b40ad20

`.gitignore`文件是一个`.git`仓库的配置文件，用于指定哪些文件或目录应该被忽略，不包含在版本控制中。

在`.gitignore`文件中，你可以使用通配符来匹配文件或目录的名称，并指定它们应该被忽略。

`.gitignore`文件要创建在项目的根目录下。

```ini
# 忽略指定文件，比如 package-lock.json 文件
package-lock.json

# 忽略目录
bin/
bin/gen/

# 忽略所有 .log 文件
*.log

# 忽略名称中末尾为 ignore 的文件夹
*ignore/

# 忽略名称中间包含 ignore 的文件夹
*ignore*/
```
