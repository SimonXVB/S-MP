import { useState } from "react";

export function useFetchVideos() {
    const [videos, setVideos] = useState([]);

    async function fetchVideos() {
        setVideos(await window.FS.readVideoDir());
    };

    return { fetchVideos, videos, setVideos };
};