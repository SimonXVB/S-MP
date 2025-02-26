import { useState } from "react";

export function useRenamePlaylist() {
    const [renamePLModal, setRenamePLModal] = useState("");
    const [renamePLInput, setRenamePLInput] = useState("");
    const [renamePLError, setRenamePLError] = useState("");

    async function renamePlaylist(oldName, newName, dir) {
        try {
            await window.FS.renameFile(oldName, newName, dir);
            setRenamePLModal("");
            setRenamePLInput("");
            setRenamePLError("");
        } catch (error) {
            setRenamePLError(error);
        };
    };

    function closeRenameModal() {
        setRenamePLModal("");
        setRenamePLInput("");
        setRenamePLError("");
    };

    return { renamePlaylist, closeRenameModal, setRenamePLModal, renamePLModal, setRenamePLInput, renamePLInput, setRenamePLError, renamePLError }
};