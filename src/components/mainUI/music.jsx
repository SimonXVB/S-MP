import { useEffect, useState, useContext } from "react";
import { navCtx } from "../../context/navContext";
import { DelModal } from "../modals/delModal";
import { RenameModal } from "../modals/renameModal";
import { NoMedia } from "../individuals/noMedia";
import { Entry } from "../individuals/entry";
import { Header } from "../individuals/header";

export function Music() {
    const { setCurrent, setAudioSrc } = useContext(navCtx);

    const [audio, setAudio] = useState([]);
    const [filtered, setFiltered] = useState([]);

    const [delModal, setDelModal] = useState([false, ""]);
    const [renameModal, setRenameModal] = useState([false, ""]);

    const [renameInput, setRenameInput] = useState("");
    const [searchInput, setSearchInput] = useState("");

    async function getAudio() {
        const files = await window.FS.readAudioDir();
        setAudio(files);
    };

    async function delAudio(path) {
        await window.FS.delAudioFile(path);
        setDelModal([false, ""]);
        getAudio();
    };

    async function renameAudio(oldName, newName) {
        await window.FS.renameAudioFile(oldName, newName);
        setRenameModal([false, ""]);
        setRenameInput("");
        getAudio();
    };

    function playAudio(src) {
        setCurrent("playingAudio");
        setAudioSrc([src, audio]);
    };

    function search(input) {
        setFiltered(audio.filter((file) => {
            if(file.toLowerCase().includes(input.toLowerCase())) {
                return audio;
            };
        }));
    };

    function isFiltered() {
       return searchInput !== "" ? filtered : audio;
    };

    useEffect(() => {
        getAudio();
    }, []);

    return (
        <>
            <section className="flex flex-col items-center w-full h-screen overflow-x-auto">
                <Header 
                    name={"Audio"} 
                    onChange={(e) => {setSearchInput(e.target.value); search(e.target.value)}}
                />
                <div className="w-full text-white p-8">
                    {audio.length === 0 && <NoMedia />}
                    {isFiltered().map((file) => (
                        <Entry 
                            media={file}
                            play={() => playAudio(file)}
                            renameModal={() => setRenameModal([true, file])}
                            deleteModal={() => setDelModal([true, file])}
                        />
                    ))}
                </div>
            </section>
            {delModal[0] && <DelModal name={delModal[1]} setModal={() => setDelModal([false, ""])} del={() => delAudio(delModal[1])}/>}
            {renameModal[0] && <RenameModal name={renameModal[1]} setModal={() => setRenameModal([false, ""])} rename={() => renameAudio(renameModal[1], renameInput)} onChange={(e) => setRenameInput(e.target.value)}/>}
        </>
    );
};