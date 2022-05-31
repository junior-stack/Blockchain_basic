import { useContext, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import Context from "../../Context/Context";
import { Stack, Button } from "@mui/material";
import { Container } from "@mui/system";
import { TextField } from "@mui/material";
import "./OrganizerPage.css";

const OrganizerPage = (props) => {
  const { Address, Owner, SignerContract, StartTime, ManagerOne, ManagerTwo } =
    useContext(Context);

  const [loading, setLoading] = useState(false);

  const [price, setPrice] = useState(0);

  const change = (e) => {
    setPrice(e.target.value);
  };
  const pickWinner = async () => {
    setLoading(true);
    try {
      await SignerContract.pickWinner();
    } catch (err) {
      window.alert(err.message);
    }
    setLoading(false);
  };

  const reset = async () => {
    setLoading(true);
    try {
      await SignerContract.resetPrice(price);
    } catch (err) {
      window.alert(err.message);
    }
    setLoading(false);
  };

  return (
    <LayOut title="Organizer Page" loading={loading}>
      <Container
        sx={{
          displayPrint: "flex",
          justifyItems: "center",
          flexDirection: "column",
          alignContent: "center",
        }}
      >
        <Stack mt={12} spacing={4} sx={{ justifyContent: "center" }}>
          <div className="wrapper">
            <div>
              <Button
                variant="contained"
                sx={{ height: "70px", width: "280px" }}
                onClick={pickWinner}
                disabled={
                  Math.abs(Date.now() - StartTime) / 1000 / 3600 < 5 ||
                  (Number(Address) !== Number(Owner) &&
                    Number(Address) !== Number(ManagerTwo) &&
                    Number(Address) !== Number(ManagerOne))
                }
              >
                Pick a winner
              </Button>
            </div>
          </div>
          <div className="wrapper1">
            <TextField
              label="Number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              className="inputfield"
              onChange={change}
              sx={{ marginRight: "20px" }}
            />
            <Button
              variant="contained"
              sx={{ height: "56px", width: "280px" }}
              disabled={Number(Address) !== Number(Owner)}
              className="submit"
              onClick={reset}
            >
              Reset
            </Button>
          </div>
        </Stack>
      </Container>
    </LayOut>
  );
};

export default OrganizerPage;
