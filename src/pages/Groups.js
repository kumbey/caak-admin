import { useEffect, useState } from "react";
import {
  createGroup,
  deleteGroup,
  updateGroup,
} from "../graphql-custom/group/mutation";

import { deleteFile } from "../graphql-custom/file/mutation";

import API from "@aws-amplify/api";
import Auth from "@aws-amplify/auth";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { getGroupList } from "../graphql-custom/group/queries";
import { getCategoryList } from "../graphql-custom/category/queries";

import { convertDateTime } from "../components/utils";
import { useToast } from "../components/Toast/ToastProvider";

import Tables from "../components/Tables";
import Input from "../components/Input";
import Modal from "../components/Modal";
import Button from "../components/Button";
import Select from "../components/Select";
import TextArea from "../components/TextArea";
import DropZone from "../components/Dropzone";
import ConfirmAlert from "../components/ConfirmAlert/ConfirmAlert";
import { ApiFileUpload } from "../utility/ApiHelper";

import { generateFileUrl } from "../utility/Util";

const Groups = () => {
  const { addToast } = useToast();
  const [isShowModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupAbout, setGroupAbout] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [groups, setGroups] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCatID, setSelectedCatID] = useState("");
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [currentEditingData, setCurrentEditingData] = useState();
  const [inputError, setInputError] = useState(false);
  const [coverImage, setCoverImage] = useState({});
  const [profileImage, setProfileImage] = useState({});
  const [isShowConfirmAlert, setIsShowConfirmAlert] = useState(false);
  const [deleteItem, setDeleteItem] = useState();

  const toggleModal = () => {
    setShowModal(!isShowModal);
  };
  const deleteAlertModal = (item) => {
    setIsShowConfirmAlert(true);
    setDeleteItem(item);
  };
  const editGroupModal = async (item) => {
    setIsShowEdit(true);

    setCurrentEditingData({
      ...item,
      cover: {
        ...item.cover,
        url: generateFileUrl(item.cover),
      },
      profile: {
        ...item.profile,
        url: generateFileUrl(item.profile),
      },
    });
  };

  const editGroupFunction = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const newCoverImage = await ApiFileUpload(coverImage.file);
      const newProfileImage = await ApiFileUpload(profileImage.file);

      await API.graphql({
        query: updateGroup,
        variables: {
          input: {
            id: currentEditingData.id,
            category_id: currentEditingData.category_id,
            name: currentEditingData.name,
            founder_id: currentEditingData.founder_id,
            about: currentEditingData.about,
            rating: currentEditingData.rating,
            ...(newCoverImage ?? { groupCoverId: newCoverImage.id }),
            ...(newProfileImage ?? { groupProfileId: newProfileImage.id }),
          },
        },
      });
      await API.graphql({
        query: deleteFile,

        variables: {
          input: {
            id: currentEditingData.cover.id,
          },
        },
      });
    } catch (ex) {
      console.log(ex);
    }
    addToast({
      content: `${currentEditingData.name} -?? ???????????????? ????????????????`,
      autoClose: true,
      type: "update",
      title: "??????????????????",
    });
    setIsShowEdit(false);
    setCurrentEditingData(null);
    setIsLoading(false);
  };

  const deleteGroupFunction = async (id) => {
    // if (window.confirm("???? ?????????????????? ???????????????? ?????????? ?????"))
    try {
      await API.graphql({
        query: deleteGroup,
        variables: { input: { id: id } },
      }).then(() => {
        const filteredGroup = groups.filter((group) => group.id !== id);
        setGroups(filteredGroup);
        addToast({
          content: `????????????????`,
          title: "??????????????????",
          type: "delete",
          autoClose: true,
        });
      });
    } catch (ex) {
      console.log(ex);
    }
    setIsShowConfirmAlert(false);
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
            content: `${result.data.createGroup.name} ?????????????????? ????????????`,
            title: "??????????????????",
            type: "update",
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
    API.graphql(graphqlOperation(getCategoryList)).then((category) => {
      setCategories(category.data.listCategories.items);
    });
  }, []);
  return (
    <div className="flex flex-col w-screen h-screen font-sans workspace">
      <div className="">
        <div className="mb-4">
          <h1>????????????????</h1>
          <div className="flex mt-4">
            <Button className="bg-primary-400" onClick={() => toggleModal()}>
              ???????? ?????????? ????????????
            </Button>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <ConfirmAlert
          show={isShowConfirmAlert}
          title="???? ?????????????????? ???????????????? ?????????? ?????"
          onClose={() => setIsShowConfirmAlert(false)}
          onSubmit={() => deleteGroupFunction(deleteItem)}
        />
        {currentEditingData && (
          <Modal
            className={"w-96"}
            show={isShowEdit}
            title={`???????????? ??????????????`}
            onClose={() => setIsShowEdit(false)}
            type="submit"
            onSubmit={editGroupFunction}
            loading={isLoading}
            submitBtnName="????????????????"
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
                  label="?????????? ??????"
                  error={inputError}
                  errorMessage={`${
                    !currentEditingData ? "?????????? ???????????? ?????????????? ????" : ""
                  }`}
                />
                <Select
                  title="???????????????? ????????????"
                  onChange={(e) =>
                    setCurrentEditingData({
                      ...currentEditingData,
                      category_id: e.target.value,
                    })
                  }
                  value={currentEditingData.category.id}
                >
                  <option disabled hidden>
                    ????????????
                  </option>
                  {categories.map((cat, index) => {
                    return (
                      <option key={index} value={cat.id}>
                        {cat.name}
                      </option>
                    );
                  })}
                </Select>
                <TextArea
                  name="about"
                  title="??????????"
                  row="4"
                  value={currentEditingData.about || ""}
                  onChange={(e) =>
                    setCurrentEditingData({
                      ...currentEditingData,
                      about: e.target.value,
                    })
                  }
                />

                <h4>Cover image upload</h4>
                <DropZone
                  title={"Drop it here"}
                  previewImage={currentEditingData.cover.url}
                  onUpload={setCoverImage}
                />
                <h4>Profile image upload</h4>
                <DropZone
                  title={"Drop it here"}
                  previewImage={currentEditingData.profile.url}
                  onUpload={setProfileImage}
                />
              </div>
            </div>
          </Modal>
        )}
        <Tables styles="hoverable table_bordered" fullWidth="w-full">
          <thead>
            <tr>
              <th className="text-left uppercase">??????</th>
              <th className="text-left uppercase">???????????????? ??????</th>
              <th className="text-left uppercase">???????????? ??????????</th>
              <th className="text-left uppercase">???????????? ??????????</th>
              <th className="text-left uppercase">??????????</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group, index) => {
              return (
                <tr key={index}>
                  <td>{group.name}</td>
                  <td>{group.category.name}</td>

                  <td>{convertDateTime(group.createdAt)}</td>
                  <td>{`${
                    group.createdAt !== group.updatedAt
                      ? convertDateTime(group.createdAt)
                      : "???????????? ??????????????"
                  }`}</td>
                  <td>
                    <span
                      onClick={() => editGroupModal(group)}
                      className={"cursor-pointer"}
                    >
                      <i className="las la-edit text-2xl " />
                    </span>
                    <span
                      onClick={() => deleteAlertModal(group.id)}
                      className={"cursor-pointer"}
                    >
                      <i className="las la-trash-alt text-2xl ml-4" />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Tables>
        <Modal
          show={isShowModal}
          title="???????? ?????????? ????????????"
          content="content"
          onClose={() => setShowModal(false)}
          type="submit"
          onSubmit={onSubmit}
          loading={isLoading}
          submitBtnName="???????? ?????????? ??????????"
        >
          <div className="mt-8 max-w-md">
            <div className="grid grid-cols-1 gap-6">
              <Input
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                label="?????????? ??????"
              />

              <Select
                title="???????????????? ????????????"
                onChange={(e) => setSelectedCatID(e.target.value)}
                defaultValue={"DEFAULT"}
              >
                <option value={"DEFAULT"} disabled hidden>
                  ????????????...
                </option>
                {categories.map((cat) => {
                  return (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  );
                })}
              </Select>

              <TextArea
                name="about"
                title="??????????"
                row="4"
                onChange={(e) => setGroupAbout(e.target.value)}
                value={groupAbout || ""}
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
