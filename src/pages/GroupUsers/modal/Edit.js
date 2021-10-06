import { useState } from "react";
import Modal from "../../../components/Modal";
import Select from "../../../components/Select";
import API from "@aws-amplify/api";
import { updateGroupUsers } from "../../../graphql-custom/group/mutation";
import { useToast } from "../../../components/Toast/ToastProvider";

const AddEdit = ({ editId, users, show, setShow, userRole, selectedGroup }) => {
  const roles = ["ADMIN", "MEMBER", "MODERATOR"];
  const [selectedRole, setSelectedRole] = useState(userRole);
  const { addToast } = useToast();

  const updateRole = async (event) => {
    event.preventDefault(event);
    await API.graphql({
      query: updateGroupUsers,
      variables: {
        input: {
          group_id: selectedGroup,
          user_id: editId,
          role: selectedRole,
        },
      },
    });
    addToast({
      content: `Өөрчлөлтийг хадгаллаа.`,
      title: "Амжилттай",
      autoClose: true,
    });
    setShow(false);
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };
  return (
    <Modal
      onSubmit={updateRole}
      show={show}
      title="Эрх өөрчлөх"
      content="content"
      onClose={() => setShow(false)}
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

export default AddEdit;
