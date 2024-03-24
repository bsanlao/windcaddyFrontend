import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import WeatherCondition from "./pages/WeatherCondition";
import RiderData from "./pages/RiderData";

const App: React.FC = () => {
    return (
        <Router>
            <Container>
                <Routes>
                    <Route path="/" element={<RiderData />} />
                    <Route path="/weathercondition" element={<WeatherCondition />} />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;
