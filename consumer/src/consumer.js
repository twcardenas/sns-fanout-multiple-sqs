'use strict';
module.exports.handler = (event, context, callback) => {
  console.log("it was called");

  console.log(event);

  context.done(null, "");
};
