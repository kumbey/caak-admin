import { useEffect, useState } from "react";
import {
  createGroup,
  deleteGroup,
  updateGroup,
} from "../graphql-custom/group/mutation";

import API from "@aws-amplify/api";
import Auth from "@aws-amplify/auth";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { getGroupList } from "../graphql-custom/group/queries";
import { getCategoryID } from "../graphql-custom/category/queries";

import { convertDateTime } from "../components/utils";
import { useToast } from "../components/Toast/ToastProvider";

import Tables from "../components/Tables";
import Input from "../components/Input";
import Modal from "../components/Modal";
import Button from "../components/Button";
import Select from "../components/Select";
import TextArea from "../components/TextArea";
import DropZone from "../components/Dropzone";
import { ApiFileUpload } from "../utility/ApiHelper";

const Groups = () => {
  const { addToast } = useToast();
  const [isShowModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupAbout, setGroupAbout] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [groups, setGroups] = useState([]);
  const [catID, setCatID] = useState([]);
  const [selectedCatID, setSelectedCatID] = useState("");
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [currentEditingData, setCurrentEditingData] = useState();
  const [inputError, setInputError] = useState(false);
  const [coverImage, setCoverImage] = useState({});
  const [profileImage, setProfileImage] = useState({});

  const toggleModal = () => {
    setShowModal(!isShowModal);
  };
  const editGroupModal = async (item) => {
    setIsShowEdit(true);
    setCurrentEditingData(item);
  };

  const editGroupFunction = async (event) => {
    event.preventDefault();
    try {
      await API.graphql({
        query: updateGroup,
        variables: {
          input: {
            id: currentEditingData.id,
            icon: currentEditingData.icon,
            name: currentEditingData.name,
          },
        },
      }).then(() => {
        addToast({ content: `${currentEditingData.name}`, title: "Амжилттай" });
      });
    } catch (ex) {
      console.log(ex);
    }
  };

  const deleteGroupFunction = async (id) => {
    if (window.confirm("Та устгахдаа итгэлтэй байна уу?"))
      try {
        await API.graphql({
          query: deleteGroup,
          variables: { input: { id: id } },
        }).then(() => {
          addToast({ content: `Устгалаа`, title: "Амжилттай" });
        });
      } catch (ex) {
        console.log(ex);
      }
  };

  const onSubmit = async (event) => {
    event.preventDefault(event);
    if (groupName) {
      setIsLoading(true);
      const currentUser = await Auth.currentAuthenticatedUser();
      const awsUploadedCoverImage = await ApiFileUpload(coverImage.file);
      const awsUploadedProfileImage = await ApiFileUpload(profileImage.file);

      try {
        await API.graphql({
          query: createGroup,
          variables: {
            input: {
              name: groupName,
              category_id: selectedCatID,
              founder_id: currentUser.attributes.sub,
              about: groupAbout,
              groupCoverId: awsUploadedCoverImage.id,
              groupProfileId: awsUploadedProfileImage.id,
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
          setGroupAbout(null);
        });
      } catch (ex) {
        console.log(ex);
      }
    } else {
      setInputError(true);
    }
  };

  useEffect(() => {
    API.graphql(graphqlOperation(getGroupList)).then((group) => {
      setGroups(group.data.listGroups.items);
    });
    API.graphql(graphqlOperation(getCategoryID)).then((cat) => {
      setCatID(cat.data.listCategories.items);
    });
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen font-sans workspace">
      <div className="">
        <div className="mb-4">
          <h1>Группууд</h1>
          <div className="flex mt-4">
            <Button className="bg-primary-400" onClick={() => toggleModal()}>
              Шинэ групп үүсгэх
            </Button>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <Tables styles="striped" fullWidth="w-full">
          {currentEditingData && (
            <Modal
              modalType={"centered"}
              show={isShowEdit}
              title={`Засвар оруулах`}
              onClose={() => setIsShowEdit(false)}
              type="submit"
              onSubmit={editGroupFunction}
              loading={isLoading}
              submitBtnName="Хадгалах"
              content={currentEditingData}
            >
              <div className="mt-8 max-w-md">
                <div className="grid grid-cols-1 gap-6">
                  <Input
                    value={currentEditingData.name || ""}
                    onChange={(e) =>
                      setCurrentEditingData({
                        ...currentEditingData,
                        name: e.target.value,
                      })
                    }
                    title="Групп нэр"
                    error={inputError}
                    errorMessage={`${
                      !currentEditingData ? "Групп нэрийг оруулна уу" : ""
                    }`}
                  />
                  <Select
                    title="Категори сонгох"
                    onChange={(e) => setSelectedCatID(e.target.value)}
                  >
                    <option disabled selected>
                      Сонгох...
                    </option>
                    {catID.map((cat) => {
                      return <option value={cat.id}>{cat.name}</option>;
                    })}
                  </Select>
                  <TextArea
                    name="about"
                    title="Тухай"
                    row="4"
                    onChange={(e) => setGroupAbout(e.target.value)}
                    value={groupAbout}
                  />
                  {/* <Input
                      value={currentEditingData.icon || ""}
                      onChange={(e) =>
                        setCurrentEditingData({
                          ...currentEditingData,
                          icon: e.target.value,
                        })
                      }
                      label="Категори Icon нэр"
                      error={inputError}
                      errorMessage={`${
                        !currentEditingData
                          ? "Категорийн айкон нэрийг оруулна уу"
                          : ""
                      }`}
                    /> */}
                </div>
              </div>
            </Modal>
          )}
          {groups.map((group) => {
            return (
              <tr key={group.id}>
                <td>{group.name}</td>

                <td>{convertDateTime(group.createdAt)}</td>
                <td>{`${
                  group.createdAt !== group.updatedAt
                    ? convertDateTime(group.createdAt)
                    : "Засвар ороогүй"
                }`}</td>
                <td>
                  <span
                    onClick={() => editGroupModal(group)}
                    className={"cursor-pointer"}
                  >
                    <i className="las la-edit text-2xl " />
                  </span>
                  <span
                    onClick={() => deleteGroupFunction(group.id)}
                    className={"cursor-pointer"}
                  >
                    <i className="las la-trash-alt text-2xl ml-4" />
                  </span>
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
                title="Групп нэр"
              />

              <Select
                title="Категори сонгох"
                onChange={(e) => setSelectedCatID(e.target.value)}
              >
                <option hidden>Сонгох...</option>
                {catID.map((cat) => {
                  return (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  );
                })}
              </Select>

              <TextArea
                name="about"
                title="Тухай"
                row="4"
                onChange={(e) => setGroupAbout(e.target.value)}
                value={groupAbout}
              />
              <h4>Cover image upload</h4>
              <DropZone title={"Drop it here"} onUpload={setCoverImage} />
              <h4>Profile image upload</h4>
              <DropZone title={"Drop it here"} onUpload={setProfileImage} />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Groups;
