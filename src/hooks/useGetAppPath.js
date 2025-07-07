import { useState } from "react";

export function useGetAppPath() {
    const [appPath, setAppPath] = useState("");

    async function getAppPath() {
        setAppPath(await window.utils.getAppPath());
    };

    return { getAppPath, appPath }
};