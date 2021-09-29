/* Amplify Params - DO NOT EDIT
	API_CAAKMN_AURATABLE_ARN
	API_CAAKMN_AURATABLE_NAME
	API_CAAKMN_FILETABLE_ARN
	API_CAAKMN_FILETABLE_NAME
	API_CAAKMN_FOLLOWEDUSERSTABLE_ARN
	API_CAAKMN_FOLLOWEDUSERSTABLE_NAME
	API_CAAKMN_GRAPHQLAPIENDPOINTOUTPUT
	API_CAAKMN_GRAPHQLAPIIDOUTPUT
	API_CAAKMN_USERNAMETABLE_ARN
	API_CAAKMN_USERNAMETABLE_NAME
	API_CAAKMN_USERTABLE_ARN
	API_CAAKMN_USERTABLE_NAME
	AUTH_CAAKMN248EFAC3_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const AWS = require("aws-sdk")
const { customAlphabet } =  require('nanoid')
const { createAura } = require("./table/aura")

const {getUser, createUser} = require('./table/user')
const {getUsername, createUsername} = require("./table/username")

async function getUserCustom(ctx){
    return {}
}

async function createUserCustom(ctx){
    try{

        const input = ctx.arguments.input
        const now = new Date().toISOString()

        let result = {
            data: null,
            erros: null
        }

        result = await getUsername(input.id)
        
        if(result.Count <= 0){

            const nanoid = customAlphabet(input.id , 8)

            result = await createUsername({
                id: nanoid(),
                user_id: input.id,
                updatedAt: now,
                createdAt: now
            })
            
        }

        result = await createAura({
            id: input.id,
            point: 0
        })
        
        variables = {
            id: input.id,
            is_public: true,
            status: "ACTIVE",
            updatedAt: now,
            createdAt: now
        }
        
        result = await getUser(input.id)
        result = result.Item
        
        variables = {
            ...input,
            ...variables
        }
        
        if(!result || Object.keys(result).length <= 0){
            await createUser(variables)
            // await updateCongitoUser(variables)
            result = await getUser(input.id)
            result = result.Item
        }

        return result
    }catch(ex){
        return ex
    }
}

async function updateCongitoUser(usr){
    try{
        var params = {
            UserAttributes: [
                {
                    Name: "name",
                    Value: usr.firstname
                },
                {
                    Name: "gender",
                    Value: usr.gender
                },
                {
                    Name: "birthdate",
                    Value: usr.birthdate
                },
                {
                    Name: "nickname",
                    Value: usr.nickname
                }
            ],
            UserPoolId: process.env.AUTH_CAAKMN248EFAC3_USERPOOLID,
            Username: usr.id
        };
    
        const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
        const resp = await cognitoIdentityServiceProvider.adminUpdateUserAttributes(params).promise()
        return resp
    }catch(ex){
        throw ex
    }
}

const Resolver = {
    Query: {
        getUserCustom: getUserCustom
    },
    Mutation: {
        createUserCustom: createUserCustom
    }
}


exports.handler = async (event) => {
    try {
        const typeHandler = Resolver[event.typeName]
        if(typeHandler){
            const resolver = typeHandler[event.fieldName]
            if(resolver){
                let result = await resolver(event)
                return result
            }
        }

        throw new Error("Resolver not found")
    } catch (ex) {
        console.log(ex)
        throw new Error("Error on Users lambda function", ex)
    } 
};
