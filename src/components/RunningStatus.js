import {
    Typography,
    Button,
    Card,
    CardContent,
    Grid,
    TableContainer,
    Table,
    TableCell,
    TableRow,
    TableHead,
    TableBody,
    Paper
} from "@material-ui/core";

import { useState, useEffect } from "react";
import CancelIcon from '@mui/icons-material/Cancel';

const FORM_ENDPOINT = "http://localhost:5000/trade/"

function RunningStatus(props) {

    const [runningBots, setRunningBots] = useState([]);
    const [runningStatusMessage, setRunningStatusMessage] = useState("")
    const [message, setMessage] = useState("")

    useEffect(() => {
        (async () => {
            let res = await fetch(FORM_ENDPOINT + "check", {
                method: "GET",
            });
            let resJson = await res.json();
            console.log(resJson);
            if (resJson.bots.length > 0) {
                setRunningBots(resJson.bots)
                setRunningStatusMessage("")
            }
            else {
                setRunningStatusMessage(resJson.message)
                setRunningBots([])
            }
        })();        
    }, [props.triggerMessage])


    let handleStop = async (market) => {
        // e.preventDefault();
        try {

            let res = await fetch(FORM_ENDPOINT + "stop/" + market, {
                method: "DELETE",
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
        <Grid item xs={12} sm={6}>
            <Card variant="outlined" style={{ width: "70%", height: "100%" }}>
                <CardContent>
                    <Typography variant="h5">Running Status</Typography>
                    <br />
                    {
                        runningBots.length > 0 &&
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Futures</TableCell>
                                        <TableCell align="center">Region</TableCell>
                                        <TableCell align="center">Cancel</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {runningBots.map(bot => (
                                        <TableRow
                                            key={bot.market}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {bot.market}
                                            </TableCell>
                                            <TableCell align="center">{bot.test_net ? "Test Net" : "Live"}</TableCell>
                                            <TableCell align="center">
                                                <Button type="button" variant="contained" color="secondary" onClick={() => handleStop(bot.market)} size="small" endIcon={<CancelIcon />}>
                                                    Stop Bot
                                                </Button>
                                            </TableCell>
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
    )
}

export default RunningStatus;