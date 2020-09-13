import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigw from "@aws-cdk/aws-apigateway";
import * as dynamodb from "@aws-cdk/aws-dynamodb";

export class CdkSimpleGreetingApiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, "CDKDemoGreeting", {
      partitionKey: { name: "lang", type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST
      });

    // defines AWS Lambda resources
    const myGreetingDynamoDBGetFunction = new lambda.Function(
      this,
      "MyGreetingDynamoDBGetFunction",
      {
        runtime: lambda.Runtime.NODEJS_12_X,
        code: lambda.Code.fromAsset("MyGreetingDynamoDBGetFunction"),
        handler: "index.handler",
        environment: {
          DDB_TABLE: table.tableName,
        },
      }
    );

    const myGreetingDynamoDBPutFunction = new lambda.Function(
      this,
      "MyGreetingDynamoDBPutFunction",
      {
        runtime: lambda.Runtime.NODEJS_12_X,
        code: lambda.Code.fromAsset("MyGreetingDynamoDBPutFunction"),
        handler: "index.handler",
        environment: {
          DDB_TABLE: table.tableName,
        }
      }
    );

    // grant permissions
    table.grantReadData(myGreetingDynamoDBGetFunction);
    table.grantReadWriteData(myGreetingDynamoDBPutFunction);

    // API Gateway
    const api = new apigw.RestApi(this, "CDKSimpleGreetingAPI", {
      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS,
        allowMethods: apigw.Cors.ALL_METHODS // this is also the default
      }
    })
    const hello = api.root.addResource("hello");
    const lang = hello.addResource("{lang}");
    const getFunctionIntegration = new apigw.LambdaIntegration(myGreetingDynamoDBGetFunction);
    const putFunctionIntegration = new apigw.LambdaIntegration(myGreetingDynamoDBPutFunction);

    lang.addMethod("GET", getFunctionIntegration);
    lang.addMethod("PUT", putFunctionIntegration);
  }
}
