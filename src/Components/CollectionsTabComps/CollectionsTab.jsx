import { useState, useContext, useEffect } from "react";
import { mainContext } from "../../Context/context";
import { NewCollectionButton } from "./Individuals/NewCollectionButton";
import { NewCollectionModal } from "./NewCollection/NewCollectionModal";
import { Entry } from "./Individuals/Entry";

export function CollectionsTab() {
    const { current } = useContext(mainContext);

    const [newCollection, setNewColletion] = useState(false);
    const [collection, setCollection] = useState([]);
    const [contextMenu, setContextMenu] = useState("");

    async function getCollection() {
        const data = await window.collection.getCollections(current);
        setCollection(data);
    };

    useEffect(() => {
        getCollection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="w-full h-[calc(100vh-54px)] overflow-y-auto flex flex-wrap gap-2 p-6 bg-gray-950 grow">
                <NewCollectionButton setPlaylistModal={setNewColletion}/>
                {collection.map(entry => (
                    <Entry key={entry.name} collectionName={entry.name} img={entry.img} getCollection={getCollection} contextMenu={contextMenu} setContextMenu={setContextMenu}/>
                ))}
            </div>
            {newCollection && <NewCollectionModal setCollectionModal={setNewColletion} getCollection={getCollection}/>}
        </>
    )
};