import React, { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

import {
    Button,
    FormControl,
    Grid, InputLabel, Paper,
    Select, Table, TableBody, TableCell, TableContainer, TableRow,
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
    const [edad, setEdad] = useState("");
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

    const handleEdadChange = (event: { target: { value: any; }; }) => {
        const value = event.target.value;
        // Validar que el valor esté dentro del rango de 0 a 120
        if (value >= 0 && value <= 120) {
            setEdad(value);
        } else {
            alert("La edad no puede ser superior a 120 años.")
        }
    };
    const handleGuardarDatos = () => {
        // Guardar los datos en el localStorage
        localStorage.setItem("formularioDatos", JSON.stringify({
            deporte: selectedDeporte,
            nivel: selectedNivel,
            peso: peso,
            edad: edad
        }));

        // Redirigir al usuario a /weathercondition
        navigate("/weathercondition");
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={10} md={8} lg={6}>
            <img src={process.env.PUBLIC_URL + '/logoUOC.png'} style={{ maxWidth: '100%', height: 'auto' }}
                 alt="Universitat Oberta de Catalunya"/>
                </Grid></Grid>
            <Typography variant="h4" gutterBottom align="center">
                Introduce tus datos
            </Typography>

            <Grid container justifyContent="center">
                <Grid item xs={12} sm={10} md={8} lg={6}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        Los datos introducidos serán usado para mi TFG que consiste en
                                        desarrollar un algoritmo que dada unas condiciones meteorológicas sea capaz
                                        de ofrecer una recomendación sobre el material a utilizar según tu peso y
                                        condiciones.<br/><br/>
                                        Te pediría que seas un poco riguroso con los datos introducidos ya que de ellos
                                        dependerá en gran medida la eficacia y utilidad del algoritmo.
                                        <br/><br/>
                                        Gracias por tu colaboración!
                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                    <TableCell component="th" scope="row" align="left" valign="top">
                                        <FormControl fullWidth>
                                            <TextField
                                                id="Edad"
                                                label="Qué edad tienes?"
                                                type={"number"}
                                                value={edad}
                                                onChange={handleEdadChange}
                                            />
                                        </FormControl>
                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                    <TableCell component="th" scope="row" align="left" valign="top">
                                        <FormControl fullWidth>
                                            <TextField
                                                id="Peso"
                                                label="Cuánto pesas?"
                                                type={"number"}
                                                value={peso}
                                                onChange={handlePesoChange}
                                            />
                                        </FormControl>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
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
                                                    <MenuItem key={deporte} value={deporte}
                                                              disabled={deporte !== "Windsurf"}>{deporte}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
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
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{border: 0}}>
                                        <Button variant="contained"
                                                color="primary"
                                                onClick={handleGuardarDatos}
                                                disabled={buttonDisabled}>Comenzar a valorar!</Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    );
};
