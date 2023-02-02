import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import Button from "./Button";
import Skeletons from "./Skeletons";
import { useThunk } from "./../hooks/use-thunk";
import UsersListItem from "./UsersListItem";

const UsersList = () => {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);

  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

  const stateData = useSelector((state) => {
    return state;
  });
  const { data } = stateData.users;
  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  const handleUserAdd = () => {
    doCreateUser();
  };

  let content;
  if (isLoadingUsers) {
    content = <Skeletons times={6} className="h-10 w-full" />;
  } else if (loadingUsersError) {
    content = <div>Error fetching data... </div>;
  } else {
    content = data.map((user) => {
      return <UsersListItem key={user.id} user={user} />;
    });
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3 ">
        <h1 className="m-2 text-xl">Users</h1>

        <Button loading={isCreatingUser} onClick={handleUserAdd}>
          {" "}
          + Add User
        </Button>

        {creatingUserError && "Error creating user"}
      </div>
      <h2>{content}</h2>
    </div>
  );
};

export default UsersList;
