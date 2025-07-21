import { useState } from "react";
import { mainContext } from "./context";

export function MainContextProvider({ children }) {
    const [tabInfo, setTabInfo] = useState({
        currentTab: "collectionsTab",
        currentDir: "videos",
        currentCollection: ""
    });

    const [mediaSources, setMediaSources] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [error, setError] = useState("");

    return (
        <mainContext.Provider value={{ setTabInfo, tabInfo, setMediaSources, mediaSources, setSearchValue, searchValue, setError, error }}>
            { children }
        </mainContext.Provider>
    )
};