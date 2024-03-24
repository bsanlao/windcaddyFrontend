import React, {useEffect, useState} from 'react';
import { getCondition, saveCondition } from "../../api/getConditionToLabel"
import { ConditionToLabel } from "../../constants"

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
import MapWithMarker from "../../api/googleMaps";



const spots = [
    { id: 1, lat: 27.821239, lng: -15.423346 },
    { id: 2, lat: 27.813116, lng: -15.42223 },
    { id: 3, lat: 27.794136, lng: -15.472097 },
    { id: 4, lat: 27.781702, lng: -15.517148 },
    { id: 5, lat: 27.775931, lng: -15.528585 },
    { id: 6, lat: 27.741885, lng: -15.568399 },
    { id: 7, lat: 27.7352, lng: -15.59741 },
    { id: 8, lat: 28.103746, lng: -15.712681 },
    { id: 9, lat: 28.158433, lng: -15.665174 },
    { id: 10, lat: 28.146968, lng: -15.559988 },
    { id: 11, lat: 28.028679, lng: -15.3910244 },
    { id: 12, lat: 27.9494986, lng: -15.3767923 },
    { id: 13, lat: 27.907941, lng: -15.386192 },
    { id: 14, lat: 27.89309, lng: -15.391145 },
    { id: 15, lat: 27.8896897, lng: -15.3928967 },
    { id: 16, lat: 27.847972, lng: -15.412712 },
    { id: 17, lat: 27.76587, lng: -15.552548 }
];


const getLocationById = (id: number | undefined) => {
    const location = spots.find(item => item.id === id);
    return location ? { lat: location.lat, lng: location.lng } : null;
};


// Transforma grados a punto cardinal
function gradosACardinal(grados: number | undefined): string {
    if (grados === undefined) {
        return ''; //
    }
    grados = (grados + 360) % 360;
    const direcciones = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO', 'N'];
    const index = Math.round(grados / 45) % 8;
    return direcciones[index];
}

const windSails = [3.0, 3.3, 3.5, 3.7, 4.0, 4.2, 4.5, 4.7, 5.0, 5.5, 6.0, 6.5];
const windBoards = [60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120];
/*const valoration = [1,2,3,4,5]*/
const valoration = [
    {id: 1, desc: "Ni me tiro"},
    {id: 2, desc:"Al menos me mojé"},
    {id: 3, desc:"Buen baño"},
    {id: 4, desc:"Bañazo!"},
    {id: 5, desc:"Para Pro's e insensatos!"}
]

export default function WeatherCondition() {
    const formDataString = localStorage.getItem("formularioDatos");
    const formData = formDataString ? JSON.parse(formDataString) : null;
    const [condition, setCondition] =
        useState<ConditionToLabel>();
    const [selectedWindSail, setSelectedWindSail] = useState("");
    const [selectedWindBoard, setSelectedWindBoard] = useState("");
    const [selectedValoration, setSelectedValoration] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const location = getLocationById(condition?.idSpot);
    const latitude = location?.lat ?? 0; // Valor predeterminado 0 si la latitud es undefined
    const longitude = location?.lng ?? 0; // Valor predeterminado 0 si la longitud es undefined
    const spot = condition?.spot ?? '';

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
                    console.log('Nuevas condiciones cargadas.', response);
                    console.log(formData.peso);
                    console.log(formData.nivel);
                    setCondition(response)
                    setSelectedValoration("");
                    setSelectedWindBoard("");
                    setSelectedWindSail("");
                } else {
                    console.error("La respuesta de getCondition() es undefined");
                }
            }).catch(error => {
                console.error("Error al obtener las nuevas condiciones:", error);
            });

        } else {
            console.error('Error al guardar la condición:', saveResponse.response?.statusText);
        }
        setButtonDisabled(true);
    };


    return (
        <div>


            <Grid container justifyContent="center">
                <Grid item xs={12} sm={10} md={8} lg={6}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={2}>
                                        <MapWithMarker latitude={latitude} longitude={longitude} spot={spot}/>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={2} align={"center"}>
                                        Introduce el material que usarías en el spot y condiciones.<br />
                                        La Valoración debe ser para la modalidad de {condition?.modalidad}<br />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell align="left">
                                        <b>Spot: {condition?.spot}</b><br />
                                        {formData.deporte} / {formData.peso} Kg / {formData.nivel}
                                    </TableCell>
                                    <TableCell align="center"><b>Material</b></TableCell>
                                </TableRow>
                          </TableHead>
                            <TableBody>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell style={{width: '65%'}} component="th" scope="row" align="left"
                                               valign="top">
                                        <b>Condiciones: </b><br/>
                                        Viento: {condition?.velocidadViento} nudos <br/>
                                        Racha de Viento: {condition?.racha} nudos<br/>
                                        Dirección del Viento: {condition?.direccionViento} grados
                                        [ {gradosACardinal(condition?.direccionOleaje)} ]<br/>
                                        Altura Oleaje: {condition?.alturaOleaje} m<br/>
                                        Periodo Medio del Oleaje: {condition?.periodoMedioOleaje} s <br/>
                                        Periodo Pico del Oleaje: {condition?.periodoPicoOleaje} s<br/>
                                        Dirección del Oleaje: {condition?.direccionOleaje} grados
                                        [ {gradosACardinal(condition?.direccionOleaje)} ]<br/>
                                    </TableCell>
                                    <TableCell align="center" style={{width: '35%'}}>
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
                                                {valoration.map((item) => (
                                                    <MenuItem key={item.id} value={item.id}>{item.desc}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={2}>
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
