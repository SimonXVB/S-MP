import { useEffect, useRef } from "react";

export function ContextMenu({ setContextMenu, coords, entries }) {
    const contextRef = useRef();

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
            {entries.map((entry, i) => (
                <button key={i} onClick={entry.action} className="bg-gray-800 text-white w-[200px] text-left font-bold p-2 pr-4 py-1 cursor-pointer last:rounded-b-md first:rounded-t-md hover:bg-gray-700">
                    <p>{entry.text}</p>
                </button>
            ))}
        </div>
    );
};