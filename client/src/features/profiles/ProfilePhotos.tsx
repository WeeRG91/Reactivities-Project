import { useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useProfile";
import {
  Box,
  Button,
  Divider,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import PhotoUploadWidget from "../../app/shared/components/PhotoUploadWidget";
import StarButton from "../../app/shared/components/StarButton";
import DeleteButton from "../../app/shared/components/DeleteButton";

function ProfilePhotos() {
  const { id } = useParams();
  const {
    photos,
    loadingPhotos,
    isCurrentUser,
    uploadPhoto,
    profile,
    setMainPhoto,
    deletePhoto,
  } = useProfile(id);
  const [editMode, setEditMode] = useState(false);

  const handlePhotoUpload = (file: Blob) => {
    uploadPhoto.mutate(file, {
      onSuccess: () => {
        setEditMode(false);
      },
    });
  };

  if (loadingPhotos) return <Typography>Loading photos...</Typography>;

  if (!photos) return <Typography>No photos added yet</Typography>;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5">Photos</Typography>
        {isCurrentUser && (
          <Button onClick={() => setEditMode(!editMode)}>
            {editMode ? "Cancel" : "Add photo"}
          </Button>
        )}
      </Box>
      <Divider sx={{ my: 2 }} />

      {editMode ? (
        <PhotoUploadWidget
          uploadPhoto={handlePhotoUpload}
          loading={uploadPhoto.isPending}
        />
      ) : (
        <>
          {photos?.length === 0 ? (
            <Typography>No photos added yet</Typography>
          ) : (
            <ImageList sx={{ height: 450 }} cols={6} rowHeight={164}>
              {photos.map((photo) => (
                <ImageListItem key={photo.id}>
                  <img
                    srcSet={`${photo.url.replace("/upload/", "/upload/w_164,h_164,c_fill,f_auto,dpr_2,g_face/")}`}
                    src={`${photo.url.replace("/upload/", "/upload/w_164,h_164,c_crop,f_auto,g_face/")}`}
                    alt={photo.id + "profile photo"}
                    loading="lazy"
                  />
                  {isCurrentUser && (
                    <div>
                      <Box
                        sx={{ position: "absolute", top: 10, left: -10 }}
                        onClick={() => setMainPhoto.mutate(photo)}
                      >
                        <StarButton
                          selected={photo.url === profile?.imageUrl}
                        />
                      </Box>
                      {profile?.imageUrl !== photo.url && (
                        <Box
                          sx={{ position: "absolute", top: 10, right: -10 }}
                          onClick={() => deletePhoto.mutate(photo.id)}
                        >
                          <DeleteButton />
                        </Box>
                      )}
                    </div>
                  )}
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </>
      )}
    </Box>
  );
}

export default ProfilePhotos;
