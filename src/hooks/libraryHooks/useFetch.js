import { useState } from "react";

export function useFetch() {
    const [media, setMedia] = useState([]);

    async function fetchMedia(media) {
        if(media === "video") {
            const res = await window.FS.readVideoDir();
            setMedia(res);
        } else if(media === "audio") {
            const res = await window.FS.readAudioDir();
            setMedia(res);
        };
    };

    return { fetchMedia, setMedia, media }
};