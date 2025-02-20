import { useEffect, useContext } from "react";
import { navCtx } from "../../context/navContext";
import { DelModal } from "../modals/delModal";
import { RenameModal } from "../modals/renameModal";
import { Entry } from "../individuals/entry";
import { NoMedia } from "../individuals/noMedia";
import { Header } from "../individuals/header";
import { useFetch } from "../../hooks/libraryHooks/useFetch";
import { useDelete } from "../../hooks/libraryHooks/useDelete";
import { useRename } from "../../hooks/libraryHooks/useRename";
import { useSearch } from "../../hooks/libraryHooks/useSearch";
import { useSelect } from "../../hooks/libraryHooks/useSelect";

export function Videos() {
    const { setCurrent, setVidSrc } = useContext(navCtx);

    const { fetchMedia, media } = useFetch();
    const { deleteMedia, setDelModal, delModal, setDelMultipleModal, delMultipleModal } = useDelete();
    const { renameMedia, setRenameModal, renameModal, setRenameInput, renameInput } = useRename();
    const { searchMedia, setSearchInput, searchInput, filtered } = useSearch();
    const { isChecked, toggleSelect, setIsSelect, isSelect, setSelectedEntries, selectedEntries } = useSelect();

    function playVid(src) {
        setCurrent("playingVideo");
        setVidSrc([src, media]);
    };

    function searchVideos(e) {
        setIsSelect(false);
        setSearchInput(e.target.value);
        searchMedia(e.target.value, media);
    };

    async function renameVideo(oldName, newName) {
        await renameMedia(oldName, newName, "video");
        await fetchMedia("video");
    };

    async function deleteVideos(array) {
        await deleteMedia(array, "video");
        setIsSelect(false);
        setSelectedEntries([]);
        setDelMultipleModal(false);
        await fetchMedia("video");
    };

    function isFiltered() {
        return searchInput !== "" ? filtered : media;
    };

    useEffect(() => {
        async function fetch() {
            await fetchMedia("video");  
        };
        fetch();
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
                    {media.length === 0 && <NoMedia />}
                    {isFiltered(media).map((file) => (
                        <Entry
                            media={file}
                            play={() => playVid(file)}
                            renameModal={() => setRenameModal([true, file])}
                            deleteModal={() => setDelModal([true, file])}
                            check={(e) => isChecked(e, file)}
                            isSelect={isSelect}
                        />
                    ))}
                </div>
            </section>
            {delModal[0] && <DelModal name={delModal[1]} setModal={() => setDelModal([false, ""])} del={() => deleteVideos([delModal[1]])}/>}
            {delMultipleModal && <DelModal name={`${selectedEntries.length} videos`} setModal={() => setDelMultipleModal(false)} del={() => deleteVideos(selectedEntries)}/>}
            {renameModal[0] && <RenameModal name={renameModal[1]} setModal={() => setRenameModal([false, ""])} rename={() => renameVideo(renameModal[1], renameInput)} onChange={(e) => setRenameInput(e.target.value)}/>}
        </>
    );
};