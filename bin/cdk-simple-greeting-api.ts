#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkSimpleGreetingApiStack } from '../lib/cdk-simple-greeting-api-stack';

const app = new cdk.App();
new CdkSimpleGreetingApiStack(app, 'CdkSimpleGreetingApiStack');
