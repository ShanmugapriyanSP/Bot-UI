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
    Paper,
    Snackbar
} from "@material-ui/core";
import { Alert } from "@material-ui/lab"
import { useState, useEffect } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import RefreshIcon from '@mui/icons-material/Refresh';

const FORM_ENDPOINT = "http://localhost:5000/trade/"

function RunningStatus(props) {

    const [runningBots, setRunningBots] = useState([]);
    const [runningStatusMessage, setRunningStatusMessage] = useState("")
    const [deleteMessage, setDeleteMessage] = useState("")
    const [open, setOpen] = useState(true);

    const fetchData = async () => {
        let res = await fetch(FORM_ENDPOINT + "check", {
            method: "GET",
        });
        let resJson = await res.json();
        if (resJson.bots.length > 0) {
            setRunningBots(resJson.bots)
            setRunningStatusMessage("")
        }
        else {
            setRunningStatusMessage(resJson.message)
            setRunningBots([])
        }
    }

    useEffect(() => {
        fetchData();
    }, [props.triggerMessage, deleteMessage])

    function handleRefresh() {
        fetchData();
        setOpen(true);
        setDeleteMessage("");
    }

    let handleStop = async (market, region) => {
        try {

            let res = await fetch(FORM_ENDPOINT + "stop?market=" + market + "&region=" + region, {
                method: "DELETE",
            });
            let resJson = await res.json();
            if (res.status === 200) {
                setDeleteMessage(resJson.message);
            } else {
                setDeleteMessage(resJson.message);
            }
        } catch (err) {
            console.log(err);
        }
        setOpen(true);
    };

    return (
        <>
            <Grid item xs={12} sm={6}>
                <Card variant="outlined" style={{ width: "80%", height: "100%" }}>
                    <CardContent>
                        <Typography variant="h5">Bot Status</Typography>
                        <br />
                        <Button sx={{ marginLeft: "auto" }}                            
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => handleRefresh()}
                            endIcon={<RefreshIcon />}>
                            Refresh
                        </Button>
                        <br />
                        {
                            runningBots.length > 0 &&
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Futures</TableCell>
                                            <TableCell align="center">Region</TableCell>
                                            <TableCell align="center">Status</TableCell>
                                            <TableCell align="center">Action</TableCell>
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
                                                <TableCell align="center">{bot.region}</TableCell>
                                                <TableCell align="center">{bot.status}</TableCell>
                                                <TableCell align="center">
                                                    <Button
                                                        type="button"
                                                        variant="contained"
                                                        color="secondary"
                                                        disabled={bot.status !== "RUNNING"}
                                                        onClick={() => handleStop(bot.market, bot.region)}
                                                        size="small"
                                                        endIcon={<CancelIcon />}>
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
            <div className="trigger-message">
                {
                    deleteMessage ?                    
                        <Snackbar autoHideDuration={6000} open={open} onClose={() => setOpen(false)}>
                            <Alert severity="error" sx={{ width: '100%' }}>
                                {deleteMessage}
                            </Alert>
                        </Snackbar>
                        : null
                }
            </div>
        </>
    )
}

export default RunningStatus;