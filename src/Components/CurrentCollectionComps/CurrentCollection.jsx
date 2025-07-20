import { useState, useContext, useEffect } from "react";
import { mainContext } from "../../Context/context";
import { CurrentCollectionControls } from "./Individuals/CurrentCollectionControls";
import { CurrentCollectionEntry } from "./Individuals/CurrentCollectionEntry";

export function CurrentCollection() {
    const { tabInfo, searchValue } = useContext(mainContext);

    const [currentCollection, setCurrentCollection] = useState([]);
    const [contextMenu, setContextMenu] = useState("");

    async function getCurrentCollection() {
        const data = await window.files.getCollection({
            targetDir: tabInfo.currentTab,
            targetCol: tabInfo.currentCollection
        });

        setCurrentCollection(data);
    };

    function searchCollection() {
        const data = currentCollection.filter(el => el.toLowerCase().includes(searchValue.toLowerCase()));
        return data;
    };

    useEffect(() => {
        getCurrentCollection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="w-full h-[calc(100vh-54px)] overflow-y-auto flex flex-wrap gap-2 p-6 bg-gray-950 grow">
            <CurrentCollectionControls getCurrentCollection={getCurrentCollection}/>
            {searchCollection().map(entry => (
                <CurrentCollectionEntry key={entry} fileName={entry} getCurrentCollection={getCurrentCollection} contextMenu={contextMenu} setContextMenu={setContextMenu}/>
            ))}
        </div>
    )
};