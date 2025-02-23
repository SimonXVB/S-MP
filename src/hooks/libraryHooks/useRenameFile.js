import { useState } from "react";

export function useRenameFile() {
    const [renameModal, setRenameModal] = useState("");
    const [renameInput, setRenameInput] = useState("");
    const [renameError, setRenameError] = useState("");

    async function renameMedia(oldName, newName, dir) {
        try {
            await window.FS.renameFile(oldName, newName, dir);
            setRenameModal("");
            setRenameInput("");
            setRenameError("");
        } catch (error) {
            setRenameError(error);
        };
    };

    function closeRenameModal() {
        setRenameModal("");
        setRenameError("");
    };

    return { renameMedia, closeRenameModal, setRenameModal, renameModal, setRenameInput, renameInput, setRenameError, renameError }
};