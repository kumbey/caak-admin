/* Amplify Params - DO NOT EDIT
	API_CAAKMN_GRAPHQLAPIIDOUTPUT
	API_CAAKMN_USERPOSTTOTALSTABLE_ARN
	API_CAAKMN_USERPOSTTOTALSTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

exports.handler = event => {
  //eslint-disable-line
  console.log(JSON.stringify(event, null, 2));
  event.Records.forEach(record => {
    console.log(record.eventID);
    console.log(record.eventName);
    console.log('DynamoDB Record: %j', record.dynamodb);
  });
  return Promise.resolve('Successfully processed DynamoDB record');
};
