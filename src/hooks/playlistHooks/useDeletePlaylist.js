import { useState } from "react";

export function useDeletePlaylist() {
    const [ delPLModal, setDelPLModal ] = useState("");

    async function deletePlaylist(dir, name) {
        await window.Playlist.deletePlaylist(dir, name);
        setDelPLModal("");
    };

    return { deletePlaylist, setDelPLModal, delPLModal }
};