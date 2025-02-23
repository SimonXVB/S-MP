import { useState } from "react";

export function useCreatePlaylist() {
    const [newPLModal, setNewPLModal] = useState(false);
    const [newPLName, setNewPLName] = useState("");
    const [newPLError, setNewPLError] = useState("");

    async function newPL(dir, name) {
        try {
            await window.Playlist.createPlaylist(dir, name);
            closeNewPLModal();
        } catch (error) {
            setNewPLError(error);
        };
    };

    function closeNewPLModal() {
        setNewPLModal(false);
        setNewPLName("");
        setNewPLError("");
    };

    return { newPL, closeNewPLModal, setNewPLModal, newPLModal, setNewPLName, newPLName, setNewPLError, newPLError }
};