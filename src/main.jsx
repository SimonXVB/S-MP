import { useContext, useEffect } from "react";
import { Navbar } from "./components/mainUI/navbar"
import { navCtx } from "./context/navContext";
import { Media } from "./components/mainUI/media";
import { Add } from "./components/mainUI/add";
import { VideoPlayer } from "./components/players/videoPlayer";
import { AudioPlayer } from "./components/players/audioPlayer"; 

export function Main() {
    const { current, mediaSrc } = useContext(navCtx);

    useEffect(() => {
        async function createIf() {
            window.utils.createMediaDir();  
        };
        createIf();
    }, []);

    return (
        <div className="flex">
            <Navbar />
            {current === "Videos" && <Media dir={"videos"}/>}
            {current === "Audio" && <Media dir={"audio"}/>}
            {current === "Add" && <Add />}
            {current === "playingVideo" && <VideoPlayer src={mediaSrc} />}
            {current === "playingAudio" && <AudioPlayer src={mediaSrc} />}
        </div>
    );
};