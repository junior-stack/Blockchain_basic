import LayOut from "../../Components/LayOut/LayOut";
import { Container } from "@mui/system";
import { Button, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import "./BuyTicket.css";
import { useContext, useEffect, useState } from "react";
import Context from "../../Context/Context";
import Checkbox from "@mui/material/Checkbox";
import { ethers } from "ethers";
const BuyTicket = (props) => {
  const { SignerContract, Address, TokenProviderContract, ProviderContract } =
    useContext(Context);
  const [amount, setAmount] = useState(0);

  const [loading, setLoading] = useState(false);

  const [price, setPrice] = useState(0);

  const [agree, setAgree] = useState(false);

  const [balance, setBalance] = useState(0);

  const buy = async () => {
    setLoading(true);
    if (balance < amount * price) {
      window.alert("You do not have enough balance");
      setLoading(false);
      return;
    }
    try {
      await SignerContract.buyTicket(Address, amount);
    } catch (err) {
      window.alert(err.message);
    }
    setLoading(false);
  };

  const change = (e) => {
    setAmount(e.target.value);
  };

  const Agree = (e) => {
    setAgree(!agree);
  };

  useEffect(() => {
    setLoading(true);
    const loadPrice = async () => {
      const p = await ProviderContract.price();
      const balance = await TokenProviderContract.balanceOf(Address);
      setPrice(p);
      setBalance(balance);
    };
    loadPrice();
    setLoading(false);
  }, []);

  return (
    <LayOut title="Buy Ticket" loading={loading}>
      <Container
        sx={{
          displayPrint: "flex",
          justifyItems: "center",
          flexDirection: "column",
          alignContent: "center",
        }}
      >
        <Stack mt={12} spacing={4}>
          <Stack>
            <Typography variant="h1" align="center">
              Ticket Price
            </Typography>
            <Typography variant="h2" align="center">
              {price / Math.pow(10, 18)} $ ERC
            </Typography>
          </Stack>
          <div className="QuantityField">
            <div className="label">Ticket Quantity</div>
            <TextField
              label="Number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              className="inputfield"
              onChange={change}
            />
          </div>
          <div className="QuantityField">
            <div className="label">Total $ERC</div>
            <div className="price">{ethers.utils.formatEther(p)}</div>
          </div>
          <div className="QuantityField">
            <div className="label">
              <Checkbox
                sx={{ position: "relative", right: "-120px" }}
                onChange={Agree}
              />
            </div>
            <div className="agree">
              You have balance of {ethers.utils.formatEther(balance)} and you
              approve this transaction
            </div>
          </div>
          <div className="QuantityField">
            <Button
              variant="contained"
              sx={{ height: "70px", width: "280px", bgcolor: "#83ae58" }}
              onClick={buy}
              disabled={!agree}
            >
              Buy
            </Button>
          </div>
        </Stack>
      </Container>
    </LayOut>
  );
};

export default BuyTicket;
