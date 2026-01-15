import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";

function ActivityDetail() {
  const navigate = useNavigate();
  const {id} = useParams();
  const {activity, isLoadingActivity} = useActivities(id)

  if (isLoadingActivity) return <Typography>Loading...</Typography>

  if (!activity) return <Typography>The activity not found.</Typography>

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardMedia
        component="img"
        src={`/images/categoryImages/${activity.category}.jpg`}
      />
      <CardContent>
        <Typography variant="h5">{activity.title}</Typography>
        <Typography variant="subtitle1" fontWeight="light">
          {new Date(activity.date).toISOString().split("T")[0]}{" "}
          {new Date(activity.date).toISOString().split("T")[1].split(".")[0]}
        </Typography>
        <Typography variant="body1">{activity.description}</Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={`/edit-activity/${activity.id}`} color="primary">
          Edit
        </Button>
        <Button color="inherit" onClick={() => navigate('/activities')}>
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}

export default ActivityDetail;
