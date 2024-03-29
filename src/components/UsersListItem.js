import React from "react";
import { GoTrashcan } from "react-icons/go";
import { removeUser } from "../store";
import Button from "./Button";
import { useThunk } from "./../hooks/use-thunk";
import ExpandablePanel from "./ExpandablePanel";
import AlbumsList from "./AlbumsList";


const UsersListItem = ({ user }) => {
  const [doRemoveUser, isLoading, error] = useThunk(removeUser);
  const handleClick = () => {
    doRemoveUser(user);
  };

  const header = (
    <>
      <Button className="mr-3" loading={isLoading} onClick={handleClick}>
        <GoTrashcan />
      </Button>
      {error && <div>Error Deleting user</div>}
      {user.name}
    </>
  );
  return <ExpandablePanel header={header } >
    <AlbumsList user={user}/>
  </ExpandablePanel>;
};

export default UsersListItem;
