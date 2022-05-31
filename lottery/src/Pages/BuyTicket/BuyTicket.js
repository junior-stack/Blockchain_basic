import LayOut from "../../Components/LayOut/LayOut";
import { Container } from "@mui/system";
import { Button, Menu, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import "./BuyTicket.css";
import { useContext, useEffect, useState } from "react";
import Context from "../../Context/Context";
const BuyTicket = (props) => {
  const { SignerContract, Address, TokenProviderContract, ProviderContract } =
    useContext(Context);
  const [amount, setAmount] = useState(0);

  const [loading, setLoading] = useState(false);

  const [price, setPrice] = useState(0);

  const buy = async () => {
    setLoading(true);
    // await SignerContract.resetPrice(30);
    const balances = await TokenProviderContract.balanceOf(Address);
    if (balances < amount * price) {
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

  useEffect(() => {
    setLoading(true);
    const loadPrice = async () => {
      const p = await ProviderContract.price();
      setPrice(Number(p));
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
              {price} $ ERC
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
            <div className="label">Total $ROT</div>
            <div className="price">250</div>
          </div>
          <div className="QuantityField">
            <Button
              variant="contained"
              sx={{ height: "70px", width: "280px", bgcolor: "#83ae58" }}
              onClick={buy}
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
