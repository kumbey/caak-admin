import { useEffect, useState } from "react";
import Tables from "../components/Tables";
import Input from "../components/Input";
import Modal from "../components/Modal";
import Button from "../components/Button";
import { getGroupList } from "../graphql-custom/group/queries";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { createGroup } from "../graphql-custom/group/mutation";
import { getCategoryID } from "../graphql-custom/category/queries";
import API from "@aws-amplify/api";
import { convertDateTime } from "../components/utils";
import { useToast } from "../components/Toast/ToastProvider";
import Select from "../components/Select";

const Groups = () => {
  const [isShowModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupIconName, setGroupIconName] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [founderID, setFounderID] = useState("f_id123");
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const toggleModal = () => {
    setShowModal(!isShowModal);
  };

  const onSubmit = async (event) => {
    event.preventDefault(event);
    if (groupName) {
      setIsLoading(true);
      try {
        await API.graphql({
          query: createGroup,
          variables: {
            input: {
              name: groupName,
              category_id: categoryID,
              founder_id: founderID,
            },
          },
        }).then((result) => {
          addToast({
            content: `${result.data.createGroup.name} амжилттай үүслээ`,
            title: "Амжилттай",
            autoClose: true,
          });
          setIsLoading(false);
          setGroupName(null);
          setGroupIconName(null);
          console.log(
            `Successfully added ${result.data.createGroup.name} to groups`
          );
        });
      } catch (ex) {
        console.log(ex);
      }
    } else {
      alert("Аль нэг талбар хоосон байна");
    }
  };

  const [groups, setGroups] = useState([]);
  const [catID, setCatID] = useState([]);

  useEffect(() => {
    API.graphql(graphqlOperation(getGroupList)).then((group) => {
      setGroups(group.data.listGroups.items);
    });
    API.graphql(graphqlOperation(getCategoryID)).then((cat) => {
      setCatID(cat.data.listCategories.items);
      console.log("22222222222", cat.data.listCategories.items);
    });
  }, []);
  console.log("ARrr", groups);
  return (
    <div className="flex-col  h-screen w-screen flex  font-sans ">
      <div className=" p-6 m-4 w-full  lg:max-w-lg md:max-w-2xl">
        <div className="mb-4">
          <h1>Группууд</h1>
          <div className="flex mt-4">
            <Button className="bg-primary-400" onClick={() => toggleModal()}>
              Шинэ групп үүсгэх
            </Button>
          </div>
        </div>
        <div className="mb-4">
          <Tables styles="striped" fullWidth="w-full">
            {groups.map((group) => {
              return (
                <tr key={group.id}>
                  <td>{group.name}</td>
                  <td>{group.icon}</td>

                  <td>{convertDateTime(group.createdAt)}</td>
                  <td>{`${
                    group.createdAt !== group.updatedAt
                      ? convertDateTime(group.createdAt)
                      : "Засвар ороогүй"
                  }`}</td>
                  <td>
                    <a href="#edit">
                      <i className="las la-edit text-2xl " />
                    </a>
                    <a href="#del">
                      <i className="las la-trash-alt text-2xl ml-4" />
                    </a>
                  </td>
                </tr>
              );
            })}
          </Tables>
          <Modal
            show={isShowModal}
            title="Шинэ групп үүсгэх"
            content="content"
            onClose={() => setShowModal(false)}
            type="submit"
            onSubmit={onSubmit}
            loading={isLoading}
            submitBtnName="Шинэ групп нэмэх"
          >
            <div className="mt-8 max-w-md">
              <div className="grid grid-cols-1 gap-6">
                <Input
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  label="групп нэр"
                />
                {/* <Input
                  value={groupIconName}
                  onChange={(e) => setGroupIconName(e.target.value)}
                  label="Icon нэр"
                /> */}

                <Select>
                  {catID.map((cat) => {
                    return <option>{cat.name}</option>;
                  })}
                </Select>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Groups;
