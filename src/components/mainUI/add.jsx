import { useState } from "react";
import { ResModal } from "../modals/resModal";

export function Add() {
    const [res, setRes] = useState("");

    async function copyFile(dir) {
        try {
            const res = await window.FS.copyFile(dir);
            !res && setRes("success");
        } catch (error) {
            setRes(error);
        };
    };
    
    return (
        <section className="w-full flex flex-col h-screen">
            <h1 className="flex items-center w-full min-h-[50px] py-2 text-xl bg-red-400 text-white font-semibold">Add Media</h1>
            <div className="flex justify-center items-center gap-4 min-h-[400px] h-full overflow-auto text-white px-4">
                <button className="border-4 border-red-400 max-w-[250px] aspect-square w-full flex flex-col justify-center items-center cursor-pointer hover:bg-red-400 rounded-2xl" onClick={() => copyFile("videos")}>
                    <img src="../src/assets/addAssets/movie.png"/>
                    <p className="text-2xl font-bold">Add Video</p>
                    <div className="text-[13px]">.mp4, .webm, .ogg</div>
                </button>
                <button className="border-4 border-red-400 max-w-[250px] aspect-square w-full flex flex-col justify-center items-center cursor-pointer hover:bg-red-400 rounded-2xl" onClick={() => copyFile("audio")}>
                    <img src="../src/assets/addAssets/music.png"/>
                    <p className="text-2xl font-bold">Add Audio</p>
                    <div className="text-[13px]">.mp3, .wav, .ogg</div>
                </button>
            </div>
            {res && <ResModal setRes={setRes} res={res}/>}
        </section>
    );
};