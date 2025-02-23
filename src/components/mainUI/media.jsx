import { useEffect, useContext, useState } from "react";
import { navCtx } from "../../context/navContext";
import { useFetchFiles } from "../../hooks/libraryHooks/useFetchFiles";
import { useDeleteFiles } from "../../hooks/libraryHooks/useDeleteFiles";
import { useRenameFile } from "../../hooks/libraryHooks/useRenameFile";
import { useSearchFiles } from "../../hooks/libraryHooks/useSearchFiles";
import { useSelectFiles } from "../../hooks/libraryHooks/useSelectFiles";
import { Playlists } from "../individuals/major/playlists";
import { NoMedia } from "../individuals/minor/noMedia";
import { Header } from "../individuals/major/header";
import { RenameModal } from "../modals/renameModal";
import { Entry } from "../individuals/major/entry";
import { DelModal } from "../modals/delModal";

export function Media({ dir }) {
    const { setCurrent, setMediaSrc } = useContext(navCtx);

    const { renameMedia, closeRenameModal, setRenameModal, renameModal, setRenameInput, renameInput, renameError } = useRenameFile();
    const { isChecked, toggleSelect, setIsSelect, isSelect, setSelectedEntries, selectedEntries } = useSelectFiles();
    const { searchMedia, setSearchInput, searchInput, filtered } = useSearchFiles();
    const { deleteMedia, setDelModal, delModal } = useDeleteFiles();
    const { fetchMedia, media } = useFetchFiles();

    function playMedia(src) {
        setCurrent(dir === "videos" ? "playingVideo" : "playingAudio");
        setMediaSrc([src, media, `/devTemp/${dir}/`]);
    };

    function searchFiles(e) {
        setIsSelect(false);
        setSearchInput(e.target.value);
        searchMedia(e.target.value, media);
    };

    function filter() {
        return searchInput !== "" ? filtered : media;
    };

    function renameFile(oldName, newName) {
        renameMedia(oldName, newName, dir);
        fetchMedia(dir, dir);
    };

    function deleteFiles(array) {
        deleteMedia(array, dir);
        setIsSelect(false);
        setSelectedEntries[[]];
        fetchMedia(dir, dir);
    };

    useEffect(() => {
        fetchMedia(dir, dir);
    }, []);

    return (
        <>
            <section className="flex flex-col items-center w-full h-screen overflow-x-auto">
                <Header
                    name={dir === "videos" ? "Videos" : "Audio"} 
                    search={(e) => searchFiles(e)}
                    toggleSelect={toggleSelect}
                    isSelect={isSelect}
                    deleteModal={() => setDelModal(selectedEntries)}
                    openFolder={() => window.FS.openFolder("/devTemp/" + dir)}
                />
                <div className="w-full text-white p-8">
                    <Playlists dir={dir}/>
                    {media.length === 0 && <NoMedia />}
                    {filter().map((file) => (
                        <Entry
                            media={file}
                            play={() => playMedia(file)}
                            renameModal={() => setRenameModal(file)}
                            deleteModal={() => setDelModal([file])}
                            select={(e) => isChecked(e, file)}
                            isSelect={isSelect}
                        />
                    ))}
                </div>
            </section>
            {delModal.length > 0 &&    <DelModal 
                            name={delModal.length + " file/s"}
                            setModal={() => setDelModal([])}
                            del={() => deleteFiles(delModal)}/>}

            {renameModal && <RenameModal 
                            name={renameModal} 
                            setModal={closeRenameModal} 
                            rename={() => renameFile(renameModal, renameInput)} 
                            onChange={(e) => setRenameInput(e.target.value)} 
                            error={renameError}/>}
        </>
    );
};