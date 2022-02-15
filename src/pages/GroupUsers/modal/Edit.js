import { useState, useEffect } from "react";
import Modal from "../../../components/Modal";
import Select from "../../../components/Select";
import API from "@aws-amplify/api";
import { updateGroupUsers } from "../../../graphql-custom/group/mutation";
import { useToast } from "../../../components/Toast/ToastProvider";

const Edit = ({
  editId,
  users,
  show,
  setShow,
  userRole,
  selectedGroup,
  setUsers,
  currentIndex,
}) => {
  const roles = ["ADMIN", "MEMBER", "MODERATOR"];
  const [selectedRole, setSelectedRole] = useState();
  const [isValid, setIsValid] = useState(false);

  const { addToast } = useToast();

  const updateRole = async (event) => {
    event.preventDefault(event);

    const resp = await API.graphql({
      query: updateGroupUsers,
      variables: {
        input: {
          id: `${selectedGroup}#${editId}`,
          // group_id: selectedGroup,
          // user_id: editId,
          role: selectedRole,
        },
      },
    });
    let arr = users;
    arr[currentIndex] = resp.data.updateGroupUsers;
    setUsers(arr);
    addToast({
      content: `${resp.data.updateGroupUsers.user.nickname}-ийн эрхийг ${selectedRole} болголоо.`,
      title: "Амжилттай",
      autoClose: true,
      type: "update",
    });
    close();
  };

  const close = () => {
    setShow(false);
    setSelectedRole(userRole);
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  useEffect(() => {
    setSelectedRole(userRole);
  }, [userRole]);

  useEffect(() => {
    if (selectedRole) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [selectedRole]);

  return (
    <Modal
      onSubmit={updateRole}
      show={show}
      title="Эрх өөрчлөх"
      content="content"
      isValid={isValid}
      onClose={() => close()}
      type="submit"
      //   loading={loading}
      submitBtnName="Эрх өөрчлөх"
    >
      <div className="mt-8 max-w-md">
        <div className="grid grid-cols-1 gap-6">
          <Select
            name={"category"}
            title="Категори сонгох"
            value={selectedRole || "DEFAULT"}
            onChange={handleRoleChange}
          >
            <option value={"DEFAULT"} disabled hidden>
              Сонгох...
            </option>
            {roles.map((role, index) => {
              return (
                <option key={index} value={role}>
                  {role}
                </option>
              );
            })}
          </Select>
        </div>
      </div>
    </Modal>
  );
};

export default Edit;
