import { useContext } from "react";
import { Navbar } from "./components/mainUI/navbar"
import { navCtx } from "./context/navContext";
import { Videos } from "./components/mainUI/videos";
import { Music } from "./components/mainUI/music";
import { Add } from "./components/mainUI/add";
import { VideoPlayer } from "./components/players/videoPlayer";
import { AudioPlayer } from "./components/players/audioPlayer"; 

export function Main() {
    const { current, vidSrc, audioSrc } = useContext(navCtx);

    return (
        <div className="flex">
            <Navbar />
            {current === "Videos" && <Videos />}
            {current === "Music" && <Music />}
            {current === "Add" && <Add />}
            {current === "playingVideo" && <VideoPlayer src={vidSrc} />}
            {current === "playingAudio" && <AudioPlayer src={audioSrc} />}
        </div>
    );
};