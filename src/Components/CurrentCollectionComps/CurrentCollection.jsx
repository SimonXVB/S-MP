import { useState, useContext, useEffect } from "react";
import { mainContext } from "../../Context/context";
import { CurrentCollectionButtons } from "./Individuals/CurrentCollectionButtons";
import { CurrentCollectionEntry } from "./Individuals/CurrentCollectionEntry";
import { Loading } from "../Loading";

export function CurrentCollection() {
    const { tabInfo, searchValue, setError } = useContext(mainContext);

    const [loading, setLoading] = useState(true);
    const [currentCollection, setCurrentCollection] = useState([]);
    const [contextMenu, setContextMenu] = useState("");

    async function getCurrentCollection() {
        setLoading(true);

        const res = await window.files.getCollection({
            targetDir: tabInfo.currentDir,
            targetCol: tabInfo.currentCollection
        });

        if(res instanceof Array) {
            setCurrentCollection(res);
            setLoading(false);
        } else {
            setError(res);
            setLoading(false);
        };
    };

    function searchCollection() {
        const data = currentCollection.filter(el => el.name.toLowerCase().includes(searchValue.toLowerCase()));
        return data;
    };

    useEffect(() => {
        getCurrentCollection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="w-full h-[calc(100vh-53px)] overflow-y-auto p-6 bg-gray-950 grow">
            {loading ? 
                <Loading/>
                :
                <div className="flex flex-wrap gap-2">
                    <CurrentCollectionButtons getCurrentCollection={getCurrentCollection}/>
                    {searchCollection().map(entry => (
                        <CurrentCollectionEntry key={entry.name} fileName={entry.name} currentCollection={currentCollection} getCurrentCollection={getCurrentCollection} contextMenu={contextMenu} setContextMenu={setContextMenu}/>
                    ))}
                </div>
            }
        </div>
    )
};