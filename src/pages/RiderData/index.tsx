import React, { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

import {
    Button,
    FormControl,
    Grid, InputLabel,
    Select,
    TextField
} from '@mui/material';
import Typography from "@mui/material/Typography";

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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" gutterBottom align="center">
                Introduce tus datos
            </Typography>
            <Grid container maxWidth={500} spacing={2} justifyContent={"center"} alignItems={"center"} >
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
                            label="Cuál es tu deporte?"
                            onChange={handleDeporteChange}
                        >
                            {deportes.map((deporte, index) => (
                                <MenuItem key={deporte} value={deporte}>{deporte}</MenuItem>
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
                            label="Cuál es tu nivel?"
                            onChange={handleNivelChange}
                        >
                            {nivel.map((nivel, index) => (
                                <MenuItem key={index} value={nivel}>{nivel}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={12}>
                    <Button variant="contained"
                            color="primary"
                            onClick={handleGuardarDatos}
                            disabled={buttonDisabled}>Comenzar a valorar!</Button>
                </Grid>
            </Grid>
        </div>
    );
};
