import Categories from "./Categories";
import Groups from "./Groups";
import API from "@aws-amplify/api";
import { createCategory } from "../graphql-custom/category/mutation";
// import { graphqlOperation } from "@aws-amplify/api-graphql";
// import { getCategoryList } from "../graphql-custom/category/queries";
import { Auth } from "aws-amplify";
import { useTheme } from "../context/ThemeContext";
import { useEffect } from "react";

const Home = () => {
  const createNewCategory = async (data) => {
    return API.graphql({
      query: createCategory,
      variables: { input: data },
    });
  };
  // const getAllCategories = async () => {
  //   return API.graphql(graphqlOperation(getCategoryList));
  // };

  const isUserAuth = () => {
    return Auth.currentAuthenticatedUser();
  };

  useEffect(() => {
    // isUserAuth()
    //   .then((r) => console.log(r))
    //   .catch((e) => console.log(e));
    // getAllCategories()
    //   .then((r) => console.log(r))
    //   .catch((e) => {
    //     console.log(e);
    //   });
    const data = { name: "Batiin bataa", icon: "fa-fak" };
    createNewCategory(data)
      .then((r) => console.log(r))
      .catch((e) => console.log(e));
  }, []);
  const { backdrop } = useTheme();
  return (
    <div className={`${backdrop && "overlay active"}`}>
      <Categories />
      <Groups />
    </div>
  );
};

export default Home;
