"use strict";
const AWS = require("aws-sdk"); // eslint-disable-line import/no-extraneous-dependencies
const sns = new AWS.SNS();

module.exports.handler = (event, context, callback) => {
  const data = JSON.parse(event.body);
  const params = {
    Message: JSON.stringify({
      default: "default",
      body: JSON.stringify(data),
    }),
    TopicArn: `arn:aws:sns:us-east-1:${process.env.ACCOUNT_ID}:sharedsns.fifo`,
    MessageStructure: "json",
    MessageGroupId: data.id, // Required for FIFO topics
    MessageDeduplicationId: data.id, // Required
    MessageAttributes: {
      color: {
        DataType: "String",
        StringValue: data.color,
      },
    },
  };
  sns.publish(params, (error) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: 501,
        headers: { "Content-Type": "text/plain" },
        body: "Couldn't add the message due an internal error. Please try again later.",
      });
    }
    // create a resonse
    const response = {
      statusCode: 200,
      body: JSON.stringify({ message: "Successfully added the message." }),
    };
    callback(null, response);
  });
};
