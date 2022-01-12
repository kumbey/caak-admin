import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { createFile } from "../graphql-custom/file/mutation";
import Storage from "@aws-amplify/storage";
import { getReturnData } from "./Util";
import { getPostView } from "../graphql-custom/post/queries";
import { updatePost } from "../graphql-custom/post/mutation";
// import { getPost } from "../../graphql-custom/post/queries";

export const ApiFileUpload = async (file) => {
  try {
    let fileData = { ...file };
    const fileObj = fileData.obj;
    delete fileData["obj"];
    delete fileData["url"];
    let resp = await API.graphql(
      graphqlOperation(createFile, { input: fileData })
    );
    resp = resp.data.createFile;
    const options = {
      ACL: "public-read",
    };
    await Storage.put(resp.id + "." + resp.ext, fileObj, options);
    return resp;
  } catch (ex) {
    console.log("ApiFileUpload: ", ex);
  }
};

export const updateStatus = async (oldPost, userId, status) => {
  try {
    let { ...post } = { ...oldPost };

    let currentPost = getReturnData(
      await API.graphql(graphqlOperation(getPostView, { id: post.id })),
      false
    );

    if (currentPost.version === post.version) {
      //UPDATE POST
      post = getReturnData(
        await API.graphql(
          graphqlOperation(updatePost, {
            input: {
              id: post.id,
              expectedVersion: post.version,
              status: status,
            },
          })
        )
      );
      return post;
    } else {
      if (currentPost.status !== post.status) {
        post = getReturnData(
          await API.graphql(
            graphqlOperation(updatePost, {
              input: {
                id: post.id,
                expectedVersion: currentPost.version,
                status: status,
              },
            })
          )
        );
        return post;
      }
      return { __type: "Already confirmed" };
    }
  } catch (ex) {
    throw ex;
  }
};
