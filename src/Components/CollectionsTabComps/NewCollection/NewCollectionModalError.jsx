import { useEffect, useRef, useContext } from "react"
import { mainContext } from "../../../Context/context";

export function CollectionModalError({ error, setError }) {
    const { tabInfo } = useContext(mainContext);

    const timeoutRef = useRef(0);
    const errorRef = useRef();

    const collectionType = tabInfo.currentTab === "vidoes" ? "Collection" : "Playlist";

    const getErrorMessage = () => {
        switch(error) {
            case "exists":
                return ` A ${collectionType} with this name already exists`;
            case "empty":
                return " Name field cannot be empty";
            default:
                " An error occurred!"
        };
    };

    useEffect(() => {
        if(errorRef.current) {
            clearTimeout(timeoutRef.current);
            errorRef.current.style.opacity = "100%";

            timeoutRef.current = setTimeout(() => {
                errorRef.current.style.opacity = "0%";

                errorRef.current.ontransitionend = () => {
                    setError("");
                };
            }, 5000);

            return () => {
                clearTimeout(timeoutRef.current);
            };
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);

    return (
        <div ref={errorRef} className="absolute top-full left-0 flex items-center bg-gray-950 text-white w-full mt-2 opacity-0 rounded-md transition-all duration-150">
            <svg className="bg-red-400 p-2 rounded-l-md" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#fff" viewBox="0 0 16 16">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
            </svg>
            <p className="ml-2 font-bold">{getErrorMessage()}</p>
        </div>
    )
};