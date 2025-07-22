import { useEffect, useRef } from "react"

export function NewCollectionInput({ createCollection, setCollectionName, setNewCollectionInput }) {
    const inputRef = useRef();

    useEffect(() => {
        function closeContextMenu(e) {
            if(!inputRef.current.contains(e.target)) {
                setNewCollectionInput(false);
                setCollectionName("");
            };
        };

        setTimeout(() => {
            document.addEventListener("click", closeContextMenu);
        }, 0);

        return () => document.removeEventListener("click", closeContextMenu);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <form ref={inputRef} onSubmit={e => createCollection(e)} className="absolute left-full top-[50%] -translate-y-[50%] bg-gray-800 ml-4 p-5 flex flex-col gap-2.5 rounded-md shadow-2xl z-10">
            <fieldset className="border-2 border-red-400 rounded-md">
                <legend className="ml-2 px-1 font-bold text-red-400">Name</legend>
                <input className="outline-0 px-2 p-1 pt-0 font-bold text-white" type="text" onChange={e => setCollectionName(e.target.value)}/>
            </fieldset>
            <button type="submit" className="flex justify-center items-center rounded-md bg-green-400 cursor-pointer hover:bg-gray-950 hover:*:fill-green-400 hover:*:text-green-400">
                <p className="font-bold text-white">Create</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#fff" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                </svg>
            </button>
        </form>
    )
};