import { useState, useContext, useEffect } from "react";
import { mainContext } from "../../Context/context";
import { NewCollectionButton } from "./Individuals/NewCollectionButton";
import { CollectionEntry } from "./Individuals/CollectionEntry";
import { Loading } from "../Loading";

export function AllCollections() {
    const { tabInfo, searchValue, setError } = useContext(mainContext);

    const [loading, setLoading] = useState(true);
    const [allCollections, setAllCollections] = useState([]);
    const [contextMenu, setContextMenu] = useState("");

    async function getAllCollections() {
        setLoading(true);

        const res = await window.collection.getCollections(tabInfo.currentDir);

        if(res instanceof Array) {
            setAllCollections(res);
            setLoading(false);
        } else {
            setError(res);
            setLoading(false);
        };
    };

    function searchCollections() {
        const data = allCollections.filter(collection => collection.toLowerCase().includes(searchValue.toLowerCase()));
        return data;
    };

    useEffect(() => {
        getAllCollections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tabInfo.currentDir]);

    return (
        <div className="w-full h-[calc(100vh-53px)] overflow-y-auto p-6 bg-gray-950 grow no-scrollbar">
            {loading ?
                <Loading/>
                :
                <div className="flex flex-wrap gap-2">
                    <NewCollectionButton getAllCollections={getAllCollections}/>
                    {searchCollections().map(entry => (
                        <CollectionEntry key={entry} collectionName={entry} getAllCollections={getAllCollections} contextMenu={contextMenu} setContextMenu={setContextMenu}/>
                    ))}
                </div>
            }
        </div>
    )
};