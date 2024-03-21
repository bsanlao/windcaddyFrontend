import React, {useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import { getCondition } from "../../api/getConditionToLabel"
import { ConditionToLabel } from "../../constants";
import {
    Button,
    Grid,
    Link,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";


export default function WeatherCondition() {
    // Leer los datos del localStorage
    const formDataString = localStorage.getItem("formularioDatos");
    const formData = formDataString ? JSON.parse(formDataString) : null;
    const [condition, setCondition] =
        useState<ConditionToLabel>();

    useEffect(() => {
        getCondition().then((response) => {
            setCondition(response);
        })
    }, [setCondition]);

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                {formData ? (
                    <>
                        {formData.deporte} / {formData.peso} Kg / {formData.nivel}
                    </>
                ) : (
                    "No hay datos disponibles"
                )}
            </Typography>
            <Grid container spacing={2}>
                <Grid display="flex" alignItems="end" item xs={8} >
                    <Typography sx={{
                        lineHeight: '1'
                    }} variant="h6">
                        Listado de usuarios
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Condiciones</TableCell>
                                    <TableCell>Material</TableCell>
                                    <TableCell>Valoración</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        Spot: {condition?.spot}<br/>
                                        Altura Oleaje: {condition?.alturaOleaje}<br/>
                                        Viento (knots): {condition?.velmedia}<br/>
                                    </TableCell>
                                    <TableCell component="th" scope="row"></TableCell>
                                    <TableCell component="th" scope="row"></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    );
}
