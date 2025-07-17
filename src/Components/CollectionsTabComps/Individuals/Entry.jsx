import { useContext, useState } from "react";
import { mainContext } from "../../../Context/context";
import { ContextMenu } from "./ContextMenu";
import { DeleteCollectionModal } from "./DeleteCollectionModal";

export function Entry({name, img, getCollection}) {
    const { current } = useContext(mainContext);

    const [deleteModal, setDeleteModal] = useState(false);
    const [contextMenu, setContextMenu] = useState(false);
    const [coords, setCoords] = useState({});

    function setContextData(e) {
        setCoords({x: e.clientX, y: e.clientY});
        setContextMenu(true);
    };

    function openDeleteModal() {
        setDeleteModal(name);
        setContextMenu(false);
    };

    async function deleteCollection() {
        const res = await window.collection.deleteCollection({
            name: name, 
            targetDir: current
        });

        if(res === "deleted") {
            await getCollection();
            setDeleteModal(false);
        };
    };

    async function editCoverImage() {
        setContextMenu(false);

        await window.collection.editCover({
            name: name,
            targetDir: current
        });

        await getCollection();
    };

    return(
        <>
            <button onContextMenu={e => setContextData(e)} className="relative w-50 h-50 flex flex-col justify-center items-center bg-red-400">
                <img src={img && `${img}?${Date.now()}`}/>
                <input className="absolute bottom-0 left-0 w-full bg-white/70 font-bold backdrop-blur-xl px-1 overflow-hidden outline-0" disabled value={name}/>
            </button>
            {deleteModal && <DeleteCollectionModal 
                setDeleteModal={setDeleteModal} 
                deleteCollection={deleteCollection}
            />}
            {contextMenu && <ContextMenu 
                openDeleteModal={openDeleteModal} 
                editCoverImage={editCoverImage} 
                coords={coords}
            />}
        </>
    )
};