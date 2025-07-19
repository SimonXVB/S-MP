import { useState } from "react";
import { mainContext } from "./context";

export function MainContextProvider({ children }) {
    const [current, setCurrent] = useState("videos");
    const [searchValue, setSearchValue] = useState("");
    const [mediaSrc, setMediaSrc] = useState([]);

    return (
        <mainContext.Provider value={{ setCurrent, current, setMediaSrc, mediaSrc, setSearchValue, searchValue }}>
            { children }
        </mainContext.Provider>
    )
};