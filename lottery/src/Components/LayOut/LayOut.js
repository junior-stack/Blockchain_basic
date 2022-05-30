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
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import "./LayOut.css";
const LayOut = (props) => {
  return (
    <Box>
      <Box
        sx={{
          displayPrint: "flex",
          direction: "column",
          bgcolor: "#515151",
          opacity: props.loading ? 0.15 : 1,
        }}
      >
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
      {props.loading && (
        <div className="loading">
          <LoadingButton
            endIcon={<SendIcon />}
            loading={props.loading}
            loadingPosition="end"
            variant="contained"
            size="large"
          >
            loading
          </LoadingButton>
        </div>
      )}
    </Box>
  );
};

export default LayOut;
