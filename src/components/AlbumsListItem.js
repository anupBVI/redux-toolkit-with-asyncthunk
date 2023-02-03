import React from "react";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import { GoTrashcan } from "react-icons/go";
import { useRemoveAlbumMutation } from "../store";
import PhotosList from './PhotosList';

const AlbumsListItem = ({ album }) => {
  const [removeAlbum, results] = useRemoveAlbumMutation();

  const handleDeleteAlbum = () => {
    removeAlbum(album);
  };
  const header = (
    <>
      <Button loading={results.isLoading} onClick={handleDeleteAlbum}>
        <GoTrashcan />
      </Button>
      {album.title}
    </>
  );
  return (
    <ExpandablePanel key={album.id} header={header}>
     <PhotosList album={album}/>
    </ExpandablePanel>
  );
};

export default AlbumsListItem;
