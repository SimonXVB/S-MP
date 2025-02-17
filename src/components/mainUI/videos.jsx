import { useEffect, useState, useContext } from "react";
import { navCtx } from "../../context/navContext";
import { DelModal } from "../modals/delModal";
import { RenameModal } from "../modals/renameModal";
import { Entry } from "../individuals/entry";
import { NoMedia } from "../individuals/noMedia";
import { Header } from "../individuals/header";

export function Videos() {
    const { setCurrent, setVidSrc } = useContext(navCtx);

    const [videos, setVideos] = useState([]);
    const [filtered, setFiltered] = useState([]);
    
    const [delModal, setDelModal] = useState([false, ""]);
    const [renameModal, setRenameModal] = useState([false, ""]);

    const [renameInput, setRenameInput] = useState("");
    const [searchInput, setSearchInput] = useState("");

    async function getVideos() {
        setVideos(await window.FS.readVideoDir());
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

    function search(input) {
        setFiltered(videos.filter((video) => {
            if(video.toLowerCase().includes(input.toLowerCase())) {
                return video;
            };
        }));
    };

    function isFiltered() {
       return searchInput !== "" ? filtered : videos;
    };

    useEffect(() => {
        getVideos();
    }, []);

    return (
        <>
            <section className="flex flex-col items-center w-full h-screen overflow-x-auto">
                <Header 
                    name={"Videos"} 
                    onChange={(e) => {setSearchInput(e.target.value); search(e.target.value)}}
                    refresh={getVideos}
                />
                <div className="w-full text-white p-8">
                    {videos.length === 0 && <NoMedia />}
                    {isFiltered().map((video) => (
                        <Entry 
                            media={video}
                            play={() => playVid(video)}
                            renameModal={() => setRenameModal([true, video])}
                            deleteModal={() => setDelModal([true, video])}
                        />
                    ))}
                </div>
            </section>
            {delModal[0] && <DelModal name={delModal[1]} setModal={() => setDelModal([false, ""])} del={() => delVideo(delModal[1])}/>}
            {renameModal[0] && <RenameModal name={renameModal[1]} setModal={() => setRenameModal([false, ""])} rename={() => renameVideo(renameModal[1], renameInput)} onChange={(e) => setRenameInput(e.target.value)}/>}
        </>
    );
};