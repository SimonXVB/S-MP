import { useState } from "react";

export function useAppPath() {
    const [appPath, setAppPath] = useState("");

    async function getAppPath() {
        setAppPath(await window.utils.getAppPath());
    };

    return { getAppPath, appPath }
};