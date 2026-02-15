import Grid from '@mui/material/Grid';
import type { Activity } from '../../lib/types';
import ActivityList from './ActivityList';
import ActivityDetails from '../activities/Details/ActivityDetails';
import ActivityForm from '../activities/forms/ActivityForm';

type Props = {
  activities: Activity[];
  selectActivity: (id: string) => void;
  cancelSelectActivity?: () => void;
  selectedActivity?: Activity ;
  openform?: (id?: string) => void;
  closeForm?: () => void;
  editMode?: boolean;
};

export default function ActivityDashboard({ activities, selectActivity,
   cancelSelectActivity, selectedActivity, openform, closeForm, editMode }: Props) {
  return (
    <Grid container spacing={3}>
      <Grid size = {7}>
        <ActivityList activities={activities}
        selectActivity={selectActivity}
        />
      </Grid>
      <Grid size={5}>
        {selectedActivity && !editMode && <ActivityDetails 
        activity={selectedActivity} 
        cancelSelectActivity={cancelSelectActivity}        
          openForm={openform}
        />}
        {editMode &&
         <ActivityForm 
         closeForm={closeForm} 
         activity={selectedActivity}
     />}
      </Grid>
    </Grid>
  );
}
