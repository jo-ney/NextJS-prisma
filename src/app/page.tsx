"use client";


/**
 * import react
 */
import { useState } from "react";

/**
 * import mui
 */
import { AccountBalanceWallet, Egg, TipsAndUpdates } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Grid, Paper } from "./mui";
import Food from "./food";
import Expense from "./expense";
import Updates from "./Updates";
import type { JSX } from "react";

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
          mt: 1,
          mb:10,
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
            sx={{
              bgcolor: '#ff671d'
            }}
          >
            <BottomNavigationAction label='Food' icon={<Egg/>} value='food'/>
            <BottomNavigationAction label='Expense' icon={<AccountBalanceWallet />} value='expense'/>
            <BottomNavigationAction label='Updates' icon={<TipsAndUpdates/>} value='updates'/>
          </BottomNavigation>
        </Paper>
      
      </Grid>
   </>
  );
}
