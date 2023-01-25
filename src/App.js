import "./App.css";
import {
  Typography,  
  Grid,
  Container  
} from "@material-ui/core";
import Execution from "./components/Execution";

import * as React from "react";


export default function App() {
  return (
    <div className="App">

      {/* <div class="background">
      <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span> */}

      <Typography variant="h5">Binance BOT</Typography>

      <Container>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="stretch"
          direction="row"
        >
          <Execution />
        </Grid>
      </Container>

      {/* <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div> */}
    </div>
  );
}
