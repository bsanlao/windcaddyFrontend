import React, {useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import { getCondition, saveCondition } from "../../api/getConditionToLabel"
import { ConditionToLabel } from "../../constants";
import {
    Button, FormControl,
    Grid, InputLabel,
    Paper, Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

function gradosACardinal(grados: number | undefined): string {
    if (grados === undefined) {
        return ''; // O devuelve lo que sea apropiado en tu caso
    }

    // Asegurarse de que el ángulo esté dentro del rango [0, 360)
    grados = (grados + 360) % 360;

    // Definir los rangos para cada componente cardinal
    const direcciones = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO', 'N'];
    const index = Math.round(grados / 45) % 8;

    return direcciones[index];
}

interface Props {
    grados?: number; // Hacer el grado opcional con '?'
}

const windSails = [3.0, 3.3, 3.5, 3.7, 4.0, 4.2, 4.5, 4.7, 5.0, 5.5, 6.0, 6.5];
const windBoards = [60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120];
const valoration = [1,2,3,4,5];

export default function WeatherCondition() {
    // Leer los datos del localStorage

    const formDataString = localStorage.getItem("formularioDatos");
    const formData = formDataString ? JSON.parse(formDataString) : null;
    const [condition, setCondition] =
        useState<ConditionToLabel>();
    const [selectedWindSail, setSelectedWindSail] = useState("");
    const [selectedWindBoard, setSelectedWindBoard] = useState("");
    const [selectedValoration, setSelectedValoration] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const handleValorationChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedValoration(event.target.value);
    };

    const handleWindSailChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedWindSail(event.target.value);
    };

    const handleWindBoardChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedWindBoard(event.target.value);
    };

    useEffect(() => {
        getCondition().then((response) => {
            if (response) {
                setCondition(response);
            } else {
                console.error("La respuesta de getCondition() es undefined");
            }
        }).catch(error => {
            console.error("Error al obtener la condición:", error);
        });
    }, [setCondition]);

    useEffect(() => {
        // Verificar si los valores de Vela, Tabla y Valoración están cumplimentados
        if (selectedWindSail !== "" && selectedWindBoard !== "" && selectedValoration !== "") {
            setButtonDisabled(false); // Habilitar el botón si los valores están presentes
        } else {
            setButtonDisabled(true); // Deshabilitar el botón si los valores no están presentes
        }
    }, [selectedWindSail, selectedWindBoard, selectedValoration]);


    const handleGuardarDatos = async () => {
        const editedCondition: ConditionToLabel = {
            id: condition?.id || 0,
            idSpot: condition?.idSpot || 0,
            spot: condition?.spot || '',
            fecha: condition?.fecha || '',
            dir: condition?.dir || '',
            velmedia: condition?.velmedia || 0,
            racha: condition?.racha || 0,
            alturaOleaje: condition?.alturaOleaje || 0,
            periodoMedioOleaje: condition?.periodoMedioOleaje || 0,
            periodoPicoOleaje: condition?.periodoPicoOleaje || 0,
            direccionOleaje: condition?.direccionOleaje || 0,
            velocidadViento: condition?.velocidadViento || 0,
            direccionViento: condition?.direccionViento || 0,
            velocidadCorriente: condition?.velocidadCorriente || 0,
            direccionCorriente: condition?.direccionCorriente || 0,
            idDeporte: condition?.idDeporte || 0,
            deporte: condition?.deporte || '',
            idModalidad: condition?.idModalidad || 0,
            modalidad: condition?.modalidad || '',
            valoracion: selectedValoration ? parseInt(selectedValoration) : 0,
            perfilRider: formData.nivel,
            pesoRider: parseFloat(formData.peso),
            kiteSize: 0,
            sailSize: parseFloat(selectedWindSail),
            wingSize: 0,
            kiteBoardSize: 0,
            kiteBoardType: '',
            windBoardSize: parseInt(selectedWindBoard),
            windBoardType: '',
            wingBoardSize: 0,
            wingFfoilSize: 0,
            labeled: true
        };



        const saveResponse = await saveCondition(editedCondition);
        if (saveResponse.success) {
            console.log('Condición guardada exitosamente:', saveResponse.response);

            getCondition().then((response) => {
                if (response) {
                    console.log('Otras condiciones cargadas exitosamente:', response);
                    console.log(formData.peso);
                    console.log(formData.nivel);
                    /*window.location.reload();*/
                } else {
                    console.error("La respuesta de getCondition() es undefined");
                }
            }).catch(error => {
                console.error("Error al obtener las otras condiciones:", error);
            });

        } else {
            console.error('Error al guardar la condición:', saveResponse.response?.statusText);
        }
        setButtonDisabled(true);
    };


    return (
        <div>
            <Typography variant="h4" gutterBottom align="center">
                {formData ? (
                    <>
                        {formData.deporte} <br />
                        {formData.peso} Kg / {formData.nivel}
                    </>
                ) : (
                    "No hay datos disponibles"
                )}
            </Typography>

            <Grid container justifyContent="center">
                <Grid item xs={12} sm={10} md={8} lg={6}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left"><b>Condiciones</b></TableCell>
                                    <TableCell align="center"><b>Material</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row" align="left">
                                        Id: {condition?.id}<br/>
                                        <b>Spot: {condition?.spot}</b><br/>
                                        Viento medio: {condition?.velmedia} nudos<br/>
                                        Racha de Viento: {condition?.racha} nudos<br/>
                                        Dirección del Viento: {condition?.direccionViento} grados [ {gradosACardinal(condition?.direccionOleaje)} ]<br/>
                                        Altura Oleaje: {condition?.alturaOleaje} m<br/>
                                        Periodo Medio del Oleaje: {condition?.periodoMedioOleaje} s<br/>
                                        Periodo Pico del Oleaje: {condition?.periodoPicoOleaje} s<br/>
                                        Dirección del Oleaje: {condition?.direccionOleaje} grados [ {gradosACardinal(condition?.direccionOleaje)} ]<br/>
                                    </TableCell>
                                    <TableCell align="center">
                                        <FormControl fullWidth sx={{ marginBottom: '10px' }}>
                                            <InputLabel id="windsail-label">Vela (m2)</InputLabel>
                                            <Select
                                                labelId="windsail-label"
                                                id="windsail-select"
                                                value={selectedWindSail}
                                                label="Vela (m2)"
                                                onChange={handleWindSailChange}
                                            >
                                                {windSails.map((sail, index) => (
                                                    <MenuItem key={index} value={sail}>{sail}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <FormControl fullWidth sx={{ marginBottom: '10px' }}>
                                            <InputLabel id="windboard-label">Tabla (L)</InputLabel>
                                            <Select
                                                labelId="windboard-label"
                                                id="windboard-select"
                                                value={selectedWindBoard}
                                                label="Tabla (L)"
                                                onChange={handleWindBoardChange}
                                            >
                                                {windBoards.map((board, index) => (
                                                    <MenuItem key={index} value={board}>{board}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <FormControl fullWidth sx={{ marginBottom: '10px' }}>
                                            <InputLabel id="valoration-label">Valoración</InputLabel>
                                            <Select
                                                labelId="valoration-label"
                                                id="valoration-select"
                                                value={selectedValoration}
                                                label="Valoración"
                                                onChange={handleValorationChange}
                                            >
                                                {valoration.map((valoration, index) => (
                                                    <MenuItem key={index} value={valoration}>{valoration}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <FormControl fullWidth sx={{ marginBottom: '10px' }}>
                                            <Button variant="contained"
                                                    color="primary"
                                                    onClick={handleGuardarDatos}
                                                    disabled={buttonDisabled}
                                                    >Siguiente</Button>
                                        </FormControl>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    );
}
