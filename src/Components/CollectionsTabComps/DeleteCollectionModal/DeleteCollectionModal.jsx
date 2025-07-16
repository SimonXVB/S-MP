import { useState, useContext } from "react";
import { mainContext } from "../../../Context/context";
import { DeleteCollectionModalError } from "./DeleteCollectionModalError";

export function DeleteCollectionModal({ setDeleteModal, getCollection, collectionName }) {
    const { current } = useContext(mainContext);
    const [error, setError] = useState("");
    
    const collectionType = current === "videos" ? "Collection" : "Playlist";

    async function deleteCollection() {
        const res = await window.collection.deleteCollection({name: collectionName, targetDir: current});
        getCollection();

        if(res === "deleted") {
            setDeleteModal("");
        } else {
            setError(res);
        };
    };

    return (
        <div className="fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-gray-400/20">
            <div className="relative flex flex-col justify-between bg-gray-950 max-w-[300px] p-5 rounded-md text-white">
                <button className="absolute top-0 right-0 p-3 cursor-pointer hover:*:fill-red-400" onClick={() => setDeleteModal("")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                </button>
                <h1 className="font-bold text-xl text-white">Delete {collectionType}?</h1>
                <p className="text-sm"><p className="text-red-400 font-bold mt-4">Warning:</p> Deleting a {collectionType} will also delete everything in that {collectionType}!</p>
                <button onClick={deleteCollection} className="flex justify-center items-center bg-red-400 text-white font-bold border-2 border-red-400 cursor-pointer py-1 mt-4 hover:bg-white hover:text-red-400 hover:*:fill-red-400">
                    <p className="mr-2">Delete</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                    </svg>
                </button>
                {error && <DeleteCollectionModalError error={error} setError={setError}/>}
            </div>
        </div>
    )
};