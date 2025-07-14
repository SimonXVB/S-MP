import { useState, useContext } from "react";
import { mainContext } from "../../../Context/context";

export function DeleteCollectionModal({ setDeleteModal, getCollection, collectionName }) {
    const { current } = useContext(mainContext);
    const [error, setError] = useState("");
    
    const collectionType = current === "videos" ? "Collection" : "Playlist";

    console.log(collectionName)

    async function deleteCollection() {
        const res = await window.collection.deleteCollection({name: collectionName, targetDir: current});
        getCollection();

        if(res === "deleted") {
            setDeleteModal("");
        } else {
            setError(res);
        };
    };

    console.log(error);

    return (
        <div className="fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-gray-400/20">
            <div className="relative bg-gray-950 p-5 flex flex-col justify-between rounded-md text-white">
                <button className="absolute top-0 right-0 p-3 cursor-pointer hover:*:fill-red-400" onClick={() => setDeleteModal("")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                </button>
                <h1>Delete {collectionType}?</h1>
                <p>Warning: Deleting a {collectionType} will also delete everything in that {collectionType}!</p>
                <button onClick={deleteCollection}>Delete</button>
            </div>
        </div>
    )
};