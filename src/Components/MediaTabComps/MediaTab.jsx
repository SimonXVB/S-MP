import { useState } from "react";
import { NewPlaylistButton } from "./Individuals/NewPlaylistButton";
import { NewPlaylistModal } from "./Individuals/NewPlaylistModal";

export function MediaTab() {
    const [playlistModal, setPlaylistModal] = useState(false);

    return (
        <>
            <div className="bg-gray-950 grow">
                <div className="w-fit h-[calc(100vh-54px)] overflow-y-auto flex flex-wrap gap-2 p-6">
                    <NewPlaylistButton setPlaylistModal={setPlaylistModal}/>
                </div>
            </div>
            {playlistModal && <NewPlaylistModal setPlaylistModal={setPlaylistModal}/>}
        </>
    )
};