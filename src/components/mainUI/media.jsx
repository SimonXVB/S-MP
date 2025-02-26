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
import { useAppPath } from "../../hooks/useAppPath";

export function Media({ dir }) {
    const { setCurrent, setMediaSrc } = useContext(navCtx);

    const { renameMedia, closeRenameModal, setRenameModal, renameModal, setRenameInput, renameInput, renameError } = useRenameFile();
    const { isChecked, toggleSelect, setIsSelect, isSelect, setSelectedEntries, selectedEntries } = useSelectFiles();
    const { searchMedia, setSearchInput, searchInput, filtered } = useSearchFiles();
    const { deleteMedia, setDelModal, delModal } = useDeleteFiles();
    const { fetchMedia, media } = useFetchFiles();

    const { getAppPath, appPath } = useAppPath();

    function playMedia(file) {
        setCurrent(dir === "videos" ? "playingVideo" : "playingAudio");
        setMediaSrc([`${appPath}/swan-media-player/${dir}/`, file, media]);
    };

    function searchFiles(e) {
        setIsSelect(false);
        setSelectedEntries([]);
        setSearchInput(e.target.value);
        searchMedia(e.target.value, media);
    };

    function filter() {
        return searchInput !== "" ? filtered : media;
    };

    function renameFile(oldName, newName) {
        renameMedia(oldName, newName, dir);
        fetchMedia(dir);
    };

    function deleteFiles(array) {
        if(searchInput !== "") {
            setSearchInput("");
        };

        setIsSelect(false);
        setSelectedEntries([]);
        deleteMedia(array, dir);
        fetchMedia(dir);
    };

    useEffect(() => {
        fetchMedia(dir);
        getAppPath();
    }, []);

    return (
        <>
            <section className="flex flex-col items-center w-full h-screen overflow-x-auto">
                <Header
                    name={dir === "videos" ? "Videos" : "Audio"} 
                    search={(e) => searchFiles(e)}
                    searchValue={searchInput}
                    toggleSelect={toggleSelect}
                    isSelect={isSelect}
                    deleteModal={() => setDelModal(selectedEntries)}
                    openFolder={() => window.FS.openFolder(dir)}
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