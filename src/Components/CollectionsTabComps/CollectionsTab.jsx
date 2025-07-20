import { useState, useContext, useEffect } from "react";
import { mainContext } from "../../Context/context";
import { NewCollectionButton } from "./Individuals/NewCollectionButton";
import { NewCollectionModal } from "./NewCollection/NewCollectionModal";
import { CollectionEntry } from "./Individuals/CollectionEntry";

export function CollectionsTab() {
    const { tabInfo, searchValue, setError } = useContext(mainContext);

    const [newCollection, setNewColletion] = useState(false);
    const [collection, setCollection] = useState([]);
    const [contextMenu, setContextMenu] = useState("");

    async function getCollection() {
        const res = await window.collection.getCollections(tabInfo.currentTab);
        if(res instanceof Array) {
            setCollection(res);
        } else {
            setError(res)
        };
    };

    function searchCollection() {
        const data = collection.filter(el => el.name.toLowerCase().includes(searchValue.toLowerCase()));
        return data;
    };

    useEffect(() => {
        getCollection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tabInfo.currentTab]);

    return (
        <>
            <div className="w-full h-[calc(100vh-54px)] overflow-y-auto flex flex-wrap gap-2 p-6 bg-gray-950 grow">
                <NewCollectionButton setPlaylistModal={setNewColletion}/>
                {searchCollection().map(entry => (
                    <CollectionEntry key={entry.name} collectionName={entry.name} img={entry.img} getCollection={getCollection} contextMenu={contextMenu} setContextMenu={setContextMenu}/>
                ))}
            </div>
            {newCollection && <NewCollectionModal setCollectionModal={setNewColletion} getCollection={getCollection}/>}
        </>
    )
};