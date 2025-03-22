import { useEffect, useContext, useState } from "react";
import { useDeleteFiles } from "../../hooks/libraryHooks/useDeleteFiles";
import { useFetchFiles } from "../../hooks/libraryHooks/useFetchFiles";
import { useRenameFile } from "../../hooks/libraryHooks/useRenameFile";
import { useAppPath } from "../../hooks/useAppPath";
import { HeaderButton } from "../individuals/minor/headerButton"
import { NoMedia } from "../individuals/minor/noMedia";
import { RenameModal } from "../modals/renameModal";
import { Entry } from "../individuals/major/entry";
import { navCtx } from "../../context/navContext";
import { DelModal } from "../modals/delModal";
import { ResModal } from "../modals/resModal";

export function PlaylistModal({ dir, setModal }) {
    const { setCurrent, setMediaSrc } = useContext(navCtx);

    const [res, setRes] = useState("");

    const { renameMedia, closeRenameModal, setRenameModal, renameModal, setRenameInput, renameInput, renameError } = useRenameFile();
    const { deleteMedia, setDelModal, delModal } = useDeleteFiles();
    const { fetchMedia, media } = useFetchFiles();
    const { getAppPath, appPath } = useAppPath();

    function playMedia(file) {
        setCurrent(dir.split("/")[0] === "videos" ? "playingVideo" : "playingAudio");
        setMediaSrc([`${appPath}/swan-media-player/${dir}/`, file, media]);
    };

    function renameFile(oldName, newName) {
        renameMedia(oldName, newName, dir);
        fetchMedia(dir);
    };

    function deleteFiles(array) {
        deleteMedia(array, dir);
        fetchMedia(dir);
    };

    async function copyFile() {
        try {
            const res = await window.FS.copyFile(dir);
            !res && setRes("success");
            fetchMedia(dir);
        } catch (error) {
            setRes(error);
        };
    };

    useEffect(() => {
        fetchMedia(dir);
        getAppPath();
    }, []);
    
    return (
        <>
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-400/40" id="transition">
                <div className="flex flex-col w-[70vw] h-[70vh] bg-linear-to-b from-gray-800 to-gray-700 rounded-2xl">
                    <header className="bg-red-400 min-h-[70px] flex justify-between items-center rounded-t-2xl px-4">
                        <p className="font-bold text-xl">{dir.split("/")[1]}</p>
                        <div>
                            <HeaderButton onclick={() => copyFile()}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                            </HeaderButton>
                            <HeaderButton onclick={() => setModal(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                            </HeaderButton>
                        </div>
                    </header>
                    <div className="grow-[1] h-full p-4 text-white overflow-auto">
                        {media.length === 0 && <NoMedia />}
                        {media.map((file) => (
                            <Entry
                                media={file}
                                play={() => playMedia(file)}
                                renameModal={() => setRenameModal(file)}
                                deleteModal={() => setDelModal([file])}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {res && <ResModal setRes={setRes} res={res}/>}
            {delModal.length > 0 && <DelModal
                                    name={delModal.length + "file"}
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