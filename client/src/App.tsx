import { useEffect, useState } from "react";

function App() {

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/activities')
      .then(response => response.json())
      .then(data => setActivities(data))
      .catch(error => console.error('Error fetching activities:', error));
  }, []);

  return (
    <div>
     <h3>Reactivities</h3>
     <ul>{activities.map((activity))}
        <li key={activity.id}>{activity.title}</li>
     </ul>
    </div>
  )
}

export default App
