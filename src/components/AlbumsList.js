import React from "react";
import { useFetchAlbumsQuery, useAddAlbumMutation , useRemoveAlbumMutation} from "../store";
import Skeletons from "./Skeletons";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import AlbumsListItem from "./AlbumsListItem";

const AlbumsList = ({ user }) => {
  const { data, error, isFetching } = useFetchAlbumsQuery(user);
  //   useFetchAlbumsQuery(user)
  const [addAlbum, results] = useAddAlbumMutation();
  const [removeAlbum , removeAlbumResults] = useRemoveAlbumMutation()
  console.log(results);
  const handleAddAlbum = () => {
    addAlbum(user);
  };
  // console.log(results)
  let content;
  if (isFetching) {
    content = <Skeletons className="h-10 w-full" times={3} />;
  } else if (error) {
    content = <div>Error Loading Data</div>;
  } else {
    content = data.map((album) => {
      return <AlbumsListItem key={album.id} album={album}/>
    });
  }
  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between ">
        <h3 className="text-lg font-bold ">Albums for {user.name}</h3>
        <Button loading={results.isLoading} onClick={handleAddAlbum}>+ Add Album</Button>
      </div>
      <div>{content}</div>
    </div>
  );
};

export default AlbumsList;
