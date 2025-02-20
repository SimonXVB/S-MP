import { useState } from "react";

export function useFetch() {
    const [media, setMedia] = useState([]);

    async function fetchMedia(media) {
        if(media === "video") {
            setMedia(await window.FS.readVideoDir());
        } else if(media === "audio") {
            setMedia(await window.FS.readAudioDir());
        };
    };

    return { fetchMedia, setMedia, media }
};