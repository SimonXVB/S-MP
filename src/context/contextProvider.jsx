import { useState } from "react";
import { mainContext } from "./context";

export function MainContextProvider({ children }) {
    const [tabInfo, setTabInfo] = useState({
        currentTab: "collectionsTab",
        currentDir: "videos",
        currentCollection: ""
    });

    const [mediaData, setMediaData] = useState({
        sourceIndex: null,
        sources: []
    });

    const [searchValue, setSearchValue] = useState("");
    const [error, setError] = useState("");

    return (
        <mainContext.Provider value={{ setTabInfo, tabInfo, setMediaData, mediaData, setSearchValue, searchValue, setError, error }}>
            { children }
        </mainContext.Provider>
    )
};