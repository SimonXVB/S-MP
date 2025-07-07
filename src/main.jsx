import { useContext, useEffect } from "react";
import { mainContext } from "./context/context";
import { Navbar } from "./components/mainUI/navbar";
import { Media } from "./components/mainUI/media";
import { VideoPlayer } from "./components/players/videoPlayer";
import { AudioPlayer } from "./components/players/audioPlayer";

export function Main() {
    const { current, mediaSrc } = useContext(mainContext);

    useEffect(() => {
        async function createDir() {
            window.utils.createMediaDir();  
        };
        createDir();
    }, []);

    return (
        <>
            <Navbar/>
            {current === "videos" && <Media dir={"videos"}/>}
            {current === "audio" && <Media dir={"audio"}/>}
            {current === "playingVideo" && <VideoPlayer src={mediaSrc} />}
            {current === "playingAudio" && <AudioPlayer src={mediaSrc} />}
        </>
    );
};