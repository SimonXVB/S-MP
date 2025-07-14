import { useState, useContext, useEffect } from "react";
import { mainContext } from "../../Context/context";
import { NewCollectionButton } from "./Individuals/NewCollectionButton";
import { NewCollectionModal } from "./Individuals/NewCollectionModal";
import { DeleteCollectionModal } from "./Individuals/DeleteCollectionModal";
import { EditCollectionModal } from "./Individuals/EditCollectionModal";

export function MediaTab() {
    const { current } = useContext(mainContext);

    const [playlistModal, setPlaylistModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState("");
    const [editModal, setEditModal] = useState({});
    const [collection, setCollection] = useState([]);

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
            <div className="bg-gray-950 grow">
                <div className="w-fit h-[calc(100vh-54px)] overflow-y-auto flex flex-wrap gap-2 p-6">
                    <NewCollectionButton setPlaylistModal={setPlaylistModal}/>
                    {collection.map((entry, i) => (
                        <>
                            <div key={i} className="relative w-50 h-50 flex flex-col justify-center items-center bg-red-400">
                                <img src={entry.img} className="bg-red-400"/>
                                <p className="absolute top-full left-0 w-full bg-white font-bold backdrop-blur-xl px-1">{entry.name}</p>
                                <div className="text-white font-bold bg-red-400 absolute top-full left-0 w-full backdrop-blur-xl px-1">
                                    <p className="">{entry.name}</p>
                                    <button className="mr-5" onClick={() => setDeleteModal(entry.name)}>Del</button>
                                    <button onClick={() => setEditModal({name: entry.name, img: entry.img})}>Edit</button>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>
            {playlistModal && <NewCollectionModal setCollectionModal={setPlaylistModal} getCollection={getCollection}/>}
            {deleteModal && <DeleteCollectionModal setDeleteModal={setDeleteModal} getCollection={getCollection} collectionName={deleteModal}/>}
            {editModal.name && <EditCollectionModal setEditModal={setEditModal} getCollection={getCollection} collectionName={editModal.name} img={editModal.img}/>}
        </>
    )
};