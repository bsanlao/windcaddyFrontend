import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import WeatherCondition from "./pages/WeatherCondition";
import RiderData from "./pages/RiderData";
import Test from "./pages/Test"

const App: React.FC = () => {
    return (
        <Router>
            <Container>
                <Routes>
                    <Route path="/" element={<RiderData />} />
                    <Route path="/weathercondition" element={<WeatherCondition />} />
                    <Route path="/test" element={<Test />} />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;
