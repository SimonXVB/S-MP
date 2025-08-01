import { useContext, useEffect } from "react";
import { mainContext } from "./Context/context";
import { Navbar } from "./components/Navbar";
import { AllCollections } from "./Components/AllCollectionsComps/AllCollections";
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
        <div className="min-h-screen flex flex-col">
            <Navbar/>
            {tabInfo.currentTab === "collectionsTab" && <AllCollections/>}
            {tabInfo.currentTab === "openCollection" && <CurrentCollection/>}
            {tabInfo.currentTab === "videoPlayer" && <VideoPlayer/>}
            {tabInfo.currentTab === "musicPlayer" && <AudioPlayer/>}
            <GlobalError/>
        </div>
    );
};