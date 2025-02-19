import { useEffect, useContext } from "react";
import { navCtx } from "../../context/navContext";
import { DelModal } from "../modals/delModal";
import { RenameModal } from "../modals/renameModal";
import { Entry } from "../individuals/entry";
import { NoMedia } from "../individuals/noMedia";
import { Header } from "../individuals/header";
import { useFetchVideos } from "../../hooks/videoHooks/useFetchVideos";
import { useDelVideos } from "../../hooks/videoHooks/useDelVideos";
import { useRenameVideo } from "../../hooks/videoHooks/useRenameVideo";
import { useSearchVideos } from "../../hooks/videoHooks/useSearchVideos";
import { useSelectVideos } from "../../hooks/videoHooks/useSelectVideos";

export function Videos() {
    const { setCurrent, setVidSrc } = useContext(navCtx);

    const { fetchVideos, videos } = useFetchVideos();
    const { delVideos, setDelModal, delModal, setDelMultipleModal, delMultipleModal } = useDelVideos();
    const { renameVideo, setRenameModal, renameModal, setRenameInput, renameInput } = useRenameVideo();
    const { search, setSearchInput, searchInput, filtered } = useSearchVideos();
    const { isChecked, toggleSelect, setIsSelect, isSelect, setSelectedEntries, selectedEntries } = useSelectVideos();

    function playVid(src) {
        setCurrent("playingVideo");
        setVidSrc([src, videos]);
    };

    function searchVideos(e) {
        setIsSelect(false);
        setSearchInput(e.target.value);
        search(e.target.value, videos);
    };

    async function editVideo(oldName, newName) {
        await renameVideo(oldName, newName);
        fetchVideos();
    };

    async function deleteVideos(array) {
        await delVideos(array);
        setIsSelect(false);
        setSelectedEntries([]);
        setDelMultipleModal(false);
        fetchVideos();
    };

    function isFiltered() {
        return searchInput !== "" ? filtered : videos;
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    return (
        <>
            <section className="flex flex-col items-center w-full h-screen overflow-x-auto">
                <Header
                    name={"Videos"} 
                    onChange={(e) => searchVideos(e)}
                    toggleSelect={toggleSelect}
                    isSelect={isSelect}
                    delMultipleModal={() => setDelMultipleModal([true, selectedEntries])}
                />
                <div className="w-full text-white p-8">
                    {videos.length === 0 && <NoMedia />}
                    {isFiltered(videos).map((video) => (
                        <Entry
                            media={video}
                            play={() => playVid(video)}
                            renameModal={() => setRenameModal([true, video])}
                            deleteModal={() => setDelModal([true, video])}
                            check={(e) => isChecked(e, video)}
                            isSelect={isSelect}
                        />
                    ))}
                </div>
            </section>
            {delModal[0] && <DelModal name={delModal[1]} setModal={() => setDelModal([false, ""])} del={() => deleteVideos([delModal[1]])}/>}
            {delMultipleModal && <DelModal name={`${selectedEntries.length} videos`} setModal={() => setDelMultipleModal(false)} del={() => deleteVideos(selectedEntries)}/>}
            {renameModal[0] && <RenameModal name={renameModal[1]} setModal={() => setRenameModal([false, ""])} rename={() => editVideo(renameModal[1], renameInput)} onChange={(e) => setRenameInput(e.target.value)}/>}
        </>
    );
};