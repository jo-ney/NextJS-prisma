// /**
//  * import react
//  */

// /**
//  * import mui
//  */
// import { Box, Button, Grid, TextField, Typography } from "../mui";

// export default function Updates() {
//   return (
//     <>
//       <Grid
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           m: 5,
//         }}
//       >
//         <Box
//           sx={{
//             maxWidth: 300,
//             maxHeight: 400,
//             p: 5,
//             borderRadius: 5, 
//             bgcolor: '#88e1e0'
//           }}
//         >
//           <Typography variant="h5" textAlign={'center'} mb={5}>Updates</Typography>
//           <Grid container spacing={2} mb={5}>
//             <TextField
//               label='Title'
//               sx={{
//                 width: 200
//               }}
//               ></TextField>
//             <TextField
//               label='Description'
//               sx={{
//                 width: 200
//               }}
//               ></TextField>
//             <TextField
//               label='Note'
//               sx={{
//                 width: 200
//               }}
//               ></TextField>
            
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




"use client"; // required for hooks

/**
 * import react
 */
import { useState } from "react";

/**
 * import mui
 */
import { Box, Button, Grid, TextField, Typography } from "../mui";

export default function Updates() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("/api/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, note }),
    });

    if (res.ok) {
      alert("✅ Update saved");
      setTitle("");
      setDescription("");
      setNote("");
    } else {
      alert("❌ Failed to save update");
    }
  };

  return (
    <>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: { xs: 'column', md: 'row'},
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
    </>
  );
}
