import { useContext, useEffect } from "react";
import { mainContext } from "./Context/context";
import { Navbar } from "./components/Navbar";
import { MediaTab } from "./components/MediaTabComps/MediaTab";
import { VideoPlayer } from "./Components/PlayerComps/VideoPlayer";
import { AudioPlayer } from "./Components/PlayerComps/AudioPlayer";

export function Main() {
    const { current, mediaSrc } = useContext(mainContext);

    useEffect(() => {
        async function createDir() {
            window.utils.createMediaDir();  
        };
        createDir();
    }, []);

    return (
        <div className="h-screen flex flex-col">
            <Navbar/>
            {current === "videos" && <MediaTab/>}
            {current === "audio" && <MediaTab/>}
            {current === "playingVideo" && <VideoPlayer src={mediaSrc}/>}
            {current === "playingAudio" && <AudioPlayer src={mediaSrc}/>}
        </div>
    );
};