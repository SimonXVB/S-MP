import { useEffect, useRef } from "react";

export function ContextMenu({ setContextMenu, openDeleteModal, editCoverImage, enableRename, coords }) {
    const contextRef = useRef();

    const contextMenuEntries = [
        {
            text: "Open",
            action: () => openCollection()
        },
        {
            text: "Change Cover Image",
            action: () => editCoverImage()
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

    function openCollection() {

    };

    function getCoords() {
        let x, y;

        const totalX = (coords.x + contextRef.current.clientWidth);
        const totalY = (coords.y + contextRef.current.clientHeight);

        totalX > window.innerWidth ? x = coords.x - (totalX - window.innerWidth) : x = coords.x;
        totalY > window.innerHeight ? y = coords.y - (totalY - window.innerHeight) : y = coords.y;

        return { x, y };
    };

    useEffect(() => {
        const closeContextMenu = e => !contextRef.current.contains(e.target) && setContextMenu("");

        contextRef.current.style.top = getCoords().y + "px";
        contextRef.current.style.left = getCoords().x + "px";

        document.addEventListener("click", closeContextMenu);

        return () => {
            document.removeEventListener("click", closeContextMenu);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [coords.x, coords.y]);

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