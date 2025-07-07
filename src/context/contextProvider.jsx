import { useState } from "react";
import { mainContext } from "./context";

export function MainContextProvider({ children }) {
    const [current, setCurrent] = useState("videos");
    const [mediaSrc, setMediaSrc] = useState([]);

    return (
        <mainContext.Provider value={{ setCurrent, current, setMediaSrc, mediaSrc }}>
            { children }
        </mainContext.Provider>
    )
};