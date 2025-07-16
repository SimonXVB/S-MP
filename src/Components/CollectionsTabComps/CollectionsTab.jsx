import { useState, useContext, useEffect } from "react";
import { mainContext } from "../../Context/context";
import { NewCollectionButton } from "./Individuals/NewCollectionButton";
import { NewCollectionModal } from "./NewCollection/NewCollectionModal";
import { DeleteCollectionModal } from "./DeleteCollectionModal/DeleteCollectionModal";
import { ContextMenu } from "./Individuals/ContextMenu";

export function CollectionsTab() {
    const { current } = useContext(mainContext);

    const [newCollection, setNewColletion] = useState(false);
    const [deleteModal, setDeleteModal] = useState("");
    const [contextMenu, setContextMenu] = useState({});
    const [collection, setCollection] = useState([]);

    async function getCollection() {
        const data = await window.collection.getCollections(current);
        setCollection(data);
    };

    function setContextData(e, collectionName) {
        const contextData = {
            name: collectionName,
            x: e.clientX,
            y: e.clientY
        };

        setContextMenu(contextData);
    };

    useEffect(() => {
        getCollection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="bg-gray-950 grow">
                <div className="w-fit h-[calc(100vh-54px)] overflow-y-auto flex flex-wrap gap-2 p-6">
                    <NewCollectionButton setPlaylistModal={setNewColletion}/>
                    {collection.map((entry, i) => (
                        <button key={i} onContextMenu={e => setContextData(e, entry.name)} className="relative w-50 h-50 flex flex-col justify-center items-center bg-red-400">
                            <img src={entry.img}/>
                            <p className="absolute bottom-0 left-0 w-full bg-white/70 font-bold backdrop-blur-xl px-1 overflow-hidden">{entry.name}</p>
                        </button>
                    ))}
                </div>
            </div>
            {newCollection && <NewCollectionModal setCollectionModal={setNewColletion} getCollection={getCollection}/>}
            {deleteModal && <DeleteCollectionModal setDeleteModal={setDeleteModal} getCollection={getCollection} collectionName={deleteModal}/>}
            {contextMenu.name && <ContextMenu setContextMenu={setContextMenu} setDeleteModal={setDeleteModal} getCollection={getCollection} contextData={contextMenu}/>}
        </>
    )
};