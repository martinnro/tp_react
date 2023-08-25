import React, {useEffect} from "react";
import {
    Grid,
    Paper,
    Box,
    Card,
    CardContent,
    Typography,
    IconButton
}   from '@mui/material';
import { Link } from 'react-router-dom'; 
import { Assignment, EventNote, ArrowForward as ArrowForwardIcon, AssignmentTurnedIn, AssignmentLate} from '@mui/icons-material';

import { useSelector } from "react-redux";
import { appSelector } from "../../redux/appRedux";

const Dashboard = () => {
    const todo = useSelector(appSelector.todo)
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Box display="flex" alignItems="center">
                            <Assignment sx={{ fontSize: 40, marginRight: 2 }} />
                            <Typography variant="h6">Todo</Typography>
                        </Box>
                    </CardContent>
                    <Link to="/todo">
                        <IconButton>
                            <ArrowForwardIcon />
                        </IconButton>
                    </Link>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Box display="flex" alignItems="center">
                            <EventNote sx={{ fontSize: 40, marginRight: 2 }} />
                            <Typography variant="h6">Fechlist</Typography>
                        </Box>
                    </CardContent>
                    <Link to="/list">
                        <IconButton>
                            <ArrowForwardIcon />
                        </IconButton>
                    </Link>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Box display="flex" alignItems="center">
                            <AssignmentTurnedIn sx={{ fontSize: 40, marginRight: 2 }} />
                            Tareas Completadas: {todo.filter(t=>t.completed).length}
                        </Box>
                    </CardContent>
                    <Link to="/todo">
                        <IconButton>
                            <ArrowForwardIcon />
                        </IconButton>
                    </Link>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Box display="flex" alignItems="center">
                            <AssignmentLate sx={{ fontSize: 40, marginRight: 2 }} />
                            Tareas Pendientes: {todo.length - todo.filter(t=>t.completed).length}
                        </Box>
                    </CardContent>
                    <Link to="/todo">
                        <IconButton>
                            <ArrowForwardIcon />
                        </IconButton>
                    </Link>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Dashboard;