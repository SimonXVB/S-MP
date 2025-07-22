import { useContext, useEffect, useRef } from "react";
import { mainContext } from "../Context/context";

export function GlobalError() {
    const { tabInfo, setError, error } = useContext(mainContext);

    const errorRef = useRef();
    const timeoutRef = useRef();

    const collectionType = tabInfo.currentDir === "videos" ? "Collection" : "Playlist";

    function getErrorMessage() {
        switch(error) {
            case "existsCollection":
                return `A ${collectionType} with this name already exists`
            case "existsFile":
                return "A file with this name already exists"
            case "formatVideo":
                return "Incorrect file format. Accepted formats: .mp4, .webm, .ogg"
            case "formatAudio":
                return "Incorrect file format. Accepted formats: .mp3, .wav, .ogg"
            case "emptyCollection":
                return "Name field is empty"
            default:
                return "An error occurred"
        };
    };

    useEffect(() => {
        clearTimeout(timeoutRef.current);
        
        if(errorRef.current) {
            errorRef.current.style.left = "0%";

            timeoutRef.current = setTimeout(() => {
                errorRef.current.style.left = "-100%";
                errorRef.current.ontransitionend = () => setError("");
            }, 5000);
        };

        return () => clearTimeout(timeoutRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);

    return (
        <>
            {error && 
                <div ref={errorRef} className="fixed bottom-0 -left-full m-4 pr-10 flex items-center bg-red-400 p-2 rounded-md transition-all duration-500">
                    <svg className="bg-red-400 mr-2" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#fff" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                    </svg>
                    <p className="text-white font-medium">{getErrorMessage()}</p>
                </div>
            }
        </>
    );
};