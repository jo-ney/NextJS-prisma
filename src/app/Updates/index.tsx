"use client"; // required for hooks

/**
 * import react
 */
import { useEffect, useState } from "react";

/**
 * import mui
 */
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "../mui";

import dynamic from "next/dynamic";

const LottieAnimation = dynamic(() => import("../components/LottieAnimation"), {
  ssr: false,
  loading: () => <div style={{ width: 200, height: 200 }} />,
});

export default function Updates() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [note, setNote] = useState("");

  const [updates, setUpdates] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const res = await fetch("/api/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, note }),
    });

    if (res.ok) {
      // alert("✅ Update saved");
      setTitle("");
      setDescription("");
      setNote("");
      fetchUpdates();
    } else {
      alert("❌ Failed to save update");
    }
  };

  const fetchUpdates = async () => {
    setLoading(true);
    const response = await fetch("/api/update", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();

    setUpdates(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  const tableHeaders = [
    {
      name: "Title",
    },
    {
      name: "Description",
    },
    {
      name: "Note",
    },
    {
      name: "Date",
    },
  ];

  return (
    <Grid>
      <Grid
        size={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: { xs: "row", md: "row" },
          m: 5,
        }}
      >
        <Box
          sx={{
            maxWidth: 300,
            maxHeight: 400,
            p: 5,
            borderRadius: 5,
            bgcolor: "rgba(255, 255, 255, 0.04)",
            backdropFilter: "blur(100px)",
            border: "1px solid rgba(255, 255, 255, 0.5)",
          }}
        >
          <Typography variant="h5" textAlign={"center"} mb={5}>
            Updates
          </Typography>
          <Grid container spacing={2} mb={5}>
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
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              label="Note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </Grid>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </Box>
      </Grid>

      <Grid size={12}>
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
                  {updates.length > 0 ? (
                    updates.map((row: any, index) => (
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
                          {row?.title}
                        </TableCell>
                        <TableCell align="left">{row?.description}</TableCell>
                        <TableCell align="right">{row?.note}</TableCell>
                        <TableCell align="right">
                          {new Date(row?.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={tableHeaders.length}>
                        No data found
                      </TableCell>
                    </TableRow>
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
