import WebCard from "./../Components/WebCard/WebCard";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import "./Home.css";

const Home = () => {
  return (
    <Container sx={{ height: "100%" }}>
      <WebCard title="Current JackPot">
        <Typography textAlign="center" sx={{ color: "white" }} variant="h2">
          1,000,000 $ROT
        </Typography>
      </WebCard>
      <div style={{ height: 20, margin: 20 }}></div>
      <WebCard title="Current JackPot">
        <Stack spacing={0}>
          <Typography textAlign="center" sx={{ color: "white" }} variant="h2">
            250 $ROT
          </Typography>
          <Container>
            <div className="buyButton">
              <Button variant="contained" sx={{ width: 257, height: 70 }}>
                Buy
              </Button>
            </div>
          </Container>
        </Stack>
      </WebCard>
      <WebCard title="Current JackPot">
        <Stack spacing={0}>
          <Typography textAlign="center" sx={{ color: "white" }} variant="h2">
            Mon, 26 Oct 2022
          </Typography>
          <Typography textAlign="center" sx={{ color: "white" }} variant="h2">
            00: 17: 11 GMT
          </Typography>
        </Stack>
      </WebCard>
    </Container>
  );
};

export default Home;
