import {
  CardHeader,
  Card,
  CardContent,
  Box,
  Container,
  Typography,
  AppBar,
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import "./LayOut.css";
const LayOut = (props) => {
  return (
    <Box sx={{ displayPrint: "flex", direction: "column", bgcolor: "#515151" }}>
      <AppBar position="static" sx={{ height: "110px" }}>
        <Toolbar
          sx={{
            displayPrint: "flex",
            justifyContent: "center",
            height: "110px",
          }}
        >
          <Typography variant="h1">{props.title}</Typography>
        </Toolbar>
      </AppBar>
      {props.children}
    </Box>
  );
};

export default LayOut;
