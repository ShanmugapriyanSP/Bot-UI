import "./App.css";
import {
  Typography,
  AppBar,
  Toolbar,
  TextField,
  Button,
  Select,
  Box,
  InputLabel,
  MenuItem,
  FormControl

} from "@material-ui/core";

// import FormHelperText from '@mui/material/FormHelperText';
// import FormControl from '@mui/material/FormControl';

import * as React from "react";
import { useState } from "react";

const FORM_ENDPOINT = "http://localhost:5000/trade/"

export default function App() {

  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");


  const [market, setMarket] = useState("BNBUSDT");
  const [leverage, setLeverage] = useState(50);
  const [takeProfit, setTakeProfit] = useState(0.5);
  const [stopLoss, setStopLoss] = useState(0.10);
  const [nextEntryStep, setNextEntryStep] = useState(0.5);
  const [marginType, setMarginType] = useState("ISOLATED");
  const [capitalSteps, setCapitalSteps] = useState("");


  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = JSON.stringify({
        "trade": {
          "market": market,
          "leverage": leverage,
          "trading_periods": "15m",
          "margin_type": marginType,
          "take_profit": takeProfit,
          "stop_loss": stopLoss,
          "next_entry_step": nextEntryStep,
          "capital_steps": [
            50,
            100,
            150,
            200,
            250,
            300
          ]
        },
        "test_net": true
      })
      console.log("Payload - ", data)

      let res = await fetch(FORM_ENDPOINT + "start", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: data,
      });
      let resJson = await res.json();
      console.log(resJson)
      if (res.status === 200) {
        setMessage(resJson.message);
      } else {
        setMessage(resJson.message);
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="App">

      <Typography variant="h5">Binance BOT</Typography>

      <form  onSubmit={handleSubmit}>
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="select-market">Market</InputLabel>
          <Select
            labelId="select-market"
            id="select-market"
            value={market}
            label="Market"
            style={{ width: "300px", margin: "20px" }}
            onChange={(e) => setMarket(e.target.value)}
          >
            <MenuItem value="BNBUSDT">BNBUSDT</MenuItem>
            <MenuItem value="BTCUSDT">BTCUSDT</MenuItem>
            <MenuItem value="ETHUSDT">ETHUSDT</MenuItem>
          </Select>
        </FormControl>
        <br />

        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="select-margin-type">Margin Type</InputLabel>
          <Select
            labelId="select-margin-type"
            id="select-margin-type"
            value={marginType}
            label="Margin Type"
            style={{ width: "300px", margin: "20px" }}
            onChange={(e) => setMarginType(e.target.value)}
          >
            <MenuItem value="ISOLATED">ISOLATED</MenuItem>
            <MenuItem value="CROSSED">CROSSED</MenuItem>
          </Select>
        </FormControl>
        <br />

        <TextField
          style={{ width: "300px", margin: "20px" }}
          type="text"
          label="Leverage"
          variant="outlined"
          defaultValue={leverage}
          value={leverage}
          onChange={(e) => setLeverage(e.target.value)}
        />
        <br />
        <TextField
          style={{ width: "300px", margin: "20px" }}
          type="text"
          label="Take Profit"
          variant="outlined"
          defaultValue={takeProfit}
          value={takeProfit}
          onChange={(e) => setTakeProfit(e.target.value)}
        />
        <br />
        <TextField
          style={{ width: "300px", margin: "20px" }}
          type="text"
          label="Stop Loss"
          variant="outlined"
          defaultValue={stopLoss}
          value={stopLoss}
          onChange={(e) => setStopLoss(e.target.value)}
        />
        <br />
        <TextField
          style={{ width: "300px", margin: "20px" }}
          type="text"
          label="Next Entry Step"
          variant="outlined"
          defaultValue={nextEntryStep}
          value={nextEntryStep}
          onChange={(e) => setNextEntryStep(e.target.value)}
        />
        <br />

        <Button variant="contained" color="primary" type="Submit">
          Start Bot
        </Button>
        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}
