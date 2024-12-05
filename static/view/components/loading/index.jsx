import React, { useEffect, useState } from "react";
import mushroom from "../../../assets/loading.svg";
import "./styles.scss";

const Loading = () => {
    const [svgString, setSvgString] = useState("");

    useEffect(() => {
        const fetchSvg = async () => {
            try {
                const response = await fetch(mushroom);
                const svgText = await response.text();
                setSvgString(svgText);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSvg();
    }, []);

    return (
        <div className="relative">
            <div className="la-ball-clip-rotate la-2x">
                <div></div>
            </div>
            <div
                className="spinner-svg la-2x"
                dangerouslySetInnerHTML={{ __html: svgString }}
            ></div>
        </div>
    );
};

export default Loading;