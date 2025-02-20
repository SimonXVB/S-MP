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

export function Music() {
    const { setCurrent, setAudioSrc } = useContext(navCtx);

    const { fetchMedia, media } = useFetch();
    const { deleteMedia, setDelModal, delModal, setDelMultipleModal, delMultipleModal } = useDelete();
    const { renameMedia, setRenameModal, renameModal, setRenameInput, renameInput } = useRename();
    const { searchMedia, setSearchInput, searchInput, filtered } = useSearch();
    const { isChecked, toggleSelect, setIsSelect, isSelect, setSelectedEntries, selectedEntries } = useSelect();

    function playAudio(src) {
        setCurrent("playingAudio");
        setAudioSrc([src, media]);
    };

    function searchAudio(e) {
        setIsSelect(false);
        setSearchInput(e.target.value);
        searchMedia(e.target.value, media);
    };

    async function renameAudio(oldName, newName) {
        await renameMedia(oldName, newName, "audio");
        await fetchMedia("audio");
    };

    async function deleteAudio(array) {
        await deleteMedia(array, "audio");
        setIsSelect(false);
        setSelectedEntries([]);
        setDelMultipleModal(false);
        await fetchMedia("audio");
    };

    function isFiltered() {
        return searchInput !== "" ? filtered : media;
    };

    useEffect(() => {
        async function fetch() {
            await fetchMedia("audio");   
        };
        fetch();
    }, []);

    return (
        <>
            <section className="flex flex-col items-center w-full h-screen overflow-x-auto">
                <Header
                    name={"Audio"} 
                    onChange={(e) => searchAudio(e)}
                    toggleSelect={toggleSelect}
                    isSelect={isSelect}
                    delMultipleModal={() => setDelMultipleModal([true, selectedEntries])}
                />
                <div className="w-full text-white p-8">
                    {media.length === 0 && <NoMedia />}
                    {isFiltered(media).map((file) => (
                        <Entry
                            media={file}
                            play={() => playAudio(file)}
                            renameModal={() => setRenameModal([true, file])}
                            deleteModal={() => setDelModal([true, file])}
                            check={(e) => isChecked(e, file)}
                            isSelect={isSelect}
                        />
                    ))}
                </div>
            </section>
            {delModal[0] && <DelModal name={delModal[1]} setModal={() => setDelModal([false, ""])} del={() => deleteAudio([delModal[1]])}/>}
            {delMultipleModal && <DelModal name={`${selectedEntries.length} files`} setModal={() => setDelMultipleModal(false)} del={() => deleteAudio(selectedEntries)}/>}
            {renameModal[0] && <RenameModal name={renameModal[1]} setModal={() => setRenameModal([false, ""])} rename={() => renameAudio(renameModal[1], renameInput)} onChange={(e) => setRenameInput(e.target.value)}/>}
        </>
    );
};