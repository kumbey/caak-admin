import API from "@aws-amplify/api";
import {graphqlOperation} from "@aws-amplify/api-graphql";
import {createFile} from "../graphql-custom/file/mutation";
import Storage from "@aws-amplify/storage"

export const ApiFileUpload = async (file) => {
    try{
        let fileData = {...file}
        const fileObj = fileData.obj
        delete fileData["obj"]
        delete fileData["url"]
        let resp = await API.graphql(graphqlOperation(createFile, {input: fileData}))
        resp = resp.data.createFile
        await Storage.put(resp.id +"."+ resp.ext, fileObj)
        return resp
    }catch(ex){
        console.log("ApiFileUpload: ",ex)
    }
}