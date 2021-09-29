const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();


async function createAura(data){
  try {
    
    const params = {
      TableName: process.env.API_CAAKMN_AURATABLE_NAME,
      Item: {
        user_id: data.id,
        point: 0
      },
      ConditionExpression: "attribute_not_exists(user_id)",
      "ReturnValues" : "ALL_OLD"
    }
    
    const result = await docClient.put(params).promise()
    return result
    
  } catch (err) {
    if(err.code !== "ConditionalCheckFailedException"){
        throw err  
    }
  }
}


module.exports = {
    createAura: createAura
}
