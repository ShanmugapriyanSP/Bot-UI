import "./App.css";
import {
  Typography,
  TextField,
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Switch,
  FormControlLabel,
  Card,
  CardContent,
  Grid,
  Container,
  TableContainer,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  Paper
} from "@material-ui/core";
import { useStyles } from "./Utils";
import CancelIcon from '@mui/icons-material/Cancel';
import SendIcon from '@mui/icons-material/Send';


import * as React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';

const FORM_ENDPOINT = "http://localhost:5000/trade/"

export default function App() {

  const classes = useStyles();
  const [resetRunningStatus, setResetRunningStatus] = useState(false);
  const [message, setMessage] = useState("");


  const [market, setMarket] = useState("BNBUSDT");
  const [leverage, setLeverage] = useState(50);
  const [takeProfit, setTakeProfit] = useState(0.5);
  const [stopLoss, setStopLoss] = useState(0.10);
  const [nextEntryStep, setNextEntryStep] = useState(0.5);
  const [marginType, setMarginType] = useState("ISOLATED");
  const [capitalSteps, setCapitalSteps] = useState("50,100,150,200,250,300");
  const [testNet, setTestNet] = useState(true);
  const [runningBots, setRunningBots] = useState([]);
  const [runningStatusMessage, setRunningStatusMessage] = useState("")

  useEffect(() => {
    axios
      .get(FORM_ENDPOINT + "check")
      .then((botStatus) => {
        if (botStatus.data.bots.length > 0) {
          setRunningBots(botStatus.data.bots)
          setRunningStatusMessage("")
        }
        else {
          setRunningStatusMessage(botStatus.data.message)
          setRunningBots([])
        }
      });
      setResetRunningStatus(false)
  }, [resetRunningStatus])

  // const runningBots = [{
  //   "market": "BNBUSDT",
  //   "test_net": true
  // },
  // {
  //   "market": "ETH",
  //   "test_net": true
  // }]


  runningBots.map((bot) =>
    console.log(bot.market)
  )
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
          "capital_steps": capitalSteps
        },
        "test_net": testNet
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
        setResetRunningStatus(true)
        // setRunningStatusMessage("")
      } else {
        setMessage(resJson.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // console.log("RUNNING BOT - ", runningBots)

  return (
    <div className="App">

      <Typography variant="h5">Binance BOT</Typography>

      <Container>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="stretch"
          direction="row"
        >
          <Grid item xs={12} sm={6}>
            <Card variant="outlined" style={{ width: "100%", height: "100%" }}>
              <CardContent>

                <form onSubmit={handleSubmit}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="select-market">Market</InputLabel>
                    <Select
                      labelId="select-market"
                      id="select-market"
                      value={market}
                      label="Market"
                      onChange={(e) => setMarket(e.target.value)}
                    >
                      <MenuItem value="BNBUSDT">BNBUSDT</MenuItem>
                      <MenuItem value="BTCUSDT">BTCUSDT</MenuItem>
                      <MenuItem value="ETHUSDT">ETHUSDT</MenuItem>
                    </Select>
                  </FormControl>
                  <br />

                  <FormControl className={classes.formControl}>
                    <InputLabel id="select-margin-type">Margin Type</InputLabel>
                    <Select
                      labelId="select-margin-type"
                      id="select-margin-type"
                      value={marginType}
                      label="Margin Type"
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

                  <TextField
                    style={{ width: "300px", margin: "20px" }}
                    type="text"
                    label="Capital Entries"
                    variant="outlined"
                    defaultValue={capitalSteps}
                    value={capitalSteps}
                    onChange={(e) => setCapitalSteps(e.target.value)}
                  />
                  <br />


                  <FormControlLabel control=
                    {
                      <Switch
                        defaultChecked
                        onChange={(e) => setTestNet(e.target.value)}
                      />
                    }
                    label="Test Net" />

                  <br />
                  <br />

                  <Button variant="contained" color="primary" type="Submit" endIcon={<SendIcon />}>
                    Start Bot
                  </Button>

                  <br />

                  <div className="message">{message ? <Typography>{message}</Typography> : null}</div>
                </form>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card variant="outlined" style={{ width: "70%", height: "100%" }}>
              <CardContent>
                <Typography variant="h5">Running Status</Typography>
                <br />
                {
                  runningBots.length > 0 &&
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      {/* <TableHead>
                      <TableRow>
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                      </TableRow>
                    </TableHead> */}
                      <TableBody>
                        {runningBots.map(bot => (
                          <TableRow
                            key={bot.market}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {bot.market}
                            </TableCell>
                            <TableCell>{bot.test_net ? "Test Net" : "Live"}</TableCell>
                            <TableCell align="right">
                              <Button variant="contained" color="secondary" type="Submit" size="small" endIcon={<CancelIcon />}>
                                Stop Bot
                              </Button>
                            </TableCell>
                            {/* <TableCell align="right">{row.fat}</TableCell>
                          <TableCell align="right">{row.carbs}</TableCell>
                          <TableCell align="right">{row.protein}</TableCell> */}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                }
                {
                  <div className="runingStatusMessage">{runningStatusMessage ? <Typography>{runningStatusMessage}</Typography> : null}</div> 
                }
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
