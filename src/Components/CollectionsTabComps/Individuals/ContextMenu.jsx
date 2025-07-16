import { useEffect, useRef, useContext } from "react";
import { mainContext } from "../../../Context/context";

export function ContextMenu({ setContextMenu, setDeleteModal, getCollection, contextData }) {
    const { current } = useContext(mainContext);
    const contextRef = useRef();

    const contextMenuEntries = [
        {
            text: "Open",
            action: () => openCollection(contextData.name)
        },
        {
            text: "Change Cover Image",
            action: () => changeCoverImage()
        },
        {
            text: "Rename",
            action: () => renameCollection(contextData.name)
        },
        {
            text: "Delete",
            action: () => openDeleteModal()
        }
    ];

    function openCollection(name) {

    };

    async function changeCoverImage() {
        await window.collection.editCover({
            name: contextData.name,
            targetDir: current
        });

        setContextMenu({});
        getCollection();
    };

    function renameCollection(name) {

    };

    function openDeleteModal() {
        setDeleteModal(contextData.name);
        setContextMenu({});
    };

    function getCoords() {
        let x, y;

        const totalX = (contextData.x + contextRef.current.clientWidth);
        const totalY = (contextData.y + contextRef.current.clientHeight);

        totalX > window.innerWidth ? x = contextData.x - (totalX - window.innerWidth) : x = contextData.x;
        totalY > window.innerHeight ? y = contextData.y - (totalY - window.innerHeight) : y = contextData.y;

        return { x, y };
    };

    useEffect(() => {
        const closeContextMenu = e => !contextRef.current.contains(e.target) && setContextMenu({});

        contextRef.current.style.top = getCoords().y + "px";
        contextRef.current.style.left = getCoords().x + "px";

        document.addEventListener("click", closeContextMenu);

        return () => {
            document.removeEventListener("click", closeContextMenu);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contextData.x, contextData.y]);

    return (
        <div ref={contextRef} className="fixed flex flex-col z-20">
            {contextMenuEntries.map((entry, i) => (
                <button key={i} onClick={entry.action} className="bg-white text-red-400 text-left font-bold p-2 pr-4 py-1 cursor-pointer last:rounded-b-md first:rounded-t-md hover:bg-red-300 hover:text-white">
                    <p>{entry.text}</p>
                </button>
            ))}
        </div>
    );
};