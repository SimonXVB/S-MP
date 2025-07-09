import { useState } from "react";

export function useFetchFiles() {
    const [media, setMedia] = useState([]);

    async function fetchMedia(dir) {
        const data = await window.FS.readDir(dir);
        
        if(dir.split("/")[0] === "videos") {
            setMedia(data.filter((e) => {
                if(e.endsWith(".mp4") || e.endsWith(".webm") || e.endsWith(".ogg")) {
                    return e
                };
            }));
        } else if(dir.split("/")[0] === "audio") {
            setMedia(data.filter((e) => {
                if(e.endsWith(".mp3") || e.endsWith(".wav") || e.endsWith(".ogg")) {
                    return e
                };
            }));
        };
    };

    return { fetchMedia, setMedia, media }
};