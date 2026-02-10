import { Grid, Typography } from "@mui/material";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useProfile";

function ProfilePage() {
  const { id } = useParams();
  const { loadingProfile } = useProfile(id);

  if (loadingProfile) return <Typography>Loading profile...</Typography>

  return (
    <Grid container>
      <Grid size={12}>
        <ProfileHeader />
        <ProfileContent />
      </Grid>
    </Grid>
  );
}

export default ProfilePage;
