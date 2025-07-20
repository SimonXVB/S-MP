import { useContext, useEffect, useRef, useState } from "react";
import { mainContext } from "../../../Context/context";
import { ContextMenu } from "../../ContextMenu";

export function CurrentCollectionEntry({fileName, img, getCurrentCollection, contextMenu, setContextMenu}) {
    const { tabInfo, setError } = useContext(mainContext);

    const inputRef = useRef();

    const [name, setName] = useState(fileName);
    const [coords, setCoords] = useState({});

    const contextMenuEntries = [
        {
            text: "Play",
            action: () => playFile()
        },
        {
            text: "Rename",
            action: () => enableRename()
        },
        {
            text: "Delete",
            action: () => deleteFile()
        }
    ];

    function setContextData(e) {
        setCoords({x: e.clientX, y: e.clientY});
        setContextMenu(fileName);
    };

    function playFile() {

    };

    function enableRename() {
        document.body.removeEventListener("click", renameFile);
        document.body.removeEventListener("keyup", renameFile);

        inputRef.current.disabled = false;
        inputRef.current.select();

        setContextMenu("");

        setTimeout(() => {
            document.body.addEventListener("click", renameFile);
            document.body.addEventListener("keyup", renameFile);
        }, 0);
    };

    async function renameFile(e) {
        // Checks if input field exists/is focused or Enter/Esc key is pressed and returns function early
        if(!inputRef.current) return;
        if(!e.key && e.target === inputRef.current) return;
        if(e.key && (e.key !== "Enter" && e.key !== "Escape")) return;

        const res = await window.files.renameFile({
            oldName: fileName,
            newName: inputRef.current.value,
            targetDir: tabInfo.currentTab,
            targetCol: tabInfo.currentCollection
        });

        if(res === "edited") {
            await getCurrentCollection();
        } else {
            setName(fileName);
            inputRef.current.disabled = true;

            setError(res);
        };

        document.body.removeEventListener("click", renameFile);
        document.body.removeEventListener("keyup", renameFile);
    };

    async function deleteFile() {
        const res = await window.files.deleteFile({
            name: name,
            targetDir: tabInfo.currentTab,
            targetCol: tabInfo.currentCollection
        });

        if(res === "deleted") {
            setContextMenu(false);
            await getCurrentCollection();
        } else {
            setError(res);
        };
    };

    useEffect(() => {
        return () => {
            document.body.removeEventListener("click", renameFile);
            document.body.removeEventListener("keyup", renameFile);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div onContextMenu={e => setContextData(e)} className="relative w-50 h-50 flex flex-col justify-center items-center bg-red-400">
                <img src={img && `${img}?${Date.now()}`}/>
                <input ref={inputRef} onChange={e => setName(e.target.value)} className="absolute bottom-0 left-0 w-full bg-white/70 font-bold backdrop-blur-xl px-1 overflow-hidden outline-0" disabled value={name}/>
            </div>
            {contextMenu === fileName && <ContextMenu
                setContextMenu={setContextMenu}
                entries={contextMenuEntries}
                coords={coords}
            />}
        </>
    )
};