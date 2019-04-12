# Wantedly-Todo-App

## Setup
```
docker-compose up
```
client
http://localhost:3000

server
http://localhost:4000

## Server
Node.js + Prisma でサクッと実装している。
メインがClientなので、かなり簡単に作成している。

## Client
apollo-client, apollo-react-hooksなどを用いて実装。
eslintなどは状況に応じて変えて欲しい。

## Deploy
herokuを使ってあとでDeployする予定。課金しないとMulti Containerをサポートしていないので、2個のApplicationに分けてデプロイすることになりそう。

## Lint
eslintを採用。Airbnbを元に自分で適当にカスタマイズ


