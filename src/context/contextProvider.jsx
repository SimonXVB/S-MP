import { useState } from "react";
import { mainContext } from "./context";

export function MainContextProvider({ children }) {
    const [tabInfo, setTabInfo] = useState({
        currentTab: "videos",
        currentCollection: ""
    });

    const [searchValue, setSearchValue] = useState("");
    const [mediaSrc, setMediaSrc] = useState([]);

    return (
        <mainContext.Provider value={{ setTabInfo, tabInfo, setMediaSrc, mediaSrc, setSearchValue, searchValue }}>
            { children }
        </mainContext.Provider>
    )
};