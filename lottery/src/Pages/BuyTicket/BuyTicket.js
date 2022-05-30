import LayOut from "../../Components/LayOut/LayOut";
import { Container } from "@mui/system";
import { Button, Menu, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import "./BuyTicket.css";
import { useContext, useState } from "react";
import Context from "../../Context/Context";
const BuyTicket = (props) => {
  const { SignerContract, Address } = useContext(Context);
  const [amount, setAmount] = useState(0);

  const [loading, setLoading] = useState(false);
  const buy = async () => {
    setLoading(true);
    // await SignerContract.resetPrice(30);
    await SignerContract.buyTicket(Address, amount);
    console.log("new price: ");
    setLoading(false);
  };

  const change = (e) => {
    setAmount(e.target.value);
  };

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
              250 $ ROT
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
              sx={{ height: "70px", width: "280px" }}
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
