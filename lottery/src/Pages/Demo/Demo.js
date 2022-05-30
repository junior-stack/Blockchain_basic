import WebCard from "../../Components/WebCard/WebCard";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import "./Demo.css";

const Demo = () => {
  return (
    <Grid
      container
      spacing={0}
      cololumns={12}
      direction="column"
      sx={{ bgcolor: "#515151", height: "100%" }}
    >
      <Grid
        item
        container
        spacing={0}
        columns={12}
        direction={["row"]}
        sx={{ marginTop: "40px" }}
      >
        <Grid
          item
          container
          xs={4}
          sx={{
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Typography
            textAlign="center"
            sx={{ color: "white", lineHeight: "auto" }}
            variant="h2"
          >
            The lottery
          </Typography>
        </Grid>
        <Grid item container xs={4} direction="row">
          <Grid item xs={4}>
            About
          </Grid>
          <Grid item xs={4}>
            Telegram
          </Grid>
          <Grid item xs={4}>
            Etherscan
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Stack direction="row" spacing={3}>
            <Button variant="contained">My Tickets</Button>
            <Button variant="contained">Wallet</Button>
          </Stack>
        </Grid>
      </Grid>
      <Grid item container>
        <div className="Container">
          <div className="col1">
            <WebCard title="Current JackPot">
              <Typography
                textAlign="center"
                sx={{ color: "white" }}
                variant="h2"
              >
                1,000,000 $ROT
              </Typography>
            </WebCard>
            <WebCard title="Current JackPot">
              <Typography
                textAlign="center"
                sx={{ color: "white" }}
                variant="h2"
              >
                1,000,000 $ROT
              </Typography>
            </WebCard>
            <WebCard title="Current JackPot">
              <Typography
                textAlign="center"
                sx={{ color: "white" }}
                variant="h2"
              >
                1,000,000 $ROT
              </Typography>
            </WebCard>
          </div>
          <div className="col2">
            <WebCard title="Current JackPot">
              <Stack spacing={0}>
                <Typography
                  textAlign="center"
                  sx={{ color: "white" }}
                  variant="h2"
                >
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
                <Typography
                  textAlign="center"
                  sx={{ color: "white" }}
                  variant="h2"
                >
                  Mon, 26 Oct 2022
                </Typography>
                <Typography
                  textAlign="center"
                  sx={{ color: "white" }}
                  variant="h2"
                >
                  00: 17: 11 GMT
                </Typography>
              </Stack>
            </WebCard>
          </div>
        </div>
      </Grid>
      <Grid item>j</Grid>
    </Grid>
  );
};

export default Demo;
