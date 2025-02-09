import { useContext } from "react";
import { Navbar } from "./components/navbar";
import { navCtx } from "./context/navContext";
import { Videos } from "./components/mainUI/videos";
import { Music } from "./components/mainUI/music";
import { YT } from "./components/mainUI/yt";
import { Add } from "./components/mainUI/add";
import { VideoPlayer } from "./components/players/videoPlayer";
import { AudioPlayer } from "./components/players/audioPlayer"; 

export function Main() {
    const { current, vidSrc, audioSrc } = useContext(navCtx);

    return (
        <>
            <Navbar />
            {current === "Videos" && <Videos />}
            {current === "Music" && <Music />}
            {current === "YT" && <YT />}
            {current === "Add" && <Add />}
            {current === "playingVideo" && <VideoPlayer src={vidSrc} />}
            {current === "playingAudio" && <AudioPlayer src={audioSrc} />}
        </>
    );
};