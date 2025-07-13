import { useState, useContext, useEffect } from "react";
import { mainContext } from "../../Context/context";
import { NewPlaylistButton } from "./Individuals/NewPlaylistButton";
import { NewPlaylistModal } from "./Individuals/NewPlaylistModal";

export function MediaTab() {
    const { current } = useContext(mainContext);
    const [playlistModal, setPlaylistModal] = useState(false);
    const [collection, setCollection] = useState([]);

    async function getCollection() {
        const data = await window.collection.getCollections();
        setCollection(data[current]);
    };

    useEffect(() => {
        getCollection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="bg-gray-950 grow">
                <div className="w-fit h-[calc(100vh-54px)] overflow-y-auto flex flex-wrap gap-2 p-6">
                    <NewPlaylistButton setPlaylistModal={setPlaylistModal}/>
                    {collection.map((entry, i) => (
                        <div key={i} className="relative w-50 h-50 flex flex-col justify-center items-center bg-red-400">
                            <img src={entry.coverImg} className="bg-red-400"/>
                            <p className="absolute top-full left-0 w-full bg-white font-bold backdrop-blur-xl px-1">{entry.name}</p>
                            <div className="text-white font-bold bg-red-400 absolute top-full left-0 w-full backdrop-blur-xl px-1">
                                <p className="">{entry.name}</p>
                                <button className="mr-5">Del</button>
                                <button>Edit</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {playlistModal && <NewPlaylistModal setPlaylistModal={setPlaylistModal} getCollection={getCollection}/>}
        </>
    )
};