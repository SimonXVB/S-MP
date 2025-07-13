import { useContext, useEffect } from "react";
import { mainContext } from "./Context/context";
import { Navbar } from "./components/Navbar";
import { MediaTab } from "./components/MediaTabComps/MediaTab";
import { VideoPlayer } from "./Components/PlayerComps/VideoPlayer";
import { AudioPlayer } from "./Components/PlayerComps/AudioPlayer";

export function Main() {
    const { current } = useContext(mainContext);

    useEffect(() => {
        async function createRootDirs() {
            await window.utils.createRootDirs();  
        };
        createRootDirs();
    }, []);

    return (
        <div className="h-screen flex flex-col">
            <Navbar/>
            {current === "videos" && <MediaTab/>}
            {current === "music" && <MediaTab/>}
            {current === "playingVideo" && <VideoPlayer/>}
            {current === "playingMusic" && <AudioPlayer/>}
        </div>
    );
};