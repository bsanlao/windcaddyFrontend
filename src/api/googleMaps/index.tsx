import React, { useEffect, useRef } from 'react';
import {GOOGLE_API_KEY} from "../index";

interface Props {
    latitude: number;
    longitude: number;
    spot?: string; // Hacer spot opcional
}

const MapWithMarker: React.FC<Props> = ({ latitude, longitude, spot }) => {
    const mapRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const loadGoogleMapsScript = () => {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`;
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
            script.onload = initializeMap;
        };

        const initializeMap = () => {
            if (!mapRef.current || !window.google || !window.google.maps) return;

            const map = new window.google.maps.Map(mapRef.current, {
                center: { lat: 27.967880495702683, lng: -15.599970759198115 },
                zoom: 9,
            });

            new window.google.maps.Marker({
                position: { lat: latitude, lng: longitude },
                map: map,
                title: spot || 'Punto de interés', // Usar el valor de spot si está definido, de lo contrario, usar 'Punto de interés'
            });
        };

        if (!window.google || !window.google.maps) {
            loadGoogleMapsScript();
        } else {
            initializeMap();
        }
    }, [latitude, longitude, spot]);

    return <div ref={mapRef} style={{ width: '100%', height: '400px' }}></div>;
};

export default MapWithMarker;


