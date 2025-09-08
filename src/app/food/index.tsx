"use client"; // client component so we can use hooks

/**
 * import react
 */


/**
 * import mui
 */
import { Egg } from "@mui/icons-material";
import { Autocomplete, BottomNavigation, BottomNavigationAction, Box, Button, Divider, Grid, List, ListItem, ListItemText, Paper, TextField, Typography } from "../mui";
import { useState, useEffect } from "react";

export default function Food() {
  const sessions = [
    'Morning', 'Afternoon', 'Evening', 'Night'
  ]

  /**
   * gpt
   */
  const [session, setSession] = useState<string | null>(null);
  const [food, setFood] = useState("");
  const [weight, setWeight] = useState("");
  const [description, setDescription] = useState("");

  type FoodEntry = {
    id: number;
    session: string;
    foodName: string;
    weight: number;
    description?: string;
    createdAt: string;
  };
  
  const [entries, setEntries] = useState<FoodEntry[]>([]);

  // Fetch today's entries
  const fetchEntries = async () => {
    const res = await fetch("/api/food");
    if (res.ok) {
      const data = await res.json();
      setEntries(data);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSubmit = async () => {
    const res = await fetch("../api/food", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session, food, weight: Number(weight), description }),
    });

    if (res.ok) {
      alert("Food entry saved ✅");
      setSession(null);
      setFood("");
      setWeight("");
      setDescription("");
      fetchEntries(); // refresh list
    } else {
      alert("Error saving food ❌");
    }
  };

  // Group by session
  const grouped = sessions.map((s) => ({
    session: s,
    items: entries.filter((e) => e.session === s),
  }));

  return (
    <>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "85vh",
          flexDirection: "column",
          alignItems: "center"
        }}
        container
        spacing={2}
      >
        <Box
          sx={{
            maxWidth: 300,
            maxHeight: 450,
            p: 5,
            borderRadius: 5, 
            bgcolor: '#88e1e0'
          }}
        >
          <Typography m={2}>Food Calorie Tracker</Typography>
          <Grid container spacing={2}>
            <Autocomplete
              disablePortal
              options={sessions}
              sx={{ width: 300 }}
              onChange={(event: unknown, newValue: string | null) => setSession(newValue)}
              renderInput={(params) => <TextField {...params} label="Session" />}
            />
            <TextField
              label='Food'
              sx={{
                width: 200
              }}
              onChange={(e) => setFood(e.target.value)}
            ></TextField>
            <TextField
              label='Weight(g)'
              type="number"
              sx={{
                width: 100,
                "& .MuiInputLabel-root": { fontSize: "0.8rem" },
              }}
              onChange={(e) => setWeight(e.target.value)}
            ></TextField>
          </Grid>
          <Grid my={2}>
            <TextField label='Description' onChange={(e) => setDescription(e.target.value)} ></TextField>
          </Grid>
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          ><Button variant="contained" onClick={handleSubmit} >Submit</Button></Grid>
        </Box>

         {/* Entries List */}
      <Box sx={{ maxWidth: 350, width: "100%" }}>
        <Typography variant="h6" mb={1}>Today’s Entries</Typography>
        {grouped.map((group) => (
          <Box key={group.session} mb={2}>
            <Typography variant="subtitle1" fontWeight="bold">{group.session}</Typography>
            <List dense>
              {group.items.length > 0 ? (
                group.items.map((item) => (
                  <div key={item.id}>
                    <ListItem>
                      <ListItemText
                        primary={`${item.foodName} - ${item.weight}g`}
                        secondary={item.description}
                      />
                    </ListItem>
                    <Divider />
                  </div>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">No entries</Typography>
              )}
            </List>
          </Box>
        ))}
      </Box>
        
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <BottomNavigation
            showLabels
          >
            <BottomNavigationAction label='Food' icon={<Egg/>}></BottomNavigationAction>
            <BottomNavigationAction label='Expense' icon={<Egg/>}></BottomNavigationAction>
            <BottomNavigationAction label='Updates' icon={<Egg/>}></BottomNavigationAction>
          </BottomNavigation>
        </Paper>
      
      </Grid>
   </>
  );
}