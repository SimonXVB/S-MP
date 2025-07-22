import { useContext, useEffect, useRef, useState } from "react";
import { mainContext } from "../../../Context/context";
import { ContextMenu } from "../../ContextMenu";

export function CurrentCollectionEntry({ fileName, getCurrentCollection, contextMenu, setContextMenu }) {
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

        inputRef.current.readOnly = false;
        inputRef.current.select();
        inputRef.current.style.cursor = "text";

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
            targetDir: tabInfo.currentDir,
            targetCol: tabInfo.currentCollection
        });

        if(res === "edited") {
            await getCurrentCollection();
        } else {
            setName(fileName);

            inputRef.current.readOnly = true;
            inputRef.current.style.cursor = "pointer";

            setError(res);
        };

        document.body.removeEventListener("click", renameFile);
        document.body.removeEventListener("keyup", renameFile);
    };

    async function deleteFile() {
        const res = await window.files.deleteFile({
            name: name,
            targetDir: tabInfo.currentDir,
            targetCol: tabInfo.currentCollection
        });

        if(res === "deleted") {
            await getCurrentCollection();
        } else {
            setContextMenu(false);
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
            <div onContextMenu={e => setContextData(e)} onDoubleClick={playFile} className="relative w-50 h-50 select-none rounded-md flex flex-col justify-center items-center cursor-pointer hover:bg-gray-400/20">
                {tabInfo.currentDir === "videos" ?
                    <svg className="fill-red-400" xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M6 6.883v4.234a.5.5 0 0 0 .757.429l3.528-2.117a.5.5 0 0 0 0-.858L6.757 6.454a.5.5 0 0 0-.757.43z"/>
                        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
                    </svg>
                    :
                    <svg className="fill-red-400" xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M11 6.64a1 1 0 0 0-1.243-.97l-1 .25A1 1 0 0 0 8 6.89v4.306A2.6 2.6 0 0 0 7 11c-.5 0-.974.134-1.338.377-.36.24-.662.628-.662 1.123s.301.883.662 1.123c.364.243.839.377 1.338.377s.974-.134 1.338-.377c.36-.24.662-.628.662-1.123V8.89l2-.5z"/>
                        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
                    </svg>
                }
                <input ref={inputRef} onChange={e => setName(e.target.value)} className="w-full text-white font-bold text-center px-1 overflow-hidden outline-0 mt-4 cursor-pointer" readOnly value={name}/>
            </div>
            {contextMenu === fileName && <ContextMenu
                setContextMenu={setContextMenu}
                entries={contextMenuEntries}
                coords={coords}
            />}
        </>
    )
};