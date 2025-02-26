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
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-300/50">
                <div className="flex flex-col w-[70vw] h-[70vh] bg-gray-600 border-4 border-red-400">
                    <header className="bg-gray-900 min-h-[70px]">
                        <div className="h-full flex justify-between items-center px-2">
                            <p className="font-bold text-2xl">{dir.split("/")[1]}</p>
                            <div>
                                <HeaderButton onclick={() => copyFile()} src={"../src/assets/libraryAssets/add.png"}/>
                                <HeaderButton onclick={() => setModal(false)} src={"../src/assets/libraryAssets/cancel.png"}/>
                            </div>
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