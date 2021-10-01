import {useEffect, useState} from "react";
import Tables from "../components/Tables";
import Input from "../components/Input";
import Modal from "../components/Modal";
import Button from "../components/Button";
import {getGroupList} from "../graphql-custom/group/queries";
import {graphqlOperation} from "@aws-amplify/api-graphql";
import {getCategoryID} from "../graphql-custom/category/queries";
import API from "@aws-amplify/api";
import {convertDateTime} from "../components/utils";
import {useToast} from "../components/Toast/ToastProvider";
import Select from "../components/Select";
import TextArea from "../components/TextArea";
import Dropzone from "../components/Dropzone";
import Auth from "@aws-amplify/auth";
import {ApiFileUpload} from "../utility/ApiHelper";
import {createGroup} from "../graphql-custom/group/mutation";

const Groups = () => {
  const [isShowModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupAbout, setGroupAbout] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {addToast} = useToast();
  const [groups, setGroups] = useState([]);
  const [catID, setCatID] = useState([]);
  const [selectedCatID, setSelectedCatID] = useState("");
  const [coverImage, setCoverImage] = useState();
  const [profileImage, setProfileImage] = useState();

  const toggleModal = () => {
    setShowModal(!isShowModal);
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
                          <i className="text-2xl las la-edit"/>
                        </a>
                        <a href="#del">
                          <i className="ml-4 text-2xl las la-trash-alt"/>
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
                      title="Групп нэр"
                  />
                  {/* <Input
                  value={groupIconName}
                  onChange={(e) => setGroupIconName(e.target.value)}
                  label="Icon нэр"
                /> */}

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
                  <Dropzone title={"Drop it here"} onUpload={setCoverImage}/>
                  <h4>Profile image upload</h4>
                  <Dropzone title={"Drop it here"} onUpload={setProfileImage}/>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
  );
};

export default Groups;
