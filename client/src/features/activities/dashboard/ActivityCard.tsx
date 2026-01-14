import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";

type Props = {
  activity: Activity;
  selectActivity: (id: string) => void;
};

function ActivityCard({ activity, selectActivity }: Props) {
  const { deleteActivity } = useActivities();

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5">{activity.title}</Typography>
        <Typography sx={{ color: "text.secondary", mb: 1 }}>
          {new Date(activity.date).toISOString().split("T")[0]}{" "}
          {new Date(activity.date).toISOString().split("T")[1].split(".")[0]}
        </Typography>
        <Typography variant="body2">{activity.description}</Typography>
        <Typography variant="subtitle1">
          {activity.city} / {activity.venue}
        </Typography>
      </CardContent>
      <CardActions
        sx={{ display: "flex", justifyContent: "space-between", pb: 2 }}
      >
        <Chip label={activity.category} variant="outlined" />
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            size="medium"
            variant="contained"
            color="error"
            disabled={deleteActivity.isPending}
            onClick={() => deleteActivity.mutate(activity.id)}
          >
            Delete
          </Button>
          <Button
            size="medium"
            variant="contained"
            onClick={() => selectActivity(activity.id)}
          >
            View
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}

export default ActivityCard;
