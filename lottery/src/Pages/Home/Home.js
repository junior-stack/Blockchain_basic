import WebCard from "../../Components/WebCard/WebCard";
import { getTableBodyUtilityClass, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import "./Home.css";
import { useContext, useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import Context from "../../Context/Context";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const {
    ProviderContract,
    StartTime,
    setAddress,
    setManagerOne,
    setManagerTwo,
    setOwner,
    setStartTime,
  } = useContext(Context);

  let navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [prize, setPrize] = useState(0);

  const [price, setPrice] = useState(0);

  const [sold, setSold] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const price = await ProviderContract.price();
      const managerOne = await ProviderContract.managers(0);
      const managerTwo = await ProviderContract.managers(1);
      const owner = await ProviderContract.owner();
      const start_time = await ProviderContract.start_time();
      const p = await ProviderContract.getBalance();
      const numSold = await ProviderContract.num_sold();
      const provider = await detectEthereumProvider();
      setPrize(Number(p));
      setAddress(provider.selectedAddress);
      setPrice(Number(price));
      setManagerOne(managerOne);
      setManagerTwo(managerTwo);
      setOwner(owner);
      setStartTime(new Date(start_time));
      setSold(Number(numSold));
      setLoading(false);
      window.ethereum.on("accountsChanged", function (accounts) {
        // Time to reload your interface with accounts[0]!
        setAddress(accounts[0]);
      });
    };

    loadData();
  }, []);

  const buy = async () => {
    navigate("/buy");
  };

  const toOrganizer = async () => {
    navigate("/organizer");
  };

  return (
    <Box>
      <Grid
        container
        spacing={0}
        cololumns={12}
        direction="column"
        sx={{ bgcolor: "#515151", height: "100%", opacity: loading ? 0.15 : 1 }}
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
            <Grid
              item
              xs={4}
              onClick={toOrganizer}
              className="about"
              sx={{ textAlign: "center" }}
            >
              About
            </Grid>
            <Grid item xs={4} sx={{ textAlign: "center" }}>
              Telegram
            </Grid>
            <Grid item xs={4} sx={{ textAlign: "center" }}>
              Etherscan
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Stack direction="row" spacing={3}>
              <Button variant="contained" sx={{ bgcolor: "#83ae58" }}>
                My Tickets
              </Button>
              <Button variant="contained" sx={{ bgcolor: "#83ae58" }}>
                Wallet
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <Grid item container sx={{ width: "100%" }}>
          <div className="Container">
            <div className="col1">
              <Stack spacing={4}>
                <WebCard title="Current JackPot" sx={{ marginTop: "10px" }}>
                  <Typography
                    textAlign="center"
                    sx={{ color: "white" }}
                    variant="h2"
                  >
                    {prize} $ERC
                  </Typography>
                </WebCard>
                <WebCard title="winning prize">
                  <Typography
                    textAlign="center"
                    sx={{ color: "white" }}
                    variant="h2"
                  >
                    {prize * 0.95} $ERC
                  </Typography>
                </WebCard>
                <WebCard title="Number Sold">
                  <Typography
                    textAlign="center"
                    sx={{ color: "white" }}
                    variant="h2"
                  >
                    {sold}
                  </Typography>
                </WebCard>
              </Stack>
            </div>
            <div className="col2">
              <WebCard title="Ticket price">
                <Stack spacing={0}>
                  <Typography
                    textAlign="center"
                    sx={{ color: "white" }}
                    variant="h2"
                  >
                    {price} $ERC
                  </Typography>
                  <Container>
                    <div className="buyButton">
                      <Button
                        variant="contained"
                        sx={{ width: 257, height: 70, bgcolor: "#83ae58" }}
                        onClick={buy}
                      >
                        Buy
                      </Button>
                    </div>
                  </Container>
                </Stack>
              </WebCard>
              <WebCard title="Start Time">
                <Stack spacing={0}>
                  <Typography
                    textAlign="center"
                    sx={{ color: "white" }}
                    variant="h2"
                  >
                    {StartTime.toString()}
                  </Typography>
                  <Typography
                    textAlign="center"
                    sx={{ color: "white" }}
                    variant="h2"
                  >
                    -
                  </Typography>
                </Stack>
              </WebCard>
            </div>
          </div>
        </Grid>
        <Grid item>j</Grid>
      </Grid>
      {loading && (
        <div className="loading">
          <LoadingButton
            endIcon={<SendIcon />}
            loading={true}
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

export default Home;
