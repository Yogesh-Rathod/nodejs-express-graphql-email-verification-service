# NodeJS Express GraphQL Email Verification API

A simple nodejs express graphql server to verify Email using https://apilayer.com/ Email Verification service.

This service can be used to block Disposable Email Addresses in your website's forms

## Installation & How to Run

  $ git clone https://github.com/Yogesh-Rathod/nodejs-express-graphql-email-verification-service.git
  
$ cd nodejs-express-graphql-email-verification-service

$ npm install

create .env file at the root and put below ENV variables

NODE_ENV='local'\
PORT=4100\
API_BASE_URL = 'https://api.apilayer.com/email_verification/' \
API_SECRET_KEY = 'dd6FYmTefFTcw1y1ZMKbxKq8nJAbAIlH' 


API_SECRET_KEY will be deleted soon

## Running the project

$ npm run dev\
then visit http://localhost:4100/graphql

## Simple build for production

$ npm run build
