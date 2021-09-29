const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();


async function getUsername(user_id){
  try {
    const params = {
      TableName: process.env.API_CAAKMN_USERNAMETABLE_NAME,
    }

    params.IndexName = 'byUser',
    params.KeyConditionExpression = '#name = :value',
    params.ExpressionAttributeValues = { ':value':  user_id}
    params.ExpressionAttributeNames = { '#name': 'user_id' }

    const result = await docClient.query(params).promise()

    if(result.statusCode){
        throw result
    }

    return result
  } catch (err) {
    console.log("ERROR from getUsername")
    throw err
  }
}

async function createUsername(data){
  try {
    
    const params = {
      TableName: process.env.API_CAAKMN_USERNAMETABLE_NAME,
      Item: data
    }
    
    const result = await docClient.put(params).promise()
    return result
    
  } catch (err) {
    throw err
  }
}


module.exports = {
    getUsername: getUsername,
    createUsername: createUsername
}
