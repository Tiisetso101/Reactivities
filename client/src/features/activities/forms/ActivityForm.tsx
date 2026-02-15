import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import type { Activity } from "../../../lib/types";
import type { FormEvent } from "react";
import { useActivities } from "../../../lib/hooks/useActivities";

type Props = {
    closeForm?: () => void;
    activity?: Activity;
}

 

export default function ActivityForm({ closeForm, activity }: Props) {
const {updateActivity, createActivity} = useActivities();
const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
    // Handle form submission logic here
    event.preventDefault();
  

    const formData = new FormData(event.currentTarget);

    const data : {[key: string]: FormDataEntryValue} = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });
    if(activity){
        data.id = activity.id;
        await  updateActivity.mutateAsync(data as unknown as Activity);
        closeForm!();
    }else{
        await createActivity.mutateAsync(data as unknown as Activity);
        closeForm!();
    }
    
}

  return (
   <Paper>
    <Typography variant="h5" gutterBottom color="primary">
        {activity ? "Edit Activity" : "Create Activity"}
    </Typography>
    <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={3}>
        <TextField name ='title' label="Title" variant="outlined" fullWidth value={activity?.title}/>
        <TextField name="description" label="Description" variant="outlined" fullWidth multiline rows={4} value={activity?.description} />
        <TextField name="category" label="Category" variant="outlined" fullWidth value={activity?.category} />
        <TextField name="date" label="Date" type="date"  value={activity?.date
             ? new Date(activity.date).toISOString().split('T')[0] 
             : new Date().toISOString().split('T')[0]} />
        <TextField name="city" label="City" variant="outlined" fullWidth value={activity?.city} />
        <TextField name="venue" label="Venue" variant="outlined" fullWidth value={activity?.venue} />
        <Box display="flex" justifyContent="flex-end" gap={3}>
            <Button color="inherit" onClick={closeForm}>Cancel</Button>
            <Button variant="contained" 
            color="success" 
            type="submit" 
            disabled={updateActivity.isPending || createActivity.isPending}>Submit</Button>
        </Box>
    </Box>
   
   </Paper>
  )
}
