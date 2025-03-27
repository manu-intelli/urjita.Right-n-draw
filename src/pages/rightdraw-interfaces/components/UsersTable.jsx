import React from "react";
import { authAPI } from "../../../services/api/endpoints";
import Modal from "../../../components/common/Modal";
import { USER_COLS } from "../../../constants";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import { Trash2, Pencil, Check, X } from "lucide-react";
import { Input } from "../../../components/common/ReusableComponents";
import { Tooltip } from "@mui/material";

const DeleteUser = ({ setActiveModal, isEditFlow }) => {
  const [usersList, setUsersList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [editActiveUser, setEditActiveUser] = React.useState({
    id: "",
  });

  const getUsers = async () => {
    const data = await authAPI.getUsersData();
    setUsersList(data);
    setIsLoading(false);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setEditActiveUser({
      ...editActiveUser,
      [name]: value,
    });
  };

  const handleDeleteUser = async (id) => {
    const res = await authAPI.deleteUser(id);

    if (res.status === 200) {
      getUsers();
    }
  };

  const handleEditUser = async () => {
    const { id, ...rest } = editActiveUser;
    const res = await authAPI.updateUser(id, { ...rest });

    if (res.status === 200) {
      setEditActiveUser({
        id: "",
      });
      getUsers();
    }
  };

  React.useEffect(() => {
    getUsers();
  }, []);
  
  return (
    <Modal
      isOpen
      onClose={() => setActiveModal(null)}
      title={isEditFlow ? 'Modify User' : "Remove User"}
      styleClass="max-w-[80vw]  max-h-[80vh]"
    >
      <div className="flex-1 overflow-hidden bg-white">
        <div className="overflow-y-auto max-h-[60vh]">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <table className="min-w-full divide-y divide-neutral-700">
              <thead className="bg-white sticky top-0 z-10">
                <tr>
                  {USER_COLS.map((itr) => (
                    <th
                      key={itr.key}
                      className="px-6 py-3 text-left text-sm font-medium text-black uppercase tracking-wider"
                    >
                      {itr.label}
                    </th>
                  ))}
                  <th className="px-6 py-3 text-left text-sm font-medium text-black uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-700">
                {usersList.map((user, index) => (
                  <tr
                    key={user.id}
                    className="hover:bg-neutral-700/50 transition-colors"
                  >
                    <td className="px-6 py-3 text-sm text-black whitespace-nowrap">
                      {index + 1}
                    </td>
                    {USER_COLS.slice(1).map((col) => (
                      <td
                        key={col.key}
                        className="px-6 py-3 text-sm text-black whitespace-nowrap"
                      >
                        {editActiveUser.id === user.id ? (
                          col.key === "full_name" ? (
                            <input
                              name={col.key}
                              className="px-3 py-2 border rounded-md focus:outline-none"
                              onChange={handleChange}
                            />
                          ) : (
                            user?.[col.key] || "-"
                          )
                        ) : col.key === "role" ? (
                          <Tooltip
                            title={
                              <ul>
                                {user?.[col.key].map((role, index) => (
                                  <li key={index}>* {role}</li>
                                ))}
                              </ul>
                            }
                          >
                            {user?.[col.key].join(",")}
                          </Tooltip>
                        ) : (
                          user?.[col.key] || "-"
                        )}
                      </td>
                    ))}
                    <td>
                      {isEditFlow ? (
                        editActiveUser.id === user.id ? (
                          <div className="flex space-x-3">
                            <button
                              className="bg-transparent"
                              onClick={handleEditUser}
                            >
                              <Check color="green" />
                            </button>
                            <button
                              className="bg-transparent"
                              onClick={() =>
                                setEditActiveUser({
                                  id: "",
                                })
                              }
                            >
                              <X color="red" />
                            </button>
                          </div>
                        ) : (
                          <button
                            className="bg-transparent"
                            onClick={() =>
                              setEditActiveUser({
                                id: user.id,
                              })
                            }
                          >
                            <Pencil />
                          </button>
                        )
                      ) : (
                        <button
                          className="bg-transparent"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default DeleteUser;
