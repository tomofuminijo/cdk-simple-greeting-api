# CDK を利用したシンプルなAPI の作成

このサンプルは、API Gateway/Lambda/DynamoDB を利用したシンプルなAPI をCDK を利用して構築するサンプルです。

# Cloud9 の起動

環境はCloud9 を利用します。任意のリージョンでCloud9 を起動してください。  
Cloud9 は、デフォルトでCDK 実行環境が整っていますので、すぐにCDK を試すことができます。


# 実行手順

Cloud9 のターミナルで作業します。  

まず、始めてCDK を利用するアカウントおよびリージョンの場合は、以下のコマンドを実行してください。このコマンドは1度のみの実行で良いです。（アカウント・リージョンごとに1度）
CDK によりデプロイする際に利用されるS3 バケットが作成されます。

```
cdk bootstrap
```

次に、以下のコマンドを実行して、CDK によりデプロイします。

```
git clone https://github.com/tomofuminijo/cdk-simple-greeting-api.git
cd cdk-simple-greeting-api
npm install
cdk deploy
```

以下のプロンプトがヒョ持されますので、`y` を入力します。

```
Do you wish to deploy these changes (y/n)? 
```

暫く経つと、以下のような内容が出力されます。

```
Outputs:
CdkSimpleGreetingApiStack.CDKSimpleGreetingAPIEndpoint3DBC0DEF = https://xxxxxxxx.execute-api.ap-southeast-1.amazonaws.com/prod/
```

このAPI エンドポイントURL( https://xxxxxxxx.execute-api.ap-southeast-1.amazonaws.com/prod/ ) をコピーしておいてください。

# 動作確認

まず、Put によりデータを格納します。  
以下のコマンドを実行します。URL 部分には先程コピーしたAPI エンドポイントを指定してください。

```
curl -X PUT --data '{"hello":"こんにちは", "langname":"Japanese"}' https://xxxxxxxx.execute-api.ap-southeast-1.amazonaws.com/prod/hello/ja
```

以下のように出力されれば正常に動作しています。

```
{"result":"ok"}
```

次に、Get でデータを取得します。

```
curl -X GET https://xxxxxxxx.execute-api.ap-southeast-1.amazonaws.com/prod/hello/ja
```

以下のように出力されれば正常に動作しています。

```
{"hello":"こんにちは","langname":"Japanese","lang":"ja"}
```


# 終了処理

以下のコマンドを実行することで、CFn スタックが削除されます。

```
cdk destroy
```

