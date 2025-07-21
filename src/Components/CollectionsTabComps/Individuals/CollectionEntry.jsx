import { useContext, useEffect, useRef, useState } from "react";
import { mainContext } from "../../../Context/context";
import { ContextMenu } from "../../ContextMenu";
import { DeleteCollectionModal } from "./DeleteCollectionModal";

export function CollectionEntry({collectionName, getCollection, contextMenu, setContextMenu}) {
    const { tabInfo, setTabInfo, setError } = useContext(mainContext);

    const inputRef = useRef();

    const [name, setName] = useState(collectionName);
    const [deleteModal, setDeleteModal] = useState(false);
    const [coords, setCoords] = useState({});

    const contextMenuEntries = [
        {
            text: "Open",
            action: () => openCollection()
        },
        {
            text: "Rename",
            action: () => enableRename()
        },
        {
            text: "Delete",
            action: () => openDeleteModal()
        }
    ];

    function setContextData(e) {
        setCoords({x: e.clientX, y: e.clientY});
        setContextMenu(collectionName);
    };

    function openCollection() {
        setTabInfo(prev => ({
            ...prev,
            currentCollection: collectionName,
            currentTab: "openCollection"
        }));
    };

    function enableRename() {
        document.body.removeEventListener("click", renameCollection);
        document.body.removeEventListener("keyup", renameCollection);

        inputRef.current.readOnly = false;
        inputRef.current.style.cursor = "text";
        inputRef.current.select();

        setContextMenu("");

        setTimeout(() => {
            document.body.addEventListener("click", renameCollection);
            document.body.addEventListener("keyup", renameCollection);
        }, 0);
    };

    async function renameCollection(e) {
        // Checks if input field exists/is focused or Enter/Esc key is pressed and returns function early
        if(!inputRef.current) return;
        if(!e.key && e.target === inputRef.current) return;
        if(e.key && (e.key !== "Enter" && e.key !== "Escape")) return;

        const res = await window.collection.editName({
            oldName: collectionName,
            newName: inputRef.current.value,
            targetDir: tabInfo.currentDir
        });

        if(res === "edited") {
            await getCollection();
        } else {
            setName(collectionName);

            inputRef.current.readOnly = true;
            inputRef.current.style.cursor = "default";

            setError(res);
        };

        document.body.removeEventListener("click", renameCollection);
        document.body.removeEventListener("keyup", renameCollection);
    };

    function openDeleteModal() {
        setDeleteModal(true);
        setContextMenu("");
    };

    async function deleteCollection() {
        const res = await window.collection.deleteCollection({
            name: name, 
            targetDir: tabInfo.currentDir
        });

        if(res === "deleted") {
            await getCollection();
        } else {
            setError(res);
        };
    };

    useEffect(() => {
        return () => {
            document.body.removeEventListener("click", renameCollection);
            document.body.removeEventListener("keyup", renameCollection);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div onContextMenu={e => setContextData(e)} onDoubleClick={e => {e.preventDefault(); openCollection()}} className="relative w-50 h-50 rounded-md flex flex-col justify-center items-center cursor-pointer hover:bg-gray-400/20">
                <svg className="fill-red-400" xmlns="http://www.w3.org/2000/svg" width="135" height="135" fill="#fff" viewBox="0 0 16 16">
                    <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3m-8.322.12q.322-.119.684-.12h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981z"/>
                </svg>
                <input ref={inputRef} onChange={e => setName(e.target.value)} className="w-full text-white font-bold text-center px-1 overflow-hidden outline-0 mt-2 cursor-pointer" readOnly value={name}/>
            </div>
            {deleteModal && <DeleteCollectionModal 
                setDeleteModal={setDeleteModal}
                deleteCollection={deleteCollection}
            />}
            {contextMenu === collectionName && <ContextMenu
                setContextMenu={setContextMenu}
                entries={contextMenuEntries}
                coords={coords}
            />}
        </>
    )
};