"use client"; // client component so we can use hooks

/**
 * import react
 */


/**
 * import mui
 */
import { Autocomplete, Box, Button, CircularProgress, Divider, Grid, List, ListItem, ListItemText, TextField, Typography } from "../mui";
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
  const [ isResOk, setIsResOk ] = useState(false)

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
      setIsResOk(true)
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
          flexDirection: { xs: 'column', md: 'row'},
          alignItems: "center",
          gap: 3,
          mt: 4
        }}
      >
        <Grid
          sx={{
            maxWidth: 300,
            maxHeight: 450,
            p: 5,
            borderRadius: 5, 
            bgcolor: '#fdbd09'
          }}
        >
          <Typography variant="h5" textAlign={'center'} mb={5}>Food Tracker</Typography>
          <Grid container spacing={2}>
            <Autocomplete
              disablePortal
              options={sessions}
              value={session}
              sx={{ width: 300 }}
              onChange={(event: unknown, newValue: string | null) => setSession(newValue)}
              renderInput={(params) => <TextField {...params} label="Session" />}
            />
            <TextField
              label='Food'
              sx={{
                width: 200
              }}
              value={food}
              onChange={(e) => setFood(e.target.value)}
            ></TextField>
            <TextField
              label='Weight(g)'
              type="number"
              sx={{
                width: 100,
                "& .MuiInputLabel-root": { fontSize: "0.8rem" },
              }}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            ></TextField>
          </Grid>
          <Grid my={2}>
            <TextField label='Description' value={description} onChange={(e) => setDescription(e.target.value)} ></TextField>
          </Grid>
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          ><Button variant="contained" onClick={handleSubmit} >Submit</Button></Grid>
        </Grid>

         {/* Entries List */}
        <Grid sx={{
          maxWidth: 300,
          width: "100%",
          maxHeight: 450,
          height: '100%',
          overflow: "scroll",
          "&::-webkit-scrollbar": { display: "none" },
          bgcolor: "#a7058d",
          p: 5,
          borderRadius: 5
          }}>
          <Typography variant="h6" mb={1}>Today’s Entries</Typography>
          {isResOk ? grouped.map((group) => (
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
          ))
          : <Grid sx={{ height: "100%", textAlign: 'center', alignContent: 'center' }}><CircularProgress size={50} /></Grid>
        }
        </Grid>
      </Grid>
   </>
  );
}