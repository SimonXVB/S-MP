import { useEffect, useState, useContext } from "react";
import { navCtx } from "../../context/navContext";
import { DelModal } from "../modals/delModal";
import { RenameModal } from "../modals/renameModal";

export function Videos() {
    const { setCurrent, setVidSrc } = useContext(navCtx);

    const [videos, setVideos] = useState([]);
    const [delModal, setDelModal] = useState([false, ""]);
    const [renameModal, setRenameModal] = useState([false, ""]);
    const [renameInput, setRenameInput] = useState("");

    async function getVideos() {
        const files = await window.FS.readVideoDir();
        setVideos(files);
    };

    async function delVideo(path) {
        await window.FS.delVideoFile(path);
        setDelModal([false, ""]);
        getVideos();
    };

    async function renameVideo(oldName, newName) {
        await window.FS.renameVideoFile(oldName, newName);
        setRenameModal([false, ""]);
        setRenameInput("");
        getVideos();
    };

    function playVid(src) {
        setCurrent("playingVideo");
        setVidSrc(".././devTemp/videos/" + src);
    };

    useEffect(() => {
        getVideos();
    }, []);

    return (
        <>
            <section className="flex flex-col items-center w-full h-screen overflow-x-auto">
                <h1 className="text-3xl pl-4 font-bold flex items-center min-h-[100px] w-full bg-gray-900 text-white">Videos</h1>
                <div className="w-full text-white p-8">
                    {videos.length === 0 &&
                    <div className="flex justify-center items-center w-full font-bold">
                        <p>No videos found</p>
                    </div>
                    }
                    {videos.map((video) => (
                        <div className="border-2 border-red-400 flex items-center justify-between h-[55px] my-4 pl-2">
                            <div className="flex whitespace-nowrap text-2xl w-[500px] overflow-x-auto">{video}</div>
                            <div className="flex h-full pl-2 *:h-full *:px-4 *:cursor-pointer *:bg-gray-900 *:hover:bg-red-400">
                                <button onClick={() => playVid(video)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z"/></svg>
                                </button>
                                <button onClick={() => setRenameModal([true, video])}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/></svg>
                                </button>
                                <button onClick={() => setDelModal([true, video])}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {delModal[0] && <DelModal name={delModal[1]} setModal={() => setDelModal([false, ""])} del={() => delVideo(delModal[1])}/>}
                {renameModal[0] && <RenameModal name={renameModal[1]} setModal={() => setRenameModal([false, ""])} rename={() => renameVideo(renameModal[1], renameInput)} onChange={(e) => setRenameInput(e.target.value)}/>}
            </section>
        </>
    );
};