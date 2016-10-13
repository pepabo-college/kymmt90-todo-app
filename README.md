# kymmt90-todo-app

タスク管理アプリです。
登録したタスクの状態はtodo, doing, doneの3つから選ぶことができます。
期限を過ぎたタスクについては、Slackに通知がいくようになっています。

## 機能

* 期限切れタスクをSlackに通知
* ダイジェスト認証あり

## 環境変数

* `USER`
  * Digest認証のユーザー名
* `PASS`
  * Digest認証のパスワード
* `SLACK_TOKEN`
  * SlackのAPI Token
* `SLACK_USER_NAME`
  * Slackで通知したいユーザー名
