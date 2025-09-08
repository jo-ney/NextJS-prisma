/**
 * import react
 */

/**
 * import mui
 */
import { Egg } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Box, Button, Grid, Paper, TextField, Typography } from "../mui";

export default function Updates() {
  return (
    <>
      <Grid
        sx={{
          display: 'flex',
          justifyContent: 'center',
          m: 5,
          height: '85vh'
        }}
      >
        <Box
          sx={{
            maxWidth: 300,
            maxHeight: 400,
            p: 5,
            borderRadius: 5, 
            bgcolor: '#88e1e0'
          }}
        >
          <Typography m={2}>Updates</Typography>
          <Grid container spacing={2}>
            <TextField
              label='Food'
              sx={{
                width: 200
              }}
              ></TextField>
            <TextField
              label='Weight(g)'
              sx={{
                width: 100,
                "& .MuiInputLabel-root": { fontSize: "0.8rem" },
              }}
            
            ></TextField>
          </Grid>
          <Grid my={2}>
            <TextField label='Description'></TextField>
          </Grid>
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          ><Button variant="contained">Submit</Button></Grid>
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