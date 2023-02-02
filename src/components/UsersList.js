import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import Button from "./Button";
import Skeletons from "./Skeletons";
import { useThunk } from "./../hooks/use-thunk";

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

  if (isLoadingUsers) {
    return (
      <div>
        <Skeletons times={6} className="h-10 w-full" />
      </div>
    );
  }

  if (loadingUsersError) {
    return <div>Error fetching data... </div>;
  }

  const renderedUsers = data.map((user) => {
    return (
      <div key={user.id} className="m-2 rounded border">
        <div className="flex p-2 justify-between items-center cursor-pointer ">
          {user.name}
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="flex flex-row justify-between m-3 ">
        <h1 className="m-2 text-xl">Users</h1>
        {isCreatingUser ? (
          "Creating User"
        ) : (
          <Button onClick={handleUserAdd}> + Add User</Button>
        )}
        {creatingUserError && "Error creating user"}
      </div>
      <h2>{renderedUsers}</h2>
    </div>
  );
};

export default UsersList;
