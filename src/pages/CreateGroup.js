import { useState, useEffect } from "react";
import Tables from "../components/Tables";
import Input from "../components/Input";
import Modal from "../components/Modal";
import Button from "../components/Button";
import { getGroupList } from "../graphql-custom/group/queries";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import API from "@aws-amplify/api";
import ConvertDateTime from "../components/ConvertDateTime";

const CreateGroup = () => {
  const [isShowModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [iconName, setIconName] = useState("");

  const toggleModal = () => {
    setShowModal(!isShowModal);
  };

  const onSubmit = (event) => {
    event.preventDefault(event);
    console.log(groupName);
    console.log(iconName);
  };

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    API.graphql(graphqlOperation(getGroupList)).then((group) => {
      setGroups(group.data.listGroups.items);
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

                  <td>
                    <ConvertDateTime date={group.createdAt} />
                  </td>
                  <td>{`${
                    group.createdAt !== group.updatedAt ? (
                      <ConvertDateTime date={group.createdAt} />
                    ) : (
                      "Засвар ороогүй"
                    )
                  }`}</td>
                  <td>
                    <a href="#edit">
                      <i className="las la-edit text-2xl "></i>
                    </a>
                    <a href="#del">
                      <i className="las la-trash-alt text-2xl ml-4"></i>
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
            submitBtnName="Шинэ групп нэмэх"
          >
            <div className="mt-8 max-w-md">
              <div className="grid grid-cols-1 gap-6">
                <Input
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  label="групп нэр"
                />
                <Input
                  value={iconName}
                  onChange={(e) => setIconName(e.target.value)}
                  label="Icon нэр"
                />
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
