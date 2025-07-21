import { useState, useContext, useEffect } from "react";
import { mainContext } from "../../Context/context";
import { NewCollectionButton } from "./Individuals/NewCollectionButton";
import { CollectionEntry } from "./Individuals/CollectionEntry";
import { Loading } from "../Loading";

export function CollectionsTab() {
    const { tabInfo, searchValue, setError } = useContext(mainContext);

    const [loading, setLoading] = useState(true);
    const [collection, setCollection] = useState([]);
    const [contextMenu, setContextMenu] = useState("");

    async function getCollection() {
        setLoading(true);

        const res = await window.collection.getCollections(tabInfo.currentDir);

        if(res instanceof Array) {
            setCollection(res);
            setLoading(false);
        } else {
            setError(res);
            await getCollection();
        };
    };

    function searchCollection() {
        const data = collection.filter(el => el.toLowerCase().includes(searchValue.toLowerCase()));
        return data;
    };

    useEffect(() => {
        getCollection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tabInfo.currentDir]);

    return (
        <div className="w-full h-[calc(100vh-53px)] overflow-y-auto p-6 bg-gray-950 grow">
            {loading ?
                <Loading/>
                :
                <div className="flex flex-wrap gap-2">
                    <NewCollectionButton getCollection={getCollection}/>
                    {searchCollection().map(entry => (
                        <CollectionEntry key={entry} collectionName={entry} getCollection={getCollection} contextMenu={contextMenu} setContextMenu={setContextMenu}/>
                    ))}
                </div>
            }
        </div>
    )
};