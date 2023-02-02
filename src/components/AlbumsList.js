import React from "react";
import { useFetchAlbumsQuery , useAddAlbumMutation} from "../store";
import Skeletons from "./Skeletons";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";


const AlbumsList = ({ user }) => {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);
//   useFetchAlbumsQuery(user)
  const [ addAlbum , results] = useAddAlbumMutation();
    console.log(results)
  const handleAddAlbum = () => { 
    addAlbum(user)
   }
  // console.log(results)
  let content;
  if (isLoading) {
    content = <Skeletons times={3} />;
  } else if (error) {
    content = <div>Errpr Loading Data</div>;
  } else {
    content = data.map((album) => {
      const header = <div>{album.title}</div>;
      return (
        <ExpandablePanel key={album.id} header={header}>
          CONTENT!!!
        </ExpandablePanel>
      );
    });
  }
  return (
    <div>
      <div>Albums for {user.name}
      <Button onClick={handleAddAlbum}>
        + Add Album
      </Button>
      </div>
      <div>{content}</div>
    </div>
  );
};

export default AlbumsList;
