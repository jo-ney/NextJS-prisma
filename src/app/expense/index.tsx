"use client";
// /**
//  * import react
//  */


// /**
//  * import mui
//  */
// import { Box, Button, Grid, TextField, Typography } from "../mui";

// export default function Expense() {
//   return (
//     <>
//       <Grid
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           m: 5,
//           // height: '85vh'
//         }}
//       >
//         <Box
//           sx={{
//             // maxWidth: 300,
//             // maxHeight: 400,
//             p: 5,
//             borderRadius: 5, 
//             bgcolor: '#88e1e0'
//           }}
//         >
//           <Typography variant="h5" textAlign={'center'} mb={5}>Expense Tracker</Typography>
//           <Grid container spacing={2}
//             sx={{
//               display: 'flex',
//               flexDirection: 'column'
//             }}
//           >
//             <TextField
//               label='Item Name'
//               sx={{
//                 width: 200
//               }}
//               ></TextField>
//             <TextField
//               label='Capacity(g/ml)'
//               sx={{
//                 width: 100,
//                 "& .MuiInputLabel-root": { fontSize: "0.8rem" },
//               }}
            
//             ></TextField>
//             <TextField
//               label='Item Price'
//               sx={{
//                 "& .MuiInputLabel-root": { fontSize: "0.8rem" },
//               }}
            
//             ></TextField>
//             <TextField
//               label='Price - Per (Kg/l)'
//               sx={{
//                 "& .MuiInputLabel-root": { fontSize: "0.8rem" },
//               }}
            
//             ></TextField>
//           </Grid>
//           <Grid my={2}>
//             <TextField label='Description'></TextField>
//           </Grid>
//           <Grid
//             sx={{
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center'
//             }}
//           ><Button variant="contained">Submit</Button></Grid>
//         </Box>
      
//       </Grid>
//    </>
//   );
// }




import { useState, useEffect } from "react";

/**
 * import mui
 */
import { Box, Button, Grid, TextField, Typography, List, ListItem, Divider, ListItemText } from "../mui";
// 2️⃣ Type declaration goes here, before the component
type ExpenseEntry = {
  id: number;
  itemName: string;
  capacity: number;
  itemPrice: number;
  actualPrice: number;
  calculatedPrice: number;
  description?: string;
  dateTime: string;
  createdAt: string;
};


export default function Expense() {
  const [itemName, setItemName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [actualPrice, setActualPrice] = useState("");
  const [description, setDescription] = useState("");
  const [entries, setEntries] = useState<ExpenseEntry[]>([]);

  // Calculate derived price
  const calculatedPrice =
    capacity && itemPrice ? (parseFloat(itemPrice) / (parseFloat(capacity)/1000)).toFixed(2) : "";

  // Fetch entries
  const fetchEntries = async () => {
    const res = await fetch("/api/expense");
    if (res.ok) {
      const data: ExpenseEntry[] = await res.json();
      setEntries(data);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  // Submit handler
  const handleSubmit = async () => {
    const res = await fetch("/api/expense", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        itemName,
        capacity: Number(capacity),
        itemPrice: Number(itemPrice),
        actualPrice: Number(actualPrice),
        calculatedPrice: Number(calculatedPrice),
        description,
        dateTime: new Date(),
      }),
    });

    if (res.ok) {
      alert("Expense saved ✅");
      setItemName("");
      setCapacity("");
      setItemPrice("");
      setActualPrice("");
      setDescription("");
      fetchEntries();
    } else {
      alert("Error saving expense ❌");
    }
  };

  return (
    <Grid
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 3,
        m: 5,
      }}
    >
      {/* Form */}
      <Box
        sx={{
          maxWidth: 350,
          width: '100%',
          p: 5,
          borderRadius: 5,
          bgcolor: "#88e1e0",
        }}
      >
        <Typography variant="h5" textAlign={"center"} mb={5}>
          Expense Tracker
        </Typography>
        <Grid container spacing={2} direction="column">
          <TextField label="Item Name" value={itemName} onChange={(e) => setItemName(e.target.value)} />
          <TextField
            label="Capacity (g/ml)"
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
          <TextField
            label="Item Price"
            type="number"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
          />
          <TextField label="Calculated Price" value={calculatedPrice} InputProps={{ readOnly: true }} />
          <TextField
            label="Price - Per (Kg/L)"
            type="number"
            value={actualPrice}
            onChange={(e) => setActualPrice(e.target.value)}
          />
          <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </Grid>

        <Grid mt={3} sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Box>

      {/* Entries list */}
      <Grid
        sx={{
          maxWidth: 350,
          width: "100%",
          maxHeight: 450,
          overflow: "scroll",
          "&::-webkit-scrollbar": { display: "none" },
          bgcolor: "#9bd39b",
          p: 5,
          borderRadius: 5,
        }}
      >
        <Typography variant="h6" mb={1}>
          Recent Expenses
        </Typography>
        {entries.length > 0 ? (
          entries.map((item) => (
            <div key={item.id}>
              <List>
                <ListItem>
                  <ListItemText
                    primary={`${item.itemName} - ${item.capacity}g/ml`}
                    secondary={`₹${item.itemPrice} | Calc: ${item.calculatedPrice}`}
                  />
                </ListItem>
              </List>
              <Divider />
            </div>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No expenses yet
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}
