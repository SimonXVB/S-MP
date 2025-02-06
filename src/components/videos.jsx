import { useEffect, useState } from "react";
import pfp from "../assets/smallerPFP.jpg"
import { DelModal } from "./modals/delModal";
import { RenameModal } from "./modals/renameModal";

export function Videos() {
    const [videos, setVideos] = useState([]);
    const [delModal, setDelModal] = useState([false, ""]);
    const [renameModal, setRenameModal] = useState([false, ""]);
    const [renameInput, setRenameInput] = useState("");

    async function getVideos() {
        const files = await window.FS.readVideoDir();
        setVideos(files);
    };

    function delVideo(path) {
        window.FS.delVideoFile(path);
        setDelModal([false, ""]);
        getVideos();
    };

    function renameVideo(oldName, newName) {
        window.FS.renameVideoFile(oldName, newName);
        setRenameModal([false, ""]);
        setRenameInput("");
        getVideos();
    };

    console.log(renameInput);

    useEffect(() => {
        getVideos();
    }, []);

    return (
        <div className="w-full bg-linear-to-b from-gray-800 to-gray-700 flex justify-center items-center h-dvh">
            <div className="max-w-[95%] max-h-[95%] h-full w-full">
                <div className="bg-gray-900 text-white text-3xl font-semibold p-4 flex items-center max-h-[8%] h-full">Videos</div>
                <div className="max-h-[92%] text-white py-4 flex flex-wrap gap-2 overflow-auto">
                    {videos.map((video) => (
                        <div className="border-2 border-red-400 max-w-[250px] max-h-[250px] w-full flex flex-col items-center aspect-square">
                            <img src={pfp} className="max-w-28"/>
                            <div className="flex items-center h-full w-[95%] overflow-x-auto">
                                <p className="text-2xl text-center">{video}</p>
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <button className="cursor-pointer w-[50%] p-2 bg-gray-900">Play</button>
                                <button className="cursor-pointer w-[50%] p-2 bg-gray-900" onClick={() => setDelModal([true, video])}>Delete</button>
                                <button className="cursor-pointer w-[50%] p-2 bg-gray-900 flex justify-center items-center" onClick={() => setRenameModal([true, video])}>Rename</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {delModal[0] && <DelModal name={delModal[1]} setModal={() => setDelModal([false, ""])} del={() => delVideo(delModal[1])}/>}
            {renameModal[0] && <RenameModal name={delModal[1]} setModal={() => setRenameModal([false, ""])} rename={() => renameVideo(renameModal[1], renameInput)} onChange={(e) => setRenameInput(e.target.value)}/>}
        </div>
    );
};