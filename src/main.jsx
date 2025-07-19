import { useContext, useEffect } from "react";
import { mainContext } from "./Context/context";
import { Navbar } from "./components/Navbar";
import { CollectionsTab } from "./Components/CollectionsTabComps/CollectionsTab";
import { VideoPlayer } from "./Components/PlayerComps/VideoPlayer";
import { AudioPlayer } from "./Components/PlayerComps/AudioPlayer";

export function Main() {
    const { tabInfo } = useContext(mainContext);

    useEffect(() => {
        async function createRootDirs() {
            await window.utils.createRootDirs();  
        };
        createRootDirs();
    }, []);

    return (
        <div className="h-screen flex flex-col">
            <Navbar/>
            {tabInfo.currentCollection === "" && tabInfo.currentTab === "videos" && <CollectionsTab/>}
            {tabInfo.currentCollection === "" && tabInfo.currentTab === "music" && <CollectionsTab/>}
            {tabInfo.currentTab === "playingVideo" && <VideoPlayer/>}
            {tabInfo.currentTab === "playingMusic" && <AudioPlayer/>}
        </div>
    );
};