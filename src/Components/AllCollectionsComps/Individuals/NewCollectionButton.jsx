import { useContext, useState } from "react"
import { mainContext } from "../../../Context/context"
import { NewCollectionInput } from "./NewCollectionInput";

export function NewCollectionButton({ getAllCollections }) {
    const { tabInfo, setError } = useContext(mainContext);

    const [inputOpen, setInputOpen] = useState(false);
    const [collectionName, setCollectionName] = useState("");

    async function createCollection(e) {
        e.preventDefault();
        
        const res = await window.collection.createCollection({
            name: collectionName,
            targetDir: tabInfo.currentDir
        });

        if(res === "created") {
            setInputOpen(false);
            await getAllCollections();
        } else {
            setError(res);
        };
    };

    return (
        <div className="relative h-fit">
            <button className="flex flex-col justify-center items-center rounded-md text-white font-medium cursor-pointer w-50 h-50 hover:*:fill-white hover:bg-red-400" onClick={() => setInputOpen(true)}>
                <svg className="fill-red-400" xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="#fff" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                </svg>
                <p>{tabInfo.currentDir === "videos" ? "New Collection" : "New Playlist"}</p>
            </button>
            {inputOpen && <NewCollectionInput createCollection={createCollection} setCollectionName={setCollectionName} setInputOpen={setInputOpen}/>}
        </div>
    )
};