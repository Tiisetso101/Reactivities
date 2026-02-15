import { useState } from "react";
import type { Activity } from "../../lib/types";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/dashboard/ActivityDashboard";
import { useActivities } from "../../lib/hooks/useActivities";

function App() {

  
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

 const {activities, isPending } = useActivities();

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities!.find(activity => activity.id === id));
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




  return (
    <Box sx={{ backgroundColor:'#eeeeee', minHeight: '100vh' }}>
    <CssBaseline />
    <NavBar  openForm={handleOpenForm} closeForm={handleCloseForm} editMode={false}  />
    <Container maxWidth="xl" sx={{marginTop: 3}}>
      {!activities || isPending ? (<Typography>Loading...</Typography>) :
       <ActivityDashboard 
      activities={activities!} 
      selectActivity={handleSelectActivity}
      cancelSelectActivity={handleCancelSelectActivity}
      selectedActivity={selectedActivity}
      editMode={editMode}
      openform={handleOpenForm}
      closeForm={handleCloseForm}
      />}
      
    </Container>
     
      </Box>
  );
}

export default App
