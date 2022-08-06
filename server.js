var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
require('dotenv').config();
var axios = require('axios');

const BASE_URL = 'https://api.apilayer.com/email_verification/';

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const fetchResponseByURL = (args) => {
  if (validateEmail(args.email)) {
    const API_URL = `${BASE_URL}${args.email}`;
    var myHeaders = { headers: { apikey: 'dd6FYmTefFTcw1y1ZMKbxKq8nJAbAIlH' } };
    return axios(API_URL, myHeaders).then(res => {
      return res. data;
    }).catch(e => {
      throw new Error(e);
    });
  } else {
    throw new Error('Invalid Email Address!');
  }
};

var schema = buildSchema(`
  type emailVerificationSchema {
    email: String!
    is_disposable: String!
    user: String!
    domain: String!
    did_you_mean: String
    syntax_valid: String
    is_role_account: String
    is_catch_all: String
    is_deliverable: String
    can_connect_smtp: String
    is_inbox_full: String
    is_disabled: String
    mx_records: String
    free: String
    score: String
  }
  type Query {
    checkEmailValidation(email: String!): emailVerificationSchema
  }
`);

var resolvers = {
  checkEmailValidation: (root, args) => {
    return fetchResponseByURL(root, args);
  },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
}));
app.listen(process.env.PORT || 4000);
console.log(`Running a GraphQL API server at http://localhost:${process.env.PORT || 4000}/graphql`);