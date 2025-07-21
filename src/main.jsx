import { useContext, useEffect } from "react";
import { mainContext } from "./Context/context";
import { Navbar } from "./components/Navbar";
import { CollectionsTab } from "./Components/CollectionsTabComps/CollectionsTab";
import { CurrentCollection } from "./Components/CurrentCollectionComps/CurrentCollection";
import { VideoPlayer } from "./Components/PlayerComps/VideoPlayer";
import { AudioPlayer } from "./Components/PlayerComps/AudioPlayer";
import { GlobalError } from "./Components/GlobalError";

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
            {tabInfo.currentTab === "collectionsTab" && <CollectionsTab/>}
            {tabInfo.currentTab === "openCollection" && <CurrentCollection/>}
            {tabInfo.currentTab === "playingVideo" && <VideoPlayer/>}
            {tabInfo.currentTab === "playingMusic" && <AudioPlayer/>}
            <GlobalError/>
        </div>
    );
};