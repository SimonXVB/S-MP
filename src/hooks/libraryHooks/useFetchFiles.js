import { useState } from "react";

export function useFetchFiles() {
    const [media, setMedia] = useState([]);

    async function fetchMedia(type, dir) {
        const data = await window.FS.readDir(dir);
        
        if(type === "videos") {
            setMedia(data.filter((e) => {
                if(e.endsWith(".mp4") || e.endsWith(".webm") || e.endsWith(".ogg")) {
                    return e
                };
            }));
        } else if(type === "audio") {
            setMedia(data.filter((e) => {
                if(e.endsWith(".mp3") || e.endsWith(".wav") || e.endsWith(".ogg")) {
                    return e
                };
            }));
        };
    };

    return { fetchMedia, setMedia, media }
};