import { useContext, useEffect, useRef } from "react";
import { mainContext } from "../Context/context";

export function GlobalError() {
    const { setError, error, currentTab } = useContext(mainContext);

    const errorRef = useRef();
    const timeoutRef = useRef();

    const collectionType = currentTab === "videos" ? "Collection" : "Playlist";

    function getErrorMessage() {
        switch(error) {
            case "existsCollection":
                return `A ${collectionType} with this name already exists`
            case "existsFile":
                return "A file with this name already exists"
            case "formatVideo":
                return "Incorrect file format. Accepted formats: '.mp4', '.webm', '.ogg'"
            case "formatAudio":
                return "Incorrect file format. Accepted formats: '.mp3', '.wav', '.ogg'"
            case "formatImage":
                return "Incorrect file format. Accepted formats: 'JPEG', 'PNG'"
            default:
                return "An error occcured"
        };
    };

    useEffect(() => {
        clearTimeout(timeoutRef.current);
        
        if(errorRef.current) {
            errorRef.current.style.left = "0%";

            timeoutRef.current = setTimeout(() => {
                errorRef.current.style.left = "-100%";
                errorRef.current.ontransitionend  = () => setError("");
            }, 5000);
        };

        return () => clearTimeout(timeoutRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);

    return (
        <>
            {error && 
                <div ref={errorRef} className="fixed bottom-0 -left-full bg-blue-400 transition-all duration-150">
                    <p>{getErrorMessage()}</p>
                </div>
            }
        </>
    );
};