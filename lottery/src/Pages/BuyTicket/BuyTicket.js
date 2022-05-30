import LayOut from "../../Components/LayOut/LayOut";
import { Container } from "@mui/system";
import { Button, Menu, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "./BuyTicket.css";
const BuyTicket = (props) => {
  return (
    <LayOut title="Buy Ticket">
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
            <Select label="quantity" className="select">
              <MenuItem>1</MenuItem>
              <MenuItem>2</MenuItem>
            </Select>
          </div>
          <div className="QuantityField">
            <div className="label">Total $ROT</div>
            <div className="price">250</div>
          </div>
          <div className="QuantityField">
            <Button variant="contained" sx={{ height: "70px", width: "280px" }}>
              Buy
            </Button>
          </div>
        </Stack>
      </Container>
    </LayOut>
  );
};

export default BuyTicket;
