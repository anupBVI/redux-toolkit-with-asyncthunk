import React from "react";
import { useFetchPhotosQuery, useAddPhotoMutation } from "../store";
import Button from "./Button";
import PhotosListItem from "./PhotosListItem";
import Skeletons from "./Skeletons";

const PhotosList = ({ album }) => {
  const { data, isFetching, error } = useFetchPhotosQuery(album);
  const [addPhoto, addPhotoResults] = useAddPhotoMutation();

  const handleAddPhoto = () => {
    addPhoto(album);
  };

  let content;
  if (isFetching) {
    content = <Skeletons className="h-8 w-8" times={4} />;
  } else if (error) {
    content = <div>Error Fetching Photos</div>;
  } else {
    content = data.map((photo) => {
      return <PhotosListItem key={photo.id} photo={photo} />;
    });
  }

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Photos in {album.title}</h3>
        <Button loading={addPhotoResults.isLoading} onClick={handleAddPhoto}>
          {" "}
          + Add Photo
        </Button>
      </div>
      <div className="flex mx-8 flex-row flex-wrap justify-center">{content}</div>
    </div>
  );
};

export default PhotosList;
