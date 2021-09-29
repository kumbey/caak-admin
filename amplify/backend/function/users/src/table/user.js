const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

async function getUser(id){

    const params = {
        TableName: process.env.API_CAAKMN_USERTABLE_NAME,
        Key: {
            id: id
        }
    }

    try {
        const result = await docClient.get(params).promise()
        if(result.statusCode){
            throw result
        }
        return result
    } catch (err) {
        throw err
    }
}

async function createUser(data){
    try {

        const params = {
            TableName: process.env.API_CAAKMN_USERTABLE_NAME,
            Item: data
        }

        let result = await docClient.put(params).promise();
        if(result.statusCode){
            throw result
        }
        return result
    } catch (err) {
        throw err;
    }
}


module.exports = {
    getUser: getUser,
    createUser: createUser,
}
