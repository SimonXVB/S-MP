import { useEffect, useRef } from "react";

export function ContextMenu({ setContextMenu, contextData }) {
    const contextRef = useRef();

    function getCoords() {
        let x, y;

        const totalX = (contextData.x + contextRef.current.clientWidth);
        const totalY = (contextData.y + contextRef.current.clientHeight);

        totalX > window.innerWidth ? x = contextData.x - (totalX - window.innerWidth) : x = contextData.x;
        totalY > window.innerHeight ? y = contextData.y - (totalY - window.innerHeight) : y = contextData.y;

        return { x, y };
    };

    function closeContextMenu(e) {
        !contextRef.current.contains(e.target) && setContextMenu({});
    };

    useEffect(() => {
        const { x, y } = getCoords();

        contextRef.current.style.top = y + "px";
        contextRef.current.style.left = x + "px";

        document.addEventListener("click", closeContextMenu);

        return () => {
            document.removeEventListener("click", closeContextMenu);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contextData.x, contextData.y]);

    return (
        <div ref={contextRef} className="fixed bg-green-400 h-80 w-36 z-20">
            <div>contextMenu</div>
        </div>
    );
};