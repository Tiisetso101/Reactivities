import { useEffect, useState } from "react";
import type { Activity } from "../../lib/types";
import { Box, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/dashboard/ActivityDashboard";

function App() {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5001/api/activities')
      .then(response => setActivities(response.data))
      .catch(error => console.error('Error fetching activities:', error));
  }, []);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(activity => activity.id === id));
  }

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  }

  const handleOpenForm = (id?: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  const handleCloseForm = () => {
    setEditMode(false);
  }

  const handleSubmitForm = (activity: Activity) => {
    if (activity.id) {
      setActivities(activities.map(a => a.id === activity.id ? activity : a));
    } else {
     const newActivity = {...activity, id: activities.length.toString()};
     setSelectedActivity(newActivity);
      setActivities([...activities, newActivity]);
    }
    setEditMode(false);
  }

  const handleDelete = (id: string) => {
    setActivities(activities.filter(a => a.id !== id));
  }

  return (
    <Box sx={{ backgroundColor:'#eeeeee' }}>
    <CssBaseline />
    <NavBar  openForm={handleOpenForm} closeForm={handleCloseForm} editMode={false}  />
    <Container maxWidth="xl" sx={{marginTop: 3}}>
      <ActivityDashboard 
      activities={activities} 
      selectActivity={handleSelectActivity}
      cancelSelectActivity={handleCancelSelectActivity}
      selectedActivity={selectedActivity}
      editMode={editMode}
      openform={handleOpenForm}
      closeForm={handleCloseForm}
      submitForm={handleSubmitForm} 
      deleteActivity={handleDelete}
      />
    </Container>
     
      </Box>
  );
}

export default App
