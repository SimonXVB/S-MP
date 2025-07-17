import { useEffect, useRef, useContext } from "react";
import { mainContext } from "../../../Context/context";

export function ContextMenu({ setContextMenu, setDeleteModal, getCollection, contextData }) {
    const { current } = useContext(mainContext);
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

    async function editCoverImage() {
        setContextMenu(prev => {
            return {
                ...prev,
                open: false
            };
        });

        await window.collection.editCover({
            name: contextData.name,
            targetDir: current
        });

        setContextMenu({});
        getCollection();
    };

    function openDeleteModal() {
        setDeleteModal(contextData.name);
        setContextMenu({});
    };

    function openCollection() {

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
        if(contextRef.current) {
            const closeContextMenu = e => !contextRef.current.contains(e.target) && setContextMenu({});

            contextRef.current.style.top = getCoords().y + "px";
            contextRef.current.style.left = getCoords().x + "px";

            document.addEventListener("click", closeContextMenu);

            return () => {
                document.removeEventListener("click", closeContextMenu);
            };
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contextData.open, contextData.x, contextData.y]);

    return (
        <>
            {contextData.open &&
                <div ref={contextRef} className="fixed flex flex-col z-20">
                    {contextMenuEntries.map((entry, i) => (
                        <button key={i} onClick={entry.action} className="bg-white text-red-400 text-left font-bold p-2 pr-4 py-1 cursor-pointer last:rounded-b-md first:rounded-t-md hover:bg-red-300 hover:text-white">
                            <p>{entry.text}</p>
                        </button>
                    ))}
                </div>
            }
        </>
    );
};