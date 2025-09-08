"use client";


/**
 * import react
 */
import { useState } from "react";

/**
 * import mui
 */
import { Egg } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Grid, Paper, Typography } from "./mui";
import Food from "./food";
import Expense from "./expense";
import Updates from "./Updates";
import { JSX } from "@emotion/react/jsx-runtime";

// const components = {
//   food: Food,
//   expense: Expense,
//   updates: Updates,
// };

// Define allowed tabs
type Tab = "food" | "expense" | "updates";

const components: Record<Tab, () => JSX.Element> = {
  food: Food,
  expense: Expense,
  updates: Updates,
};

export default function Home() {
  // const [value, setValue] = useState("food")
  // const Component = components[value]; // get component by key

  const [value, setValue] = useState<Tab>("food");
  const Component = components[value]; // ✅ Type-safe lookup

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
        {Component && <Component />}

        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction label='Food' icon={<Egg/>} value='food'/>
            <BottomNavigationAction label='Expense' icon={<Egg/>} value='expense'/>
            <BottomNavigationAction label='Updates' icon={<Egg/>} value='updates'/>
          </BottomNavigation>
        </Paper>
      
      </Grid>
   </>
  );
}
