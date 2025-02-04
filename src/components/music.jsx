import { useEffect, useState } from "react";
import pfp from "../assets/smallerPFP.jpg"

export function Music() {
    const [audio, setAudio] = useState([]);

    async function getAudio() {
        const files = await window.FS.readAudioDir();
        setAudio(files);
    };

    useEffect(() => {
        getAudio();
    }, []);

    return (
        <div className="w-full bg-linear-to-b from-gray-800 to-gray-700 flex justify-center items-center h-dvh">
            <div className="max-w-[95%] max-h-[95%] h-full w-full">
                <div className="bg-gray-900 text-white text-3xl font-semibold p-4 flex items-center max-h-[8%] h-full">Music</div>
                <div className="max-h-[92%] text-white py-4 flex flex-wrap gap-2 overflow-auto">
                    {audio.map((file) => (
                        <div className="border-2 border-red-400 max-w-[250px] max-h-[250px] w-full flex flex-col items-center justify-center aspect-square">
                            <img src={pfp} className="max-w-28"/>
                            <div className="flex items-center h-full w-[95%] overflow-x-auto">
                                <p className="text-2xl text-center">{file}</p>
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <button className="cursor-pointer w-[50%] p-2 bg-gray-900">Play</button>
                                <button className="cursor-pointer w-[50%] p-2 bg-gray-900 flex justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};