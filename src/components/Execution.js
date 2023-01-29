import {
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
    Snackbar
} from "@material-ui/core";
import { Alert } from "@material-ui/lab"
import { useStyles } from "../Utils";
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
import RunningStatus from "./RunningStatus";

const FORM_ENDPOINT = "http://localhost:5000/trade/"

function Execution() {

    const classes = useStyles();
    const [message, setMessage] = useState("");
    const [market, setMarket] = useState("BNBUSDT");
    const [leverage, setLeverage] = useState(50);
    const [takeProfit, setTakeProfit] = useState(0.5);
    const [stopLoss, setStopLoss] = useState(0.10);
    const [nextEntryStep, setNextEntryStep] = useState(0.5);
    const [marginType, setMarginType] = useState("ISOLATED");
    const [capitalSteps, setCapitalSteps] = useState("50,100,150,200,250,300");
    const [testNet, setTestNet] = useState(true);
    const [open, setOpen] = useState(true);


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
                    "capital_steps": capitalSteps.split(",").map((e) => parseInt(e))
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
            } else {
                setMessage(resJson.message);
            }
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <>
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
                                        color="primary"
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
                            <br />
                            <div className="trigger-message">
                                {
                                    message ?
                                        <Snackbar autoHideDuration={6000} open={open} onClose={() => setOpen(false)}>
                                            <Alert severity="success" sx={{ width: '100%' }}>
                                                {message}
                                            </Alert>
                                        </Snackbar>
                                        : null
                                }
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
            <RunningStatus triggerMessage={message} />
        </>
    )
}

export default Execution;