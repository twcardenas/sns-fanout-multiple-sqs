# SNS fan Out to SQSs

## Overview
This repo is a simple proof-of-concept for how to use SNS FIFO to fan out messages to multiple independent queues that implements a number of filters. This is so each queue only get's the messages it specifically cares about.

## How to Run
Fork this repo.
Add Secrets to your repo based on the names in the .github/workflows files
Deploy the Code

It will output an API Gateway endpoint which you will send a POST message with the following body
```
{
    "id": "<UNIQUE_IDENTIFIER>",
    "color": "<COLOR>"
}
```

UNIQUE_IDENTIFIER needs to be unique per request
COLOR can be blue|green|yellow