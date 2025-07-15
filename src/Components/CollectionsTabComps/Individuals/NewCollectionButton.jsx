import { useContext } from "react"
import { mainContext } from "../../../Context/context"

export function NewCollectionButton({ setPlaylistModal }) {
    const { current } = useContext(mainContext);

    return (
        <button className="flex flex-col justify-center items-center text-white font-bold border-2 border-white cursor-pointer w-50 h-50 hover:border-red-400 hover:bg-red-400" onClick={() => setPlaylistModal(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="#fff" viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
            </svg>
            <p>{current === "videos" ? "New Collection" : "New Playlist"}</p>
        </button>
    )
};