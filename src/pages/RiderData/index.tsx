import React, { ChangeEvent, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

import {
    Box, Button,
    CardActions,
    CardHeader,
    FormControl,
    Grid, InputLabel,
    Paper, Select,
    TextField
} from '@mui/material';

const deportes = ["Windsurf", "Kitesurf", "Wingfoil"];
const nivel = ["Novel [<2 años]", "Avanzado [>2 años]", "Pro"];

export default function RiderData() {
    const navigate = useNavigate();
    const [selectedDeporte, setSelectedDeporte] = useState("");
    const [selectedNivel, setSelectedNivel] = useState("");
    const [peso, setPeso] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        // Verificar si todos los campos tienen valores
        if (selectedDeporte !== "" && selectedNivel !== "" && peso !== "") {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [selectedDeporte, selectedNivel, peso]);

    const handleDeporteChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedDeporte(event.target.value);
    };

    const handleNivelChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedNivel(event.target.value);
    };

    const handlePesoChange = (event: { target: { value: any; }; }) => {
        const value = event.target.value;
        // Validar que el valor esté dentro del rango de 0 a 120
        if (value >= 0 && value <= 120) {
            setPeso(value);
        } else {
            alert("El peso no puede ser superior a 120 Kg.")
        }
    };

    const handleGuardarDatos = () => {
        // Guardar los datos en el localStorage
        localStorage.setItem("formularioDatos", JSON.stringify({
            deporte: selectedDeporte,
            nivel: selectedNivel,
            peso: peso
        }));

        // Redirigir al usuario a /weathercondition
        navigate("/weathercondition");
    };

    return (
        <Box sx={{ maxWidth: 500 }}>
            <Card variant="outlined">
                <CardHeader
                    sx={{ textAlign: 'center' }}
                    title="Inserta tus datos"
                />
                <CardContent sx={{ padding: '0 16px' }}>
                    <Grid container spacing={2}>
                        <Grid item md={12}>
                            <FormControl fullWidth>
                                <TextField
                                    id="Peso"
                                    label="Cuánto pesas?"
                                    type={"number"}
                                    value={peso}
                                    onChange={handlePesoChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item md={12}>
                            <FormControl fullWidth>
                                <InputLabel id="deportes-label">Cuál es tu deporte?</InputLabel>
                                <Select
                                    labelId="deportes-label"
                                    id="deportes-select"
                                    value={selectedDeporte}
                                    onChange={handleDeporteChange}
                                >
                                    {deportes.map((deporte, index) => (
                                        <MenuItem key={index} value={deporte} disabled={deporte !== "Windsurf"}>
                                            {deporte}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={12}>
                            <FormControl fullWidth>
                                <InputLabel id="nivel-label">Cuál es tu nivel?</InputLabel>
                                <Select
                                    labelId="nivel-label"
                                    id="nivel-select"
                                    value={selectedNivel}
                                    onChange={handleNivelChange}
                                >
                                    {nivel.map((nivel, index) => (
                                        <MenuItem key={index} value={nivel}>{nivel}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "flex-start",
                        padding: '16px',
                    }}
                >
                    <Button variant="contained"
                            color="primary"
                            onClick={handleGuardarDatos}
                            disabled={buttonDisabled}>Comenzar a valorar!</Button>
                </CardActions>
            </Card>
        </Box>
    );
};
