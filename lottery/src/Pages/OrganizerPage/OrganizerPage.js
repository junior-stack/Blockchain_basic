import { useContext, useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import Context from "../../Context/Context";
import { Stack, Button } from "@mui/material";
import { Container } from "@mui/system";
import "./OrganizerPage.css";

const OrganizerPage = (props) => {
  const { Address, Owner, SignerContract } = useContext(Context);

  const [loading, setLoading] = useState(false);

  const pickWinner = async () => {
    setLoading(true);
    await SignerContract.pickWinner();
    setLoading(false);
  };

  const Withdraw = async () => {
    setLoading(true);
    await SignerContract.withdraw();
    setLoading(true);
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
              >
                Pick a winner
              </Button>
            </div>
          </div>
          <div className="wrapper">
            <Button
              variant="contained"
              sx={{ height: "70px", width: "280px" }}
              onClick={Withdraw}
              disabled={Address !== Owner}
            >
              Withdraw the ussage fee
            </Button>
          </div>
        </Stack>
      </Container>
    </LayOut>
  );
};

export default OrganizerPage;
