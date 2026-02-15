import { Box } from '@mui/material'
import type { Activity } from '../../lib/types';
import ActivityCard from './ActivityCard';

type Props = {
    activities: Activity[];
    selectActivity: (id: string) => void;
}

export default function ActivityList({ activities, selectActivity }: Props) {
  // Debug logs should be outside of JSX
   console.log(import.meta.env.VITE_API_URL);
  console.log('activities:', activities);
  console.log('isArray:', Array.isArray(activities));
 

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {activities.map(activity => (
        <ActivityCard
          key={activity.id}
          activity={activity}
          selectActivity={selectActivity}
        />
      ))}
    </Box>
  )
}
