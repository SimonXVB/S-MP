import { useContext, useEffect } from "react";
import { mainContext } from "./Context/context";
import { Navbar } from "./components/Navbar";
import { CollectionsTab } from "./Components/CollectionsTabComps/CollectionsTab";
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
            {current === "videos" && <CollectionsTab/>}
            {current === "music" && <CollectionsTab/>}
            {current === "playingVideo" && <VideoPlayer/>}
            {current === "playingMusic" && <AudioPlayer/>}
        </div>
    );
};