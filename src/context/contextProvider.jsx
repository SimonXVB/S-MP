import { useState } from "react";
import { mainContext } from "./context";

export function MainContextProvider({ children }) {
    const [tabInfo, setTabInfo] = useState({
        currentTab: "videos",
        currentCollection: ""
    });

    const [searchValue, setSearchValue] = useState("");
    const [mediaSources, setMediaSources] = useState([]);
    const [error, setError] = useState("");

    return (
        <mainContext.Provider value={{ setTabInfo, tabInfo, setMediaSources, mediaSources, setSearchValue, searchValue, setError, error }}>
            { children }
        </mainContext.Provider>
    )
};