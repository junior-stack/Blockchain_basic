import {
  CardHeader,
  Card,
  CardContent,
  Box,
  Container,
  Typography,
} from "@mui/material";
import "./WebCard.css";

const WebCard = (props) => {
  return (
    <Box sx={{ alignItems: "center", height: "100%" }} className="wrapper">
      <Card sx={{ bgcolor: "#222c1f", width: "700px" }}>
        {/* <CardHeader subheader={<div className="Title">{props.title}</div>} /> */}
        <CardHeader
          subheader={
            <Typography textAlign="center" sx={{ color: "white" }} variant="h1">
              {props.title}
            </Typography>
          }
        />
        <CardContent>
          <Container>{props.children}</Container>
        </CardContent>
      </Card>
    </Box>
  );
};

export default WebCard;
