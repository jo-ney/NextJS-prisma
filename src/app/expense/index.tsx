"use client";

import { useState, useEffect } from "react";

/**
 * import mui
 */
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  CircularProgress,
  Stack,
  Autocomplete,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  TableBody,
  TableFooter,
  Dialog,
  DialogTitle,
  DialogContent,
} from "../mui";
import { Close, FontDownload } from "@mui/icons-material";

import expenseRemote from "../../remote/expense/expense.remote";

import dynamic from "next/dynamic";

const LottieAnimation = dynamic(() => import("../components/LottieAnimation"), {
  ssr: false,
  loading: () => <div style={{ width: 200, height: 200 }} />,
});

const ExpenseRemote = new expenseRemote();

// 2️⃣ Type declaration goes here, before the component
type ExpenseEntry = {
  id: number;
  itemName: string;
  capacity: number;
  unit: string;
  itemPrice: number;
  actualPrice: number;
  description?: string;
  dateTime: string;
  createdAt: string;
};

export default function Expense() {
  const [itemName, setItemName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [unit, setUnit] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [actualPrice, setActualPrice] = useState("");
  const [description, setDescription] = useState("");
  const [entries, setEntries] = useState<ExpenseEntry[]>([]);
  const [isResOk, setIsResOk] = useState(false);

  const [loading, setLoading] = useState(false);

  const [totalAmount, setTotalAmount] = useState(0);

  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const tableHeaders = [
    {
      name: "Item",
    },
    {
      name: "Quantity",
    },
    {
      name: "Price",
    },
    {
      name: "Date",
    },
    {
      name: "Description",
    },
  ];

  // Submit handler
  const handleSubmit = async () => {
    const res = await fetch("/api/expense", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        itemName,
        capacity: Number(capacity),
        unit,
        itemPrice: Number(itemPrice),
        actualPrice: Number(actualPrice),
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
      setUnit("");
      setIsAddFormOpen(false);

      fetchExpenses();
    } else {
      alert("Error saving expense ❌");
    }
  };

  // Get expenses with filters
  const fetchExpenses = async () => {
    setLoading(true);
    const response = await fetch("/api/expense", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();

    setEntries(result);

    setTotalAmount(
      result?.reduce((sum: any, e: any) => sum + Number(e.itemPrice), 0) ?? 0
    );
    setIsResOk(true);
    setLoading(false);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: 0.5,
          mt: { xs: 7, md: 0 },
        }}
      >
        <Grid>
          <Box
            component={"span"}
            sx={{
              bgcolor: "#B9B9B9",
              color: "black",
              borderRadius: 2,
              display: "flex",
              justifyContent: "space-between",
              width: "fit-content",
              py: 1,
              px: 2,
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>Total Expense: </Typography>
            <Typography>
              {isResOk ? (
                `₹${
                  entries?.reduce(
                    (sum, e: any) => sum + Number(e.itemPrice),
                    0
                  ) ?? 0
                }`
              ) : (
                <CircularProgress size={20} />
              )}
            </Typography>
          </Box>
        </Grid>

        {/* Entries list */}
        <Grid
          sx={{
            mt: 5,
          }}
        >
          <Grid
            sx={{
              display: "flex",
              justifyContent: "space-between",
              pb: 2,
            }}
          >
            <Typography
              variant="h6"
              color="#c4c4c4"
              sx={{ fontWeight: "bold" }}
              mb={1}
            >
              Recent Expenses
            </Typography>

            <Button
              onClick={() => setIsAddFormOpen(true)}
              sx={{
                bgcolor: "#B9B9B9",
                color: "black",
                fontWeight: "bold",
              }}
            >
              Add
            </Button>
          </Grid>

          <TableContainer
            sx={{
              height: 400,
              bgcolor: "#000",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
            component={Paper}
          >
            <Table
              stickyHeader
              sx={{
                minWidth: 650,
              }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  {tableHeaders.map((header, index) => (
                    <TableCell
                      key={index}
                      sx={{
                        bgcolor: "#b9b9b9",
                        borderRight: "1px solid #ccc",
                        fontWeight: "bold",
                        letterSpacing: "0.5px",
                        fontSize: "16px",
                      }}
                    >
                      {header.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell
                      colSpan={tableHeaders?.length}
                      align="center"
                      sx={{ py: 4 }}
                    >
                      <div style={{ width: "300px", margin: "0 auto" }}>
                        <LottieAnimation />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {isResOk ? (
                      entries.length > 0 ? (
                        entries.map((row, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              "& > *": {
                                marginBottom: 2,
                                borderRight: "1px solid #ccc",
                                bgcolor: "#016157",
                                color: "white",
                              },
                              "& td, & th": { color: "#fff" },
                              "&:last-child td, &:last-child th": {
                                // border: 0,
                              },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {row.itemName}
                            </TableCell>
                            <TableCell align="left">
                              {row.capacity} {row.unit}
                            </TableCell>
                            <TableCell align="right">{row.itemPrice}</TableCell>
                            <TableCell align="right">
                              {new Date(row.dateTime).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                }
                              )}
                            </TableCell>
                            <TableCell align="left">
                              {row.description}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={tableHeaders.length}>
                            No data found
                          </TableCell>
                        </TableRow>
                      )
                    ) : (
                      <Typography></Typography>
                    )}
                  </>
                )}
              </TableBody>
              {isResOk && (
                <TableFooter>
                  <TableRow
                    sx={{
                      "& > *": {
                        marginBottom: 2,
                        borderRight: "1px solid #ccc",
                        bgcolor: "#016157",
                        color: "white",
                      },
                    }}
                  >
                    <TableCell colSpan={2}>
                      <Typography>Total : </Typography>
                    </TableCell>
                    <TableCell align="right">{totalAmount}</TableCell>
                  </TableRow>
                </TableFooter>
              )}
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      {isAddFormOpen && (
        <Dialog maxWidth="md" open={isAddFormOpen}>
          <DialogTitle
            sx={{
              bgcolor: "black",
              color: "white",
            }}
          >
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography>New Expense</Typography>
              <Close
                sx={{
                  transition: ".2s ease-in",
                  "&:hover": {
                    color: "red",
                    transform: "rotate(90deg)",
                    cursor: "pointer",
                  },
                }}
                onClick={() => setIsAddFormOpen(false)}
              />
            </Stack>
          </DialogTitle>
          <DialogContent
            dividers
            sx={{
              bgcolor: "black",
              color: "white",
              px: 10,
            }}
          >
            {/* Form */}
            <Box
              sx={{
                maxWidth: 350,
                width: "100%",
                height: 400,
                p: 3,
                borderRadius: 5,
                // bgcolor: "#3b487a",
                bgcolor: "rgba(255, 255, 255, 0.04)",
                backdropFilter: "blur(100px)",
                border: "1px solid rgba(255, 255, 255, 0.5)",
              }}
            >
              <Typography
                variant="h5"
                color="#c4c4c4"
                textAlign={"center"}
                mb={3}
              >
                Expense Tracker
              </Typography>
              <Grid container spacing={1} direction="column">
                <TextField
                  size="small"
                  sx={{
                    input: { color: "#c4c4c4" }, // text color
                    label: { color: "#c4c4c4" }, // label color
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#c4c4c4", // border color
                      },
                      "&:hover fieldset": {
                        borderColor: "#c4c4c4", // hover border
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#c4c4c4", // focused border
                      },
                    },
                  }}
                  label="Item Name *"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                />
                <Stack direction={"row"} gap={2}>
                  <TextField
                    size="small"
                    sx={{
                      input: { color: "#c4c4c4" }, // text color
                      label: { color: "#c4c4c4" }, // label color
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#c4c4c4", // border color
                        },
                        "&:hover fieldset": {
                          borderColor: "#c4c4c4", // hover border
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#c4c4c4", // focused border
                        },
                      },
                    }}
                    label="Capacity"
                    type="number"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                  />

                  <Autocomplete
                    size="small"
                    sx={{
                      input: { color: "#c4c4c4" }, // text color
                      label: { color: "#c4c4c4" }, // label color
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#c4c4c4", // border color
                        },
                        "&:hover fieldset": {
                          borderColor: "#c4c4c4", // hover border
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#c4c4c4", // focused border
                        },
                      },
                    }}
                    disablePortal
                    options={["Kg", "L", "Piece"]}
                    onChange={(e, newValue) => {
                      setUnit(newValue ?? "");
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Unit" />
                    )}
                  />
                </Stack>

                <TextField
                  size="small"
                  sx={{
                    input: { color: "#c4c4c4" }, // text color
                    label: { color: "#c4c4c4" }, // label color
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#c4c4c4", // border color
                      },
                      "&:hover fieldset": {
                        borderColor: "#c4c4c4", // hover border
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#c4c4c4", // focused border
                      },
                    },
                  }}
                  label="Item Price *"
                  type="number"
                  value={itemPrice}
                  onChange={(e) => setItemPrice(e.target.value)}
                />
                <TextField
                  size="small"
                  sx={{
                    opacity: 0.5,
                    input: { color: "#c4c4c4" }, // text color
                    label: { color: "#c4c4c4" }, // label color
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#c4c4c4", // border color
                      },
                      "&:hover fieldset": {
                        borderColor: "#c4c4c4", // hover border
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#c4c4c4", // focused border
                      },
                    },
                  }}
                  label="Price - Per (Kg/L/P)"
                  type="number"
                  value={actualPrice}
                  onChange={(e) => setActualPrice(e.target.value)}
                />
                <TextField
                  size="small"
                  sx={{
                    input: { color: "#c4c4c4" }, // text color
                    label: { color: "#c4c4c4" }, // label color
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#c4c4c4", // border color
                      },
                      "&:hover fieldset": {
                        borderColor: "#c4c4c4", // hover border
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#c4c4c4", // focused border
                      },
                    },
                  }}
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>

              <Grid mt={3} sx={{ display: "flex", justifyContent: "center" }}>
                <Button variant="contained" onClick={handleSubmit}>
                  Create
                </Button>
              </Grid>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
